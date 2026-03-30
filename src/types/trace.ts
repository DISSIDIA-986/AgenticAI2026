export type StepType = 'thought' | 'action' | 'observation' | 'answer' | 'error'

export interface TraceStep {
  id: string
  type: StepType
  label: string
  content: string
  /** milliseconds from trace start */
  timestamp: number
}

export interface AgentTrace {
  id: string
  title: string
  description: string
  outcome: 'success' | 'loop' | 'failure'
  steps: TraceStep[]
}

export const STEP_STYLES: Record<StepType, { bg: string; border: string; icon: string }> = {
  thought:     { bg: '#e0f2fe', border: '#0284c7', icon: '💭' },
  action:      { bg: '#fef3c7', border: '#d97706', icon: '⚡' },
  observation: { bg: '#d1fae5', border: '#059669', icon: '👁' },
  answer:      { bg: '#ede9fe', border: '#7c3aed', icon: '✅' },
  error:       { bg: '#fee2e2', border: '#dc2626', icon: '❌' },
}
