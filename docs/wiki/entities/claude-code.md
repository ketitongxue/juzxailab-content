---
title: "Claude Code"
type: "entity"
tags: [claude-code, ai-coding, agent]
created: "2026-07-01"
updated: "2026-07-14"
---

# Claude Code

Claude Code 是 Anthropic 面向软件工程场景的编码智能体。它的关键价值不只是生成代码，而是在真实代码库中读取上下文、调用工具、修改文件、运行验证，并围绕工程目标持续推进。

## 常用能力

Claude Code 的实践通常围绕几类能力展开：

- 项目理解：读取代码、配置、文档和历史约定。
- 修改执行：编辑文件、运行命令、修复测试、整理提交。
- 工程循环：从需求、规格、实现到验证和发布。
- 扩展能力：通过 Skills、Hooks、MCP 和本地脚本复用工作流。

## 循环与自动化

近期围绕 Claude Code 的讨论，重点已经从“如何写提示词”扩展到“如何构建循环”。常见形态包括普通回合、目标循环、本地定时循环、云端计划任务、主动式工作流和无头执行。

这些循环可以理解为一组逐步交出的责任：

- 普通回合：用户仍然负责检查结果并决定下一步。
- goal 命令：用户把“怎样算完成”交给验证器，适合测试数、分数阈值、CI 状态等确定性条件。
- loop 命令：用户把触发时机交给本地间隔，适合持续检查 PR、队列、消息或外部状态。
- schedule 命令：把循环搬到云端，适合离开本机后仍要运行的例程。
- 主动式工作流：把计划任务、目标、动态工作流、自动模式和复审智能体组合起来，处理持续出现的反馈、bug、issue、迁移或依赖升级。

这使 Claude Code 和以下主题紧密相关：

- [Claude Code 技能](/wiki/concepts/claude-code-skills)
- [Claude Code Hooks](/wiki/concepts/claude-code-hooks)
- [Claude Code 扩展系统](/wiki/concepts/claude-code-extension-system)
- [智能体循环工程](/wiki/concepts/agent-loop-engineering)
- [智能体反馈循环](/wiki/concepts/agent-feedback-loop)

## 技术导演模式

Claude Code 也可以作为个人开发者的技术规划伙伴，而不只是代码生成器。面对登录保护、验证码或跨模块功能时，可以先给出高层目标、现有架构、数据约束和验收标准，再让它输出：

- 模块设计与影响范围。
- 可执行的任务拆解。
- 多种实现方案及其取舍。
- 测试、验证和发布计划。

在这种模式下，一个高层需求可以先被映射到数据库、中间件、路由、日志、统一拦截行为和测试，再进入实现。人的职责是确认目标、审查关键取舍并验收结果；Claude Code 负责扩大分析和执行的覆盖面。

相关方法可继续阅读[智能体任务简报](/wiki/concepts/agent-task-briefing)和[上下文工程](/wiki/concepts/context-engineering)。

## 工程边界

Claude Code 越强，越需要明确边界：权限、文件范围、验证命令、成本预算、提交策略和发布流程。成熟用法不是让它自由行动，而是把它放进[智能体 Harness 工程](/wiki/concepts/agent-harness-engineering)和[AI 编程工程循环](/wiki/concepts/ai-coding-engineering-loop)中。
