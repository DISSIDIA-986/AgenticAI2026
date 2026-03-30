export type MemoryType = 'working' | 'longterm' | 'episodic' | 'cache'

export interface MemoryEntry {
  id: string
  type: MemoryType
  content: string
  score: number
  timestamp: number
}

export type MemoryAction = 'store' | 'recall' | 'evict' | 'cache_hit' | 'compress'

export interface MemoryEvent {
  id: string
  action: MemoryAction
  description: string
  /** which memory entries are affected */
  affectedIds: string[]
  /** new entries added by this event */
  newEntries?: MemoryEntry[]
  /** entries removed by this event */
  removedIds?: string[]
  timestamp: number
}

export interface MemoryTrace {
  id: string
  title: string
  description: string
  initialMemory: MemoryEntry[]
  events: MemoryEvent[]
}

export const MEMORY_TYPE_STYLES: Record<MemoryType, { bg: string; border: string; icon: string; label: string }> = {
  working:  { bg: '#fef3c7', border: '#d97706', icon: '🧠', label: '工作记忆' },
  longterm: { bg: '#e0f2fe', border: '#0284c7', icon: '💾', label: '长期记忆' },
  episodic: { bg: '#ede9fe', border: '#7c3aed', icon: '📸', label: '情景记忆' },
  cache:    { bg: '#d1fae5', border: '#059669', icon: '⚡', label: '语义缓存' },
}

export const ACTION_LABELS: Record<MemoryAction, { icon: string; label: string; color: string }> = {
  store:     { icon: '💾', label: '存入', color: '#2563eb' },
  recall:    { icon: '🔍', label: '检索', color: '#059669' },
  evict:     { icon: '🗑️', label: '淘汰', color: '#dc2626' },
  cache_hit: { icon: '⚡', label: '缓存命中', color: '#d97706' },
  compress:  { icon: '📦', label: '压缩', color: '#7c3aed' },
}
