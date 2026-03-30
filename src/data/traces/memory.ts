import type { MemoryTrace } from '@/types/memory-trace'

export const conversationMemoryTrace: MemoryTrace = {
  id: 'conversation',
  title: '对话记忆 — 存储、检索、淘汰',
  description: '用户多轮对话中，Agent 如何管理记忆：存入偏好、检索相关记忆、淘汰过期信息。',
  initialMemory: [
    { id: 'w1', type: 'working', content: '当前对话: 用户在问编程问题', score: 1.0, timestamp: 0 },
    { id: 'l1', type: 'longterm', content: '用户偏好: Python, 简洁风格', score: 0.85, timestamp: -86400000 },
    { id: 'l2', type: 'longterm', content: '用户项目: AI Agent 课程网站', score: 0.78, timestamp: -43200000 },
    { id: 'e1', type: 'episodic', content: '上次调试: useEffect 循环问题，用 useRef 解决', score: 0.65, timestamp: -172800000 },
    { id: 'c1', type: 'cache', content: '"北京天气" → "22°C, 晴"', score: 0.5, timestamp: -3600000 },
  ],
  events: [
    {
      id: 'ev1', action: 'recall', description: '用户问"用上次的格式"→ 检索长期记忆，找到偏好',
      affectedIds: ['l1'], timestamp: 1000,
    },
    {
      id: 'ev2', action: 'store', description: '用户说"以后代码都加类型注解" → 存入新偏好',
      affectedIds: [], timestamp: 3000,
      newEntries: [{ id: 'l3', type: 'longterm', content: '用户偏好: 代码加类型注解 (TypeScript)', score: 0.9, timestamp: 3000 }],
    },
    {
      id: 'ev3', action: 'cache_hit', description: '用户又问"北京天气" → 语义缓存命中，直接返回',
      affectedIds: ['c1'], timestamp: 5000,
    },
    {
      id: 'ev4', action: 'recall', description: '用户问"上次那个 React bug 怎么修的" → 检索情景记忆',
      affectedIds: ['e1'], timestamp: 7000,
    },
    {
      id: 'ev5', action: 'store', description: '这次调试了 Next.js SSR 问题 → 存入新情景记忆',
      affectedIds: [], timestamp: 9000,
      newEntries: [{ id: 'e2', type: 'episodic', content: '调试: Next.js SSR hydration 错误，用 dynamic import 解决', score: 0.8, timestamp: 9000 }],
    },
    {
      id: 'ev6', action: 'evict', description: '记忆容量接近上限 → 淘汰得分最低的缓存条目',
      affectedIds: ['c1'], removedIds: ['c1'], timestamp: 11000,
    },
    {
      id: 'ev7', action: 'compress', description: '两条相似偏好合并 → "Python/TypeScript, 简洁+类型注解"',
      affectedIds: ['l1', 'l3'], removedIds: ['l1', 'l3'], timestamp: 13000,
      newEntries: [{ id: 'l4', type: 'longterm', content: '用户偏好: Python/TypeScript, 简洁风格 + 类型注解', score: 0.92, timestamp: 13000 }],
    },
  ],
}

export const allMemoryTraces: MemoryTrace[] = [conversationMemoryTrace]
