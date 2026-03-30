export type AgentRole = 'orchestrator' | 'researcher' | 'writer' | 'reviewer' | 'user'

export interface AgentDef {
  id: string
  role: AgentRole
  label: string
  icon: string
}

export interface Message {
  id: string
  from: string
  to: string
  content: string
  timestamp: number
}

export interface MultiAgentTrace {
  id: string
  title: string
  description: string
  agents: AgentDef[]
  messages: Message[]
}

export const AGENT_STYLES: Record<AgentRole, { bg: string; border: string }> = {
  orchestrator: { bg: '#ede9fe', border: '#7c3aed' },
  researcher:   { bg: '#e0f2fe', border: '#0284c7' },
  writer:       { bg: '#fef3c7', border: '#d97706' },
  reviewer:     { bg: '#d1fae5', border: '#059669' },
  user:         { bg: '#f3f4f6', border: '#6b7280' },
}
