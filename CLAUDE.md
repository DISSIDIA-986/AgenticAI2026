# AgenticAI2026

Interactive AI Agent learning curriculum for senior developers. Next.js + Nextra 4 + React Flow + Tailwind CSS, deployed on Vercel. 中文为主语言。

@AGENTS.md

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review

## 项目规则
- 更新数据时，检查所有引用同一数据点的文件（JSON数据文件 + 页面组件 + 模板）
- 硬编码数据必须迁移到 JSON 数据文件
- 构建后运行 npm run build 验证
- 每次修改后 curl 所有路由确认 200 响应
