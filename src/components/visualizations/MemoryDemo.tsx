'use client'

import { useState, useCallback, useMemo } from 'react'
import { allMemoryTraces } from '@/data/traces/memory'
import {
  MEMORY_TYPE_STYLES, ACTION_LABELS,
  type MemoryTrace, type MemoryEntry, type MemoryEvent,
} from '@/types/memory-trace'

function applyEvents(initial: MemoryEntry[], events: MemoryEvent[], upToIndex: number): MemoryEntry[] {
  let entries = [...initial]
  for (let i = 0; i <= upToIndex; i++) {
    const ev = events[i]
    if (ev.removedIds) {
      entries = entries.filter(e => !ev.removedIds!.includes(e.id))
    }
    if (ev.newEntries) {
      entries = [...entries, ...ev.newEntries]
    }
  }
  return entries
}

function MemoryCard({ entry, highlighted }: { entry: MemoryEntry; highlighted: boolean }) {
  const style = MEMORY_TYPE_STYLES[entry.type]
  return (
    <div style={{
      padding: '8px 12px',
      borderRadius: 8,
      border: `2px solid ${highlighted ? style.border : '#e5e7eb'}`,
      background: highlighted ? style.bg : '#fff',
      fontSize: 12,
      transition: 'all 0.3s ease',
      boxShadow: highlighted ? `0 0 0 2px ${style.border}30` : 'none',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontWeight: 600 }}>{style.icon} {style.label}</span>
        <span style={{ color: '#9ca3af', fontSize: 11 }}>分数: {entry.score.toFixed(2)}</span>
      </div>
      <div style={{ color: '#374151', lineHeight: 1.5 }}>{entry.content}</div>
    </div>
  )
}

export default function MemoryDemo() {
  const [traceIndex] = useState(0)
  const [step, setStep] = useState(-1) // -1 = initial state
  const [isPlaying, setIsPlaying] = useState(false)

  const trace: MemoryTrace = allMemoryTraces[traceIndex]
  const maxStep = trace.events.length - 1

  const currentEntries = useMemo(() => {
    if (step < 0) return trace.initialMemory
    return applyEvents(trace.initialMemory, trace.events, step)
  }, [trace, step])

  const currentEvent: MemoryEvent | null = step >= 0 ? trace.events[step] : null
  const highlightedIds = currentEvent?.affectedIds ?? []

  // Group entries by type
  const grouped = useMemo(() => {
    const groups: Record<string, MemoryEntry[]> = {
      working: [], longterm: [], episodic: [], cache: [],
    }
    currentEntries.forEach(e => groups[e.type].push(e))
    return groups
  }, [currentEntries])

  const play = useCallback(() => {
    setIsPlaying(true)
    setStep(-1)
    let current = -1
    const interval = setInterval(() => {
      current++
      if (current > maxStep) {
        clearInterval(interval)
        setIsPlaying(false)
        return
      }
      setStep(current)
    }, 1500)
    return () => clearInterval(interval)
  }, [maxStep])

  return (
    <div style={{ margin: '24px 0' }}>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>{trace.description}</p>

      {/* Event log */}
      {currentEvent && (
        <div style={{
          padding: '10px 16px',
          borderRadius: 10,
          border: `2px solid ${ACTION_LABELS[currentEvent.action].color}`,
          background: `${ACTION_LABELS[currentEvent.action].color}08`,
          marginBottom: 16,
          fontSize: 13,
        }}>
          <span style={{
            fontWeight: 600,
            color: ACTION_LABELS[currentEvent.action].color,
            marginRight: 8,
          }}>
            {ACTION_LABELS[currentEvent.action].icon} {ACTION_LABELS[currentEvent.action].label}
          </span>
          {currentEvent.description}
        </div>
      )}
      {step < 0 && (
        <div style={{
          padding: '10px 16px', borderRadius: 10,
          border: '1px solid #d1d5db', background: '#f9fafb',
          marginBottom: 16, fontSize: 13, color: '#6b7280',
        }}>
          初始状态 — 点击"播放"或拖动时间轴开始
        </div>
      )}

      {/* Memory grid - 4 columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 12,
        marginBottom: 16,
      }}>
        {(['working', 'longterm', 'episodic', 'cache'] as const).map(type => {
          const typeStyle = MEMORY_TYPE_STYLES[type]
          const entries = grouped[type]
          return (
            <div key={type} style={{
              border: '1px solid #e5e7eb',
              borderRadius: 10,
              padding: 12,
              background: '#fafafa',
              minHeight: 120,
            }}>
              <div style={{
                fontSize: 12, fontWeight: 700, marginBottom: 8,
                color: typeStyle.border,
              }}>
                {typeStyle.icon} {typeStyle.label} ({entries.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {entries.map(entry => (
                  <MemoryCard
                    key={entry.id}
                    entry={entry}
                    highlighted={highlightedIds.includes(entry.id)}
                  />
                ))}
                {entries.length === 0 && (
                  <div style={{ fontSize: 12, color: '#9ca3af', fontStyle: 'italic' }}>空</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Timeline controls */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 16px', background: '#f9fafb',
        borderRadius: 10, border: '1px solid #e5e7eb',
      }}>
        <button
          onClick={play}
          disabled={isPlaying}
          style={{
            padding: '6px 16px', borderRadius: 8, border: 'none',
            background: isPlaying ? '#d1d5db' : '#2563eb',
            color: '#fff', cursor: isPlaying ? 'default' : 'pointer',
            fontSize: 13, fontWeight: 600,
          }}
        >
          {isPlaying ? '播放中...' : '▶ 播放'}
        </button>
        <input
          type="range"
          min={-1}
          max={maxStep}
          value={step}
          onChange={(e) => { setStep(Number(e.target.value)); setIsPlaying(false) }}
          style={{ flex: 1 }}
        />
        <span style={{ fontSize: 13, color: '#6b7280', minWidth: 80, textAlign: 'right' }}>
          {step < 0 ? '初始' : `事件 ${step + 1} / ${maxStep + 1}`}
        </span>
      </div>
    </div>
  )
}
