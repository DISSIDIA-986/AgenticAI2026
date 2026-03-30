import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'AI Agents 2026 — 交互式学习课程',
  description: '面向资深开发者的 AI Agent 架构学习课程。从 Context Engineering 到 Production Essentials，7 个模块带你系统掌握 Agent 技术栈。',
}

const navbar = (
  <Navbar
    logo={<span className="nx-font-bold nx-text-lg">🤖 AI Agents 2026</span>}
  />
)

const footer = (
  <Footer>
    MIT {new Date().getFullYear()} © AI Agents 2026 学习课程
  </Footer>
)

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" dir="ltr" suppressHydrationWarning>
      <Head />
      <body style={{ fontFamily: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif' }}>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
