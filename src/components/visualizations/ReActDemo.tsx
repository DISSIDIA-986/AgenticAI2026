'use client'

import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const nodes: Node[] = [
  {
    id: 'thought-1',
    data: { label: '💭 Thought\n"用户问天气，需要调用天气API"' },
    position: { x: 50, y: 0 },
    style: { background: '#e0f2fe', border: '2px solid #0284c7', borderRadius: 12, padding: 12, width: 280, whiteSpace: 'pre-wrap' as const },
  },
  {
    id: 'action-1',
    data: { label: '⚡ Action\ncall weather_api(city="北京")' },
    position: { x: 50, y: 140 },
    style: { background: '#fef3c7', border: '2px solid #d97706', borderRadius: 12, padding: 12, width: 280, whiteSpace: 'pre-wrap' as const },
  },
  {
    id: 'observation-1',
    data: { label: '👁 Observation\n{"temp": 22, "condition": "晴"}' },
    position: { x: 50, y: 280 },
    style: { background: '#d1fae5', border: '2px solid #059669', borderRadius: 12, padding: 12, width: 280, whiteSpace: 'pre-wrap' as const },
  },
  {
    id: 'thought-2',
    data: { label: '💭 Thought\n"拿到数据了，组织回答"' },
    position: { x: 50, y: 420 },
    style: { background: '#e0f2fe', border: '2px solid #0284c7', borderRadius: 12, padding: 12, width: 280, whiteSpace: 'pre-wrap' as const },
  },
  {
    id: 'answer',
    data: { label: '✅ Answer\n"北京今天晴，22°C，适合外出"' },
    position: { x: 50, y: 560 },
    style: { background: '#ede9fe', border: '2px solid #7c3aed', borderRadius: 12, padding: 12, width: 280, whiteSpace: 'pre-wrap' as const },
  },
]

const edges: Edge[] = [
  { id: 'e1', source: 'thought-1', target: 'action-1', animated: true },
  { id: 'e2', source: 'action-1', target: 'observation-1', animated: true },
  { id: 'e3', source: 'observation-1', target: 'thought-2', animated: true },
  { id: 'e4', source: 'thought-2', target: 'answer', animated: true },
]

export default function ReActDemo() {
  return (
    <div style={{ width: '100%', height: 700, border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', margin: '24px 0' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}
