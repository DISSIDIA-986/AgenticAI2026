import nextra from 'nextra'

const withNextra = nextra({
  // Nextra options
})

const rootDir = process.cwd()

export default withNextra({
  outputFileTracingRoot: rootDir,
  turbopack: {
    root: rootDir,
    resolveAlias: {
      'next-mdx-import-source-file': './src/mdx-components.tsx'
    }
  }
})
