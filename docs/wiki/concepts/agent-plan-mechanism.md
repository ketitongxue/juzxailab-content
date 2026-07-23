---
title: "智能体 Plan 机制"
type: "concept"
tags: [agent, planning, agent-harness, context-engineering, evaluation]
created: "2026-07-20"
updated: "2026-07-20"
---

# 智能体 Plan 机制

智能体 Plan 机制把模型生成的步骤列表，升级为可检查、可纠偏、可执行的运行时对象。步骤只是外部表现，真正让 Plan 有效的是目标、上下文、路径理由、检查点和恢复规则。

## Plan 解决什么问题

Plan 的本质是降低执行不确定性：

1. **目标不确定**：用户想达到什么状态，怎样才算成功。
2. **上下文不确定**：哪些事实已确认，哪些信息仍需收集。
3. **路径不确定**：存在多种实现路径时选哪一条，以及为什么。
4. **过程不确定**：执行中的步骤是否满足约束并产生有效中间结果。
5. **失败不确定**：不同失败应重试、重新规划、澄清、回滚还是中止。

其中，路径选择的理由往往比步骤本身更重要。没有理由的步骤在故障发生后很难调试，也无法判断应该改变执行还是改变 Plan。

## 主题结构

- [G4C 框架](/wiki/concepts/agent-plan-g4c-framework)定义 Goal、Context、Choice、Checkpoint、Correction。
- [Plan 纠偏策略](/wiki/concepts/agent-plan-correction-strategies)定义五种运行时恢复动作。
- [Plan 评估](/wiki/concepts/agent-plan-evaluation)衡量离线结构质量和线上执行结果。
- [Plan 高级模式](/wiki/concepts/agent-plan-advanced-patterns)介绍生成—评审—修订循环与 DAG Plan。

意图识别决定用户需要哪个工作流，Plan 决定这个工作流如何执行；[智能体任务简报](/wiki/concepts/agent-task-briefing)稳定输入，Plan 稳定后续执行。简单单步任务不一定需要 Plan，但有分支、硬约束或高代价操作时，它是重要的 Harness 状态。
