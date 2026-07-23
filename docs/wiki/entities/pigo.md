---
title: "pigo"
type: "entity"
tags: [project, open-source, agent-harness, developer-tool, ai-coding]
created: "2026-07-23"
updated: "2026-07-23"
---

# pigo

pigo 是 pi 命令行 AI 智能体的 Go 语言复刻。它适合作为 Agent Harness 的源码级学习案例：不只描述“模型、上下文和工具”，而是沿着一条命令追踪这些组件如何被连接成可运行系统。

## 架构地图

1. 轻量 CLI 解析用户意图并组装运行配置。
2. 底层契约包定义消息、内容块、事件、工具和 Hooks。
3. 两层循环负责流式模型响应、执行工具、回填结果并判断是否继续。
4. 供应商适配器把不同模型流转换成统一内部事件。
5. [工具执行流水线](/wiki/concepts/agent-tool-execution-pipeline)完成参数校验、权限拦截、执行和收尾。
6. [上下文压缩](/wiki/concepts/agent-context-compaction)和[会话持久化](/wiki/concepts/agent-session-persistence)支持跨窗口和跨进程继续工作。
7. 信任门、子智能体隔离、Skills、插件与包管理器扩展运行时。

## 为什么值得研究

Go 的接口、显式错误、Channel 和进程模型会迫使隐藏契约变得可见：供应商差异如何收敛、生命周期事件如何流动、工具何时并发、会话如何序列化，都需要清楚表达。

代价是更多样板代码；收益是共享契约更早得到检查，子智能体可以通过独立进程隔离，运行失败也能表现为类型化事件或工具结果。

pigo 为[智能体 Harness 工程](/wiki/concepts/agent-harness-engineering)提供了具体实现参照，也适合与 [OpenClaw](/wiki/entities/openclaw)和 [Claude Code](/wiki/entities/claude-code)对比。
