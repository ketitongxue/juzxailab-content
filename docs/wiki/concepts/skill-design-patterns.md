---
title: "技能设计模式"
type: "concept"
tags: [developer-tool, workflow, context-engineering, tool-use, ai-coding]
created: "2026-06-13"
updated: "2026-07-23"
---

# 技能设计模式

技能设计模式描述如何把流程知识、参考资料、脚本、模板、权限和动态上下文拆开，让 Claude Code 技能保持小而准。

## 四种常用模式

| 模式 | 适用场景 | 设计动作 |
| --- | --- | --- |
| 模板驱动 | 输出格式很重要。 | 把呈现形式放进模板，把判断留在技能说明。 |
| 脚本增强 | 有确定性计算或转换。 | 用脚本处理重复逻辑，并说明何时运行。 |
| 知识分层 | 领域规则很多。 | 入口只放常用判断，深层分支放参考文件。 |
| 工具隔离 | 不同任务风险不同。 | 限定工具、读写权限或执行上下文。 |

## 能力成熟度

技能通常会经历三个阶段：

1. SOP：一个技能文件覆盖稳定任务步骤。
2. 专家系统：参考资料、模板和脚本处理有意义的变体。
3. 组织工作流：多个角色或技能通过评审和质量门禁协作。

成熟度应该跟随真实复用和真实变化增长，而不是一开始就追求复杂结构。

## 扩展放置原则

[pigo](/wiki/entities/pigo) 的扩展阶梯提供了一个清晰边界：

- Markdown Skill 和命令适合承载可审阅的流程与指令。
- 确定性转换、校验和数据操作放在脚本中。
- 需要新运行时代码时，插件通过独立进程和协议接入。
- 包管理器负责分发、版本和生命周期。

选择扩展形式时，可以先问：这是知识、确定性动作，还是新的运行时能力？把代码硬塞进 Skill 会降低可测试性，把简单流程做成插件则会增加不必要的信任和维护成本。

## 技能作为规则层

两层 Spec 视角下，技能很适合作为规则层：记录长期稳定的项目 know-how、工具约定、性能边界和踩坑记录。一次具体 change 则属于变更层。

在[OpenSpec 变更工作流](/wiki/concepts/openspec-change-workflow)中，proposal 可以显式声明复用某个 skill；运行时触发让 AI 真正使用规则，显式引用让人未来能审计依赖，archive 则把新踩坑回写到 skill。

## 与记忆和工具的关系

[Claude Code 记忆文件](/wiki/concepts/claude-code-memory-files)适合放总是需要的项目默认规则。Skills 适合放任务特定流程。工具是动作表面，skill 是操作知识；好的 skill 不会让模型凭记忆做确定性工作，而是调用脚本或工具完成。

Skill 还是持续演化的知识资产。真实任务暴露的失败，应优先沉淀为校验脚本、模板、参考资料或触发条件，并用版本和测试防止旧流程重新出现。

## 相关页面

- [Claude Code 技能](/wiki/concepts/claude-code-skills)
- [渐进式披露](/wiki/concepts/progressive-disclosure)
- [Claude Code 扩展系统](/wiki/concepts/claude-code-extension-system)
- [AI 知识工程反馈循环](/wiki/concepts/ai-knowledge-engineering-feedback-loop)
- [SDD 规格生命周期](/wiki/concepts/sdd-spec-lifecycle)
- [OpenSpec 变更工作流](/wiki/concepts/openspec-change-workflow)
