# JuZX AI Lab public content

This repository contains the sanitized, public Markdown artifacts rendered by
[juzxailab.com](https://juzxailab.com/). Website code and Cloudflare Worker code
remain in `ketitongxue/my-vitepress-notes`.

## Collections

- `docs/wiki/`: curated Chinese AI and agent-engineering knowledge base.
- `docs/finance/`: sanitized Chinese finance knowledge base.
- `wiki-manifest.json` and `finance-manifest.json`: publication inventories.

Only public artifacts belong here. Never add raw sources, PDFs, Obsidian data,
local paths, private notes, credentials, or source-library metadata.

## Publishing flow

1. Update the private/local source wiki.
2. Run the publishing tools from `my-vitepress-notes`, targeting this checkout.
3. Review the generated Markdown and manifest diff.
4. Run `npm test` in this repository.
5. Merge the content pull request into `main`.

Every push to `main` validates the public artifacts and triggers a Cloudflare
build of the website. The website build installs the latest validated content,
generates navigation and the question-answering index, and then deploys.

## Local validation

```bash
npm test
```

The validator rejects unexpected root content, symbolic links, invalid manifest
entries, missing or extra pages, unresolved wiki links, raw-source references,
and local absolute paths.
