'use client'

import dynamic from 'next/dynamic'
import { Component, type ReactNode } from 'react'

const MemoryDemo = dynamic(() => import('./MemoryDemo'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%', height: 300, border: '1px solid #e5e7eb', borderRadius: 12,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#f9fafb', margin: '24px 0',
    }}>
      <span style={{ color: '#6b7280' }}>加载记忆可视化组件中...</span>
    </div>
  ),
})

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100%', height: 200, border: '1px solid #fecaca', borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#fef2f2', margin: '24px 0',
        }}>
          <span style={{ color: '#dc2626' }}>可视化暂时无法加载</span>
        </div>
      )
    }
    return this.props.children
  }
}

export default function MemoryDemoLoader() {
  return <ErrorBoundary><MemoryDemo /></ErrorBoundary>
}
