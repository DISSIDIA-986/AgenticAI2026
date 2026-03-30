'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  MarkerType,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { allMultiAgentTraces } from '@/data/traces/multi-agent'
import { AGENT_STYLES, type MultiAgentTrace } from '@/types/multi-agent-trace'

function buildNodes(trace: MultiAgentTrace): Node[] {
  const count = trace.agents.length
  const centerX = 200
  const centerY = 200
  const radius = 160

  return trace.agents.map((agent, i) => {
    const style = AGENT_STYLES[agent.role]
    // Arrange in a circle
    const angle = (i / count) * 2 * Math.PI - Math.PI / 2
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)

    return {
      id: agent.id,
      data: { label: `${agent.icon}\n${agent.label}` },
      position: { x, y },
      style: {
        background: style.bg,
        border: `2px solid ${style.border}`,
        borderRadius: '50%',
        width: 90,
        height: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        fontWeight: 600,
        whiteSpace: 'pre-wrap' as const,
        textAlign: 'center' as const,
      },
    }
  })
}

function buildEdges(trace: MultiAgentTrace, activeIndex: number): Edge[] {
  return trace.messages
    .filter((_, i) => i <= activeIndex)
    .map((msg, i) => ({
      id: msg.id,
      source: msg.from,
      target: msg.to,
      animated: i === activeIndex,
      label: msg.content.length > 30 ? msg.content.slice(0, 30) + '...' : msg.content,
      labelStyle: { fontSize: 11, fill: '#374151' },
      labelBgStyle: { fill: '#fff', fillOpacity: 0.9 },
      labelBgPadding: [4, 8] as [number, number],
      labelBgBorderRadius: 4,
      style: {
        stroke: i === activeIndex ? '#2563eb' : '#9ca3af',
        strokeWidth: i === activeIndex ? 2.5 : 1.5,
      },
      markerEnd: { type: MarkerType.ArrowClosed, color: i === activeIndex ? '#2563eb' : '#9ca3af' },
    }))
}

export default function MultiAgentDemo() {
  const [traceIndex, setTraceIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const trace: MultiAgentTrace = allMultiAgentTraces[traceIndex]
  const maxStep = trace.messages.length - 1

  const nodes = useMemo(() => buildNodes(trace), [trace])
  const edges = useMemo(() => buildEdges(trace, step), [trace, step])

  // Current message detail
  const currentMsg = trace.messages[step]
  const fromAgent = trace.agents.find(a => a.id === currentMsg.from)
  const toAgent = trace.agents.find(a => a.id === currentMsg.to)

  const play = useCallback(() => {
    setIsPlaying(true)
    setStep(0)
    let current = 0
    const interval = setInterval(() => {
      current++
      if (current > maxStep) {
        clearInterval(interval)
        setIsPlaying(false)
        return
      }
      setStep(current)
    }, 1200)
    return () => clearInterval(interval)
  }, [maxStep])

  return (
    <div style={{ margin: '24px 0' }}>
      {/* Trace selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        {allMultiAgentTraces.map((t, i) => (
          <button
            key={t.id}
            onClick={() => { setTraceIndex(i); setStep(0); setIsPlaying(false) }}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              border: i === traceIndex ? '2px solid #2563eb' : '1px solid #d1d5db',
              background: i === traceIndex ? '#eff6ff' : '#fff',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: i === traceIndex ? 600 : 400,
            }}
          >
            {t.title}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>{trace.description}</p>

      {/* Graph */}
      <div style={{
        width: '100%',
        height: 480,
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#fafafa',
      }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.4 }}
          attributionPosition="bottom-left"
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={false}
        >
          <Background />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      {/* Message detail */}
      <div style={{
        marginTop: 12,
        padding: '12px 16px',
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        fontSize: 13,
      }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontWeight: 600 }}>{fromAgent?.icon} {fromAgent?.label}</span>
          <span style={{ color: '#9ca3af' }}>→</span>
          <span style={{ fontWeight: 600 }}>{toAgent?.icon} {toAgent?.label}</span>
        </div>
        <div style={{ color: '#374151', lineHeight: 1.6 }}>{currentMsg.content}</div>
      </div>

      {/* Timeline controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginTop: 12,
        padding: '10px 16px',
        background: '#f9fafb',
        borderRadius: 10,
        border: '1px solid #e5e7eb',
      }}>
        <button
          onClick={play}
          disabled={isPlaying}
          style={{
            padding: '6px 16px',
            borderRadius: 8,
            border: 'none',
            background: isPlaying ? '#d1d5db' : '#2563eb',
            color: '#fff',
            cursor: isPlaying ? 'default' : 'pointer',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {isPlaying ? '播放中...' : '▶ 播放'}
        </button>

        <input
          type="range"
          min={0}
          max={maxStep}
          value={step}
          onChange={(e) => { setStep(Number(e.target.value)); setIsPlaying(false) }}
          style={{ flex: 1 }}
        />

        <span style={{ fontSize: 13, color: '#6b7280', minWidth: 80, textAlign: 'right' }}>
          消息 {step + 1} / {maxStep + 1}
        </span>
      </div>
    </div>
  )
}
