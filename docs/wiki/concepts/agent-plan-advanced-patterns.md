---
title: "智能体 Plan 高级模式"
type: "concept"
tags: [agent, planning, agent-harness, evaluation, synthesis]
created: "2026-07-20"
updated: "2026-07-20"
---

# 智能体 Plan 高级模式

基础 Plan 容易受到单次生成质量和线性步骤结构的限制。两个常见升级方向是：在执行前循环评审 Plan，以及用 DAG 表达真实依赖关系。

## 生成—评估—修订

不要生成 Plan 后立即执行，而是增加 Plan Verifier：

```text
生成 Plan → 结构化评审 → 按问题修订 → 达标后执行
```

评审器可以按 Goal、Context、Choice、Checkpoint、Correction 输出分数、问题和建议。循环必须设置最大次数；平均修订轮数也应被记录，因为它能反映生成器是否退化，或评审标准是否发生变化。

## DAG Plan

当任务存在真实并行或复杂依赖时，可以先识别依赖，再生成 DAG：

```json
{
  "id": "generate_highlights",
  "depends_on": ["extract_facts", "analyze_role"]
}
```

循环依赖不能只交给模型判断，必须用确定性代码校验。提示中还应包含依赖规则、正反例和少量正确 DAG 示例。

## 采用顺序

1. 默认使用单次生成的线性 Plan，成本最低且便于调试。
2. 高代价、长任务或不可逆操作增加迭代评审。
3. 只有存在真实并行和复杂依赖时才升级 DAG。
4. 提示和评审达到瓶颈、且已有稳定优质样本后，再考虑微调。

Verifier 可以与[Plan 评估](/wiki/concepts/agent-plan-evaluation)共享标准；循环上限与成本指标则属于[智能体循环工程](/wiki/concepts/agent-loop-engineering)和[智能体成本控制](/wiki/concepts/agent-cost-control)的约束范围。
