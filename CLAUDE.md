# Eden Music Academy — Claude Code Instructions

## Project
React + Vite + TypeScript + Tailwind CSS
Deployed on Vercel at edenmusicacademy.com

## Your job
Generate complete, real, editable code files. No placeholders.
No "add your content here". Actual components I can ship.

## Design system
- Read .claude/skills/ui-ux-pro-max/ before any UI work
- Run design system search before building any component
- Colours: sage #7D9B76 primary, terracotta #C4785A accent, 
  off-white #FAF8F4 background, charcoal #2C2C2A text
- Fonts: Playfair Display (headings), Inter (body)
- Style: Nature Distilled — warm, elegant, minimalist

## Stitch MCP workflow
When building any new page or section:
1. Use Stitch MCP to generate the visual design first
2. Extract the HTML/CSS from Stitch as reference
3. Reimplement it in React + Tailwind (don't paste Stitch HTML directly)
4. Apply UX UI Pro Max design tokens throughout

## File structure
src/
├── components/
│   ├── layout/     (Navbar, Footer, Layout)
│   ├── ui/         (Button, Card, SectionHeading)
│   ├── sections/   (Hero, ProgramCard, TeacherCard, etc)
│   └── forms/      (EnrolmentForm)
├── pages/
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ProgramsPage.tsx
│   ├── IncursionsPage.tsx
│   └── EnrolPage.tsx
└── styles/
    └── globals.css

## Rules
- Every component gets its own file
- Use TypeScript with proper types, no `any`
- Mobile-first responsive (sm → md → lg breakpoints)
- WCAG AA accessibility on all components
- No lorem ipsum — use real Eden Music Academy content
- Export all components as named exports