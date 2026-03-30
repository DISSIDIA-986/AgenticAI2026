'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { allTraces } from '@/data/traces'
import { STEP_STYLES, type AgentTrace, type TraceStep } from '@/types/trace'

function stepsToNodes(steps: TraceStep[], activeIndex: number): Node[] {
  return steps.map((step, i) => {
    const style = STEP_STYLES[step.type]
    const isActive = i <= activeIndex
    const isCurrent = i === activeIndex
    return {
      id: step.id,
      data: {
        label: `${style.icon} ${step.label}\n${step.content}`,
      },
      position: { x: 60, y: i * 130 },
      style: {
        background: isActive ? style.bg : '#f3f4f6',
        border: `2px solid ${isActive ? style.border : '#d1d5db'}`,
        borderRadius: 12,
        padding: 12,
        width: 320,
        whiteSpace: 'pre-wrap' as const,
        fontSize: 13,
        opacity: isActive ? 1 : 0.4,
        boxShadow: isCurrent ? `0 0 0 3px ${style.border}40` : 'none',
        transition: 'all 0.3s ease',
      },
    }
  })
}

function stepsToEdges(steps: TraceStep[], activeIndex: number): Edge[] {
  return steps.slice(0, -1).map((step, i) => ({
    id: `e-${step.id}`,
    source: step.id,
    target: steps[i + 1].id,
    animated: i < activeIndex,
    style: {
      stroke: i < activeIndex ? '#6b7280' : '#e5e7eb',
      strokeWidth: 2,
      transition: 'all 0.3s ease',
    },
  }))
}

const OUTCOME_BADGE: Record<string, { text: string; color: string }> = {
  success: { text: '✅ 成功', color: '#059669' },
  loop: { text: '🔄 循环', color: '#d97706' },
  failure: { text: '🔧 降级恢复', color: '#7c3aed' },
}

export default function ReActDemo() {
  const [traceIndex, setTraceIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const trace: AgentTrace = allTraces[traceIndex]
  const maxStep = trace.steps.length - 1

  const nodes = useMemo(() => stepsToNodes(trace.steps, step), [trace, step])
  const edges = useMemo(() => stepsToEdges(trace.steps, step), [trace, step])

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
    }, 800)
    return () => clearInterval(interval)
  }, [maxStep])

  const badge = OUTCOME_BADGE[trace.outcome]

  const flowHeight = Math.max(500, trace.steps.length * 130 + 80)

  return (
    <div style={{ margin: '24px 0' }}>
      {/* Trace selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        {allTraces.map((t, i) => (
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

      {/* Description + badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{
          fontSize: 12,
          padding: '2px 8px',
          borderRadius: 6,
          background: `${badge.color}18`,
          color: badge.color,
          fontWeight: 600,
        }}>
          {badge.text}
        </span>
        <span style={{ fontSize: 13, color: '#6b7280' }}>{trace.description}</span>
      </div>

      {/* React Flow graph */}
      <div style={{
        width: '100%',
        height: flowHeight,
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#fafafa',
      }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          attributionPosition="bottom-left"
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={true}
          zoomOnScroll={true}
        >
          <Background />
          <Controls showInteractive={false} />
        </ReactFlow>
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

        <span style={{ fontSize: 13, color: '#6b7280', minWidth: 70, textAlign: 'right' }}>
          步骤 {step + 1} / {maxStep + 1}
        </span>
      </div>
    </div>
  )
}
