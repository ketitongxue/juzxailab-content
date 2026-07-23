---
title: "智能体 Plan 纠偏策略"
type: "concept"
tags: [agent, planning, agent-harness, safety, evaluation]
created: "2026-07-20"
updated: "2026-07-20"
---

# 智能体 Plan 纠偏策略

纠偏策略是在 Plan 执行偏离预期时启动的恢复机制。关键原则是：不同失败需要不同恢复动作，规则应预先写入 Plan，而不是运行中临时猜测。

## 五类动作

| 动作 | 作用 | 适用场景 |
| --- | --- | --- |
| Retry | 不改变 Plan，重新执行 | 网络超时、格式错误、短暂工具故障 |
| Replan | 重新生成 Plan | 路径本身错误，而不是单次执行失败 |
| Clarify | 向用户补充提问 | 关键输入缺失，继续回答会浪费成本 |
| Rollback | 回到某个检查点前 | 中途发现数据或状态错误 |
| Interrupt | 停止并交回控制权 | 无法安全恢复的异常 |

Retry 应设定次数预算，并区分重试当前步骤、局部流程还是整个任务。Replan 必须记录触发原因和旧 Plan 版本。Rollback 必须指向明确定义的可恢复检查点。

## 作为 Plan 数据

纠偏规则可以表达为“条件 + 动作”：

```json
{
  "condition": "缺少关键项目事实",
  "action": "clarify"
}
```

结构化动作可以继续携带步骤 ID、重试上限和回滚目标，方便 Harness 调度工具或 Skills。

## 诊断价值

纠偏频率本身也是质量指标：

- 重试率高，通常意味着工具或基础设施不稳定。
- Replan 率高，通常意味着初始 Plan 质量不足。
- 澄清率高，可能意味着意图或上下文采集不完整。

纠偏必须与[G4C 检查点](/wiki/concepts/agent-plan-g4c-framework)、[Plan 评估](/wiki/concepts/agent-plan-evaluation)和[智能体 Harness 工程](/wiki/concepts/agent-harness-engineering)一起设计，避免无限重试或静默改写执行路径。
