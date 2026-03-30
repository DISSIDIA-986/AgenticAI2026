import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import ReActDemoLoader from '@/components/visualizations/ReActDemoLoader'
import MultiAgentDemoLoader from '@/components/visualizations/MultiAgentDemoLoader'

const docsComponents = getDocsMDXComponents()

export function useMDXComponents(components?: Record<string, React.ComponentType>) {
  return {
    ...docsComponents,
    ReActDemo: ReActDemoLoader,
    MultiAgentDemo: MultiAgentDemoLoader,
    ...components,
  }
}
