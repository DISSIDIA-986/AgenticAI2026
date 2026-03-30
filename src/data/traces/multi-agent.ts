import type { MultiAgentTrace } from '@/types/multi-agent-trace'

export const blogWritingTrace: MultiAgentTrace = {
  id: 'blog-writing',
  title: '博客写作 — 专家委员会模式',
  description: 'Orchestrator 协调 Researcher、Writer、Reviewer 三个 Agent 完成一篇博客。展示任务委派和结果汇总。',
  agents: [
    { id: 'user', role: 'user', label: '用户', icon: '👤' },
    { id: 'orch', role: 'orchestrator', label: '协调者', icon: '🎯' },
    { id: 'research', role: 'researcher', label: '研究员', icon: '🔍' },
    { id: 'writer', role: 'writer', label: '写手', icon: '✍️' },
    { id: 'reviewer', role: 'reviewer', label: '审查员', icon: '📋' },
  ],
  messages: [
    { id: 'm1', from: 'user', to: 'orch', content: '写一篇关于 MCP 协议的技术博客', timestamp: 0 },
    { id: 'm2', from: 'orch', to: 'research', content: '搜索 MCP 协议最新资料和应用案例', timestamp: 400 },
    { id: 'm3', from: 'research', to: 'orch', content: '找到 3 篇核心资料：Anthropic 官方文档、97M SDK 下载量数据、5 个 MCP Server 案例', timestamp: 1200 },
    { id: 'm4', from: 'orch', to: 'writer', content: '基于这些资料写一篇 2000 字的博客，重点讲 MCP 解决了什么问题', timestamp: 1500 },
    { id: 'm5', from: 'writer', to: 'orch', content: '初稿完成：《MCP：AI 的 USB-C》，2100 字，包含架构图和代码示例', timestamp: 3000 },
    { id: 'm6', from: 'orch', to: 'reviewer', content: '审查这篇博客：技术准确性、可读性、结构完整性', timestamp: 3200 },
    { id: 'm7', from: 'reviewer', to: 'orch', content: '建议：1) 开头太抽象需加具体例子 2) 代码示例缺少注释 3) 结尾需要行动号召', timestamp: 4000 },
    { id: 'm8', from: 'orch', to: 'writer', content: '根据审查意见修改：加开头案例、代码注释、结尾 CTA', timestamp: 4200 },
    { id: 'm9', from: 'writer', to: 'orch', content: '修改完成，已添加 Slack 集成案例、代码注释和"立即试试 MCP"结尾', timestamp: 5000 },
    { id: 'm10', from: 'orch', to: 'user', content: '博客《MCP：AI 的 USB-C》已完成，2300 字。经过研究、写作、审查、修改四轮处理。', timestamp: 5200 },
  ],
}

export const debateTrace: MultiAgentTrace = {
  id: 'debate',
  title: '辩论模式 — 减少幻觉',
  description: '两个 Agent 对同一问题给出不同观点，第三个做裁判。通过对抗减少单一视角的偏差。',
  agents: [
    { id: 'user', role: 'user', label: '用户', icon: '👤' },
    { id: 'orch', role: 'orchestrator', label: '裁判', icon: '⚖️' },
    { id: 'pro', role: 'researcher', label: '正方', icon: '👍' },
    { id: 'con', role: 'writer', label: '反方', icon: '👎' },
  ],
  messages: [
    { id: 'd1', from: 'user', to: 'orch', content: 'Agent 应该使用长期记忆还是每次从零开始？', timestamp: 0 },
    { id: 'd2', from: 'orch', to: 'pro', content: '请论证：Agent 应该使用长期记忆', timestamp: 300 },
    { id: 'd3', from: 'orch', to: 'con', content: '请论证：Agent 应该每次从零开始', timestamp: 300 },
    { id: 'd4', from: 'pro', to: 'orch', content: '长期记忆让 Agent 积累经验、避免重复错误、记住用户偏好。Stanford Generative Agents 论文证明了记忆驱动行为的有效性。', timestamp: 1200 },
    { id: 'd5', from: 'con', to: 'orch', content: '记忆引入复杂性：幻觉记忆、隐私泄露、过时信息。每次从零开始保证可重现性和安全性。大多数生产 Agent 实际上不用长期记忆。', timestamp: 1400 },
    { id: 'd6', from: 'orch', to: 'user', content: '裁决：两方都有道理。建议分场景：用户助手类 Agent 用长期记忆（个性化价值高），工具类 Agent 从零开始（可重现性优先）。关键是记忆的写入要有门槛，不是什么都记。', timestamp: 2000 },
  ],
}

export const allMultiAgentTraces: MultiAgentTrace[] = [blogWritingTrace, debateTrace]
