---
title: "智能体 Plan 的 G4C 框架"
type: "concept"
tags: [agent, planning, context-engineering, agent-harness, synthesis]
created: "2026-07-20"
updated: "2026-07-20"
---

# 智能体 Plan 的 G4C 框架

G4C 是检查智能体 Plan 是否完整的五要素：**Goal、Context、Choice、Checkpoint、Correction**。名称本身不是行业标准，但五个结构要素具有通用价值。

| 要素 | 核心问题 | 缺失代价 |
| --- | --- | --- |
| Goal | 要到哪里，成功标准是什么 | 目标漂移 |
| Context | 当前已知什么，还缺什么 | 脱离事实规划 |
| Choice | 为什么选择这条路径 | 无法调整和调试 |
| Checkpoint | 怎样及时发现偏离 | 到最后才发现错误 |
| Correction | 偏离后如何恢复 | 只能完全重来 |

## Goal 与 Context

Goal 不应停留在“更专业”“更高级”这类形容词，必须把它们转换为具体成功标准。

Context 至少包含：

- `known_facts`：用户已经确认的事实。
- `missing_info`：仍需收集或澄清的信息。
- `constraints`：执行过程不能违反的条件。

硬约束必须满足，软偏好尽量满足。约束应在每次关键模型调用中保持高优先级，并且只能由用户输入修改，智能体不能自行放宽。

## Choice 与 Checkpoint

Choice 需要记录候选路径、选中路径和基于证据的理由。每个步骤还可以说明目标和存在原因。

Checkpoint 在里程碑、关键中间结果和高错误率步骤后执行，并生成带证据的结构化结果。检查点既能提前阻止漂移，也为后续回滚和根因定位提供位置。

## Correction

Correction 定义失败后的动作，包括重试、重新规划、向用户澄清、回滚和中止。常见缺陷是强制智能体“总要给答案”，却没有在关键信息缺失时选择澄清。

G4C 规定 Plan 应包含什么；如何提高生成质量，还需要[Plan 高级模式](/wiki/concepts/agent-plan-advanced-patterns)和[Plan 评估](/wiki/concepts/agent-plan-evaluation)。
