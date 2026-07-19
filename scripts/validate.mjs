import { lstat, readFile, readdir, realpath } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const COLLECTIONS = [
  { name: 'wiki', manifest: 'wiki-manifest.json' },
  { name: 'finance', manifest: 'finance-manifest.json' },
]
const ALLOWED_ROOT = new Set([
  '.github', '.gitignore', 'README.md', 'docs', 'finance-manifest.json',
  'package.json', 'scripts', 'wiki-manifest.json',
])
const ALLOWED_SECTIONS = new Set(['comparisons', 'concepts', 'entities'])

function fail(message) {
  throw new Error(message)
}

async function assertNoSymlinks(directory) {
  const canonicalRoot = await realpath(ROOT)
  async function visit(current) {
    const entries = await readdir(current, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.name === '.git') continue
      const candidate = path.join(current, entry.name)
      const metadata = await lstat(candidate)
      if (metadata.isSymbolicLink()) fail(`Symbolic links are not allowed: ${candidate}`)
      const resolved = await realpath(candidate)
      const relative = path.relative(canonicalRoot, resolved)
      if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
        fail(`Path escapes repository: ${candidate}`)
      }
      if (metadata.isDirectory()) await visit(candidate)
    }
  }
  await visit(directory)
}

async function markdownFiles(directory, prefix = '') {
  const files = []
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const relative = prefix ? path.posix.join(prefix, entry.name) : entry.name
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await markdownFiles(absolute, relative))
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(relative)
    else fail(`Unexpected public-content file: ${path.relative(ROOT, absolute)}`)
  }
  return files
}

function validSource(source) {
  if (typeof source !== 'string' || source.includes('\\') || path.posix.isAbsolute(source)) return false
  const normalized = path.posix.normalize(source)
  const [section] = normalized.split('/')
  return normalized === source && ALLOWED_SECTIONS.has(section)
    && normalized !== section && normalized.endsWith('.md') && !normalized.startsWith('../')
}

function validateMarkdown(relative, markdown) {
  const failures = []
  if (/(^|\n)\s*sources\s*:/i.test(markdown)) failures.push('sources metadata')
  if (/(?:^|[\s\\/])raw[\\/]/i.test(markdown)) failures.push('raw source path')
  if (markdown.includes('[[')) failures.push('unresolved wikilink')
  if (/(?:^|[^\p{L}\p{N}_])[A-Za-z]:[\\/]/u.test(markdown)) failures.push('Windows absolute path')
  if (/(?:^|[\s(<])\/(?:Users|home|data|private|tmp)\//i.test(markdown)) failures.push('local absolute path')
  if (failures.length) fail(`${relative}: ${failures.join(', ')}`)
}

async function validateCollection({ name, manifest: manifestFile }) {
  const docsRoot = path.join(ROOT, 'docs', name)
  const manifest = JSON.parse(await readFile(path.join(ROOT, manifestFile), 'utf8'))
  if (manifest.version !== 1 || !Array.isArray(manifest.pages)) fail(`${manifestFile}: invalid manifest`)

  const files = await markdownFiles(docsRoot)
  if (!files.includes('index.md')) fail(`docs/${name}/index.md is required`)
  const pageFiles = new Set(files.filter((entry) => entry !== 'index.md'))
  const sources = new Set()

  for (const [index, page] of manifest.pages.entries()) {
    if (!page || typeof page !== 'object' || !validSource(page.source)) {
      fail(`${manifestFile}: invalid source at pages[${index}]`)
    }
    if (sources.has(page.source)) fail(`${manifestFile}: duplicate source ${page.source}`)
    sources.add(page.source)
    if (!/^[a-f0-9]{64}$/.test(page.hash ?? '')) fail(`${manifestFile}: invalid hash for ${page.source}`)
    if (page.publicPath !== `docs/${name}/${page.source}`) fail(`${manifestFile}: invalid publicPath for ${page.source}`)
    if (page.status !== 'published') fail(`${manifestFile}: invalid status for ${page.source}`)
    if (!Number.isFinite(Date.parse(page.syncedAt))) fail(`${manifestFile}: invalid syncedAt for ${page.source}`)
  }

  const missing = [...sources].filter((source) => !pageFiles.has(source))
  const extra = [...pageFiles].filter((source) => !sources.has(source))
  if (missing.length) fail(`docs/${name}: missing ${missing.join(', ')}`)
  if (extra.length) fail(`docs/${name}: extra ${extra.join(', ')}`)

  for (const file of files) {
    validateMarkdown(`docs/${name}/${file}`, await readFile(path.join(docsRoot, ...file.split('/')), 'utf8'))
  }
  return manifest.pages.length
}

async function main() {
  const rootEntries = new Set(await readdir(ROOT))
  for (const entry of rootEntries) {
    if (entry === '.git' || ALLOWED_ROOT.has(entry)) continue
    fail(`Unexpected repository root entry: ${entry}`)
  }
  await assertNoSymlinks(ROOT)
  const counts = {}
  for (const collection of COLLECTIONS) counts[collection.name] = await validateCollection(collection)
  console.log(`Validated ${counts.wiki} AI pages and ${counts.finance} finance pages.`)
}

await main()
