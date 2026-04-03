# AgenticAI2026

Interactive AI Agent learning curriculum for senior developers. The course is Chinese-first, concept-driven, and built around reusable architecture patterns instead of framework API walkthroughs.

## What This Repo Contains

- A Nextra-based course site with 7 long-form modules under `src/app/modules/*/page.mdx`
- Three interactive demos for dynamic topics:
  - memory: `src/components/visualizations/MemoryDemo.tsx`
  - ReAct reasoning: `src/components/visualizations/ReActDemo.tsx`
  - multi-agent messaging: `src/components/visualizations/MultiAgentDemo.tsx`
- A static visualization system for mental-model diagrams under `public/course-visuals/`
- Pilot docs and prompt scaffolding for each module under `docs/visualization-pilots/`

## Course Structure

| Module | Core question |
|------|------|
| 1. Context Engineering | What should the model see in each round? |
| 2. Memory Architecture | What should be stored outside the window, and how should it be retrieved? |
| 3. Tools & MCP | How does an agent safely connect to external capabilities? |
| 4. Reasoning & Planning | How does an agent think, decompose, reflect, and choose actions? |
| 5. Pipeline Orchestrator | When do you need explicit state, routing, and workflow control? |
| 6. Multi-Agent Systems | When is one agent not enough, and how should multiple roles collaborate? |
| 7. Production Essentials | How do you run agents safely in production? |

## Stack

- `next` 16
- `nextra` 4
- `react` 19
- `@xyflow/react` for interactive diagrams
- MDX pages in `src/app/`

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful commands:

```bash
npm run build
npm run lint
npm run start -- --hostname 127.0.0.1 --port 3055
```

## Important Paths

- Homepage: `src/app/page.mdx`
- Module pages: `src/app/modules/*/page.mdx`
- MDX component wiring: `src/mdx-components.tsx`
- Visual assets: `public/course-visuals/`
- Visualization system doc: `docs/visualization-system.md`
- Module-by-module visual pilots: `docs/visualization-pilots/`

## Visualization Workflow

The course now uses a 3-layer teaching surface:

1. static mental-model graphic
2. inline concept diagrams
3. interactive demo, only where motion matters

Current generated and hand-authored assets live in `public/course-visuals/module-x/`.

When adding or replacing visuals:

1. update the relevant pilot doc in `docs/visualization-pilots/`
2. generate or author the asset
3. place the final file in `public/course-visuals/`
4. embed it in the matching `page.mdx`
5. run `npm run build`

Prefer SVG for diagrams with labels and system structure. Keep PNG only where raster rendering is still acceptable.

## Release and QA Notes

Before shipping:

1. run `npm run lint`
2. run `npm run build`
3. smoke-check the homepage and changed module routes
4. if visuals changed, do a page-level visual QA pass

Recent work also trimmed superseded source PNGs from `public/` to keep deploy weight under control. If you replace a PNG with SVG, remove the old public asset unless it is still referenced.
