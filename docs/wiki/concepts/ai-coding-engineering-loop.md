---
title: "AI 编程工程循环"
type: "concept"
tags: [ai-coding, workflow, planning, evaluation, synthesis]
created: "2026-06-13"
updated: "2026-07-20"
---

# AI 编程工程循环

AI 编程工程循环，是把 AI 辅助编码从一轮轮提示词推进，升级为有拆解、计划、实现、测试、评审、发布和复盘的工程系统。

## 基本机制

在 Claude Code 等编码智能体中，这个循环通过计划模式、文件定位、项目记忆、子代理、skills、hooks 和权限控制来实现。目标不是让 AI 更快地产生代码，而是让每一步都有上下文、边界和反馈。

[规格驱动开发](/wiki/concepts/spec-driven-development)提供了这个循环的控制面：先写规则，再让 AI 执行，随后按规则评审，并把缺失规则补回系统。

[智能体任务简报](/wiki/concepts/agent-task-briefing)是轻量入口；[苏格拉底式规格细化](/wiki/concepts/socratic-spec-refinement)适合需求还不清楚时先问完整；[SDD 规格生命周期](/wiki/concepts/sdd-spec-lifecycle)则把实现循环扩展为 plan、align、execute、test、archive。

## Plan 是最高杠杆的转向点

[智能体 Plan 机制](/wiki/concepts/agent-plan-mechanism)位于需求澄清和代码实现之间。它不只是列出步骤，还要保存目标、已知事实、硬软约束、路径理由、检查点和纠偏规则。

在 AI 编程中，人最容易、成本最低地改变方向的时机，是代码尚未大量生成前审查 Plan。关键检查包括：

- 是否理解了真正的业务目标和验收行为。
- 是否读取了现有架构和项目规则。
- 为什么选择当前实现路径，替代方案是什么。
- 哪些阶段必须运行测试或人工确认。
- 失败时应该重试、重新规划、回滚还是停止。

对于高代价改动，可以在执行前增加[Plan 评估](/wiki/concepts/agent-plan-evaluation)；存在真实并行依赖时，再采用 [DAG Plan](/wiki/concepts/agent-plan-advanced-patterns)。

## 从编码者到工程导演

编码智能体扩展了个人开发者的能力边界，也改变了人的工作重心。人不必亲自翻译每个需求为代码，而要更多地负责：

- 定义目标、用户价值和成功标准。
- 提供业务上下文、现有架构与不可突破的边界。
- 审查任务拆解、方案取舍和关键设计决策。
- 根据测试、运行结果和产品反馈判断是否继续。

智能体则可以参与模块设计、任务拆解、方案比较、实现和验证。一个更完整的循环是：先给出目标与上下文，让 AI 提出可选路径；人确认关键取舍后，再拆成任务执行；最后用测试和验收标准校正结果。

这不是把工程判断全部交给 AI，而是把人的精力从重复编码转向问题定义、系统设计和质量控制。

## 重型变更循环

[OpenSpec 变更工作流](/wiki/concepts/openspec-change-workflow)是更重的版本，适合需要长期追溯的改动：先 explore，写 proposal，生成 spec 和 tasks，拷问 spec，apply 到代码，verify 覆盖情况，最后 archive。

它的价值在于把一次 change 的意图、边界、实现、测试和决策记录连起来。几个月后回看，不只知道改了什么，还知道为什么这么改。

## 产品和运行层

AI 编程循环还需要覆盖编码之外的现实约束：[产品数据层选型](/wiki/concepts/product-data-layer-selection)、[产品部署发布工作流](/wiki/concepts/product-deployment-release-workflow)、[产品滥用防护](/wiki/concepts/product-abuse-protection)、[产品反馈循环](/wiki/concepts/product-feedback-loop)和[产品分析迭代循环](/wiki/concepts/product-analytics-iteration-loop)都会影响最终交付。

对于周期性知识工作，[确定性数据流水线](/wiki/concepts/deterministic-data-pipeline)负责低成本采集和规整，[智能体无头执行](/wiki/concepts/agent-headless-execution)处理无人值守判断任务，[智能体成本控制](/wiki/concepts/agent-cost-control)约束 token 开销。

## 常见失败模式

- 计划不清楚就让 AI 写代码。
- 缺少红线和验收标准，让 AI 自行发明边界。
- 生成解释听起来合理，就跳过验证。
- 用高权限模式处理高风险改动。
- 把功能完成误认为产品验证完成。
- 只保存一次性对话，不沉淀记忆、skill、hook、测试或 spec。
- 把所有决策一并交给 AI，却没有审查方案取舍和验收结果。

## 相关页面

- [Claude Code](/wiki/entities/claude-code)
- [智能体无头执行](/wiki/concepts/agent-headless-execution)
- [规格驱动开发](/wiki/concepts/spec-driven-development)
- [OpenSpec 变更工作流](/wiki/concepts/openspec-change-workflow)
- [智能体任务简报](/wiki/concepts/agent-task-briefing)
- [SDD 分层采用模型](/wiki/concepts/sdd-layered-adoption-model)
- [SDD 规格生命周期](/wiki/concepts/sdd-spec-lifecycle)
