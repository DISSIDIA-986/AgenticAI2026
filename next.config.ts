import nextra from 'nextra'

const withNextra = nextra({
  // Nextra options
})

export default withNextra({
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './src/mdx-components.tsx'
    }
  }
})
