---
title: "智能体 Harness 工程"
type: "concept"
tags: [agent, harness, architecture, runtime]
created: "2026-07-02"
updated: "2026-07-23"
---

# 智能体 Harness 工程

智能体 Harness 工程，是把模型放进一个可控运行时：它定义状态、工具、权限、事件、校验、日志和恢复机制，让智能体不只是“会调用模型”，而是能在真实工程系统里可靠工作。

## 为什么需要 Harness

框架可以加快起步，但真正决定系统质量的是底层 Harness：

- 状态如何保存和恢复。
- 工具如何注册、隔离和审计。
- 模型输出如何被校验，而不是直接信任。
- 任务循环如何停止、重试或交给人处理。
- 成本、权限和风险如何在运行时被约束。

当这些问题没有被显式设计时，智能体系统会很快堆成不可调试的脚本集合。

## 源码级运行边界

[pigo](/wiki/entities/pigo) 展示了 Harness 如何被拆成可检查的源码边界：

- [智能体运行时契约](/wiki/concepts/agent-runtime-contracts)统一消息、事件、工具和 Hooks。
- 两层循环分开处理单轮模型交互与多轮任务推进。
- [工具执行流水线](/wiki/concepts/agent-tool-execution-pipeline)在副作用发生前完成参数校验和权限拦截。
- [上下文压缩](/wiki/concepts/agent-context-compaction)与[会话持久化](/wiki/concepts/agent-session-persistence)管理跨窗口、跨进程状态。
- 供应商适配器只负责协议转换，不把模型差异泄漏到主循环。

这说明 Harness 的重点不在“增加更多框架抽象”，而在让依赖方向、失败语义、生命周期事件和安全边界足够明确。

## 运行时契约

一个可维护的 Harness 至少需要覆盖：

- 工具契约：输入输出 schema、权限边界、错误语义。
- 记忆契约：哪些状态可持久化，哪些只是会话上下文。
- 执行契约：任务循环、停止条件、重试策略和人工接管点。
- 验证契约：测试、lint、格式检查、发布检查和业务校验。
- 成本契约：模型档位、预算上限、缓存策略和调用报告。

新增的成本层很重要：智能体一旦进入自动化循环，费用就和可靠性一样成为系统边界。

## 与 MCP、流水线和调度的关系

[模型上下文协议](/wiki/concepts/model-context-protocol)可以作为 Harness 的工具和资源接入层；[确定性数据流水线](/wiki/concepts/deterministic-data-pipeline)适合承接固定的数据搬运和规整；[无服务器定时任务](/wiki/concepts/serverless-scheduled-jobs)与 CI 调度可以启动周期性工作；[智能体无头执行](/wiki/concepts/agent-headless-execution)让任务在无人值守环境里运行。

Harness 的价值，是把这些能力组织成一个有边界、可观察、可恢复的系统，而不是让模型自由拼接工具。

[智能体输入规范化](/wiki/concepts/agent-input-normalization)和[意图识别流水线](/wiki/concepts/agent-intent-recognition-pipeline)还构成 Harness 的前门：它们决定当前请求应激活哪些工作流、工具和权限。
