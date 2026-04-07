# Hilay Trivedi — Portfolio

Personal portfolio website for **Hilay Trivedi**, Senior WordPress & PHP Engineer and WordPress VIP Specialist. Built with Next.js 16, React Three Fiber, and plain CSS — no Tailwind runtime classes for layout (Tailwind v4 class generation limitations required all layout to use inline styles and custom CSS classes).

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + custom CSS variables |
| 3D | React Three Fiber + Three.js 0.183 |
| Fonts | Syne (display) · DM Sans (body) · JetBrains Mono (code) |
| Icons | Next.js `ImageResponse` icon + SVG favicon |
| Deploy | Vercel |

## Sections

- **Hero** — Full-screen with interactive 3D particle network (mouse repulsion), typewriter role carousel, CSS keyframe entrance animations
- **About** — Bio + 6 achievement stat cards
- **Experience** — rtCamp (Jan 2023–Present) and Multidots (Dec 2020–Jan 2023)
- **Skills** — 5 skill groups with scrolling marquee strip + Education
- **Projects** — 6 project cards with GitHub links only
- **Open Source** — WordPress Core, Gutenberg, plugin authorship, translations, community
- **Contact** — CTA + social links + footer

## Projects Featured

- [CreatorNexus AI](https://github.com/HILAYTRIVEDI/CreatorNexus-AI) — AI research SaaS with knowledge graph
- [Blog-to-Shots](https://github.com/HILAYTRIVEDI/blog-to-shots) — Blog URL → vertical video via Gemini + Remotion
- [Advoksha](https://github.com/HILAYTRIVEDI/advoksha) — Multi-agent AI legal research terminal
- [Mutual Fund Nexus](https://github.com/HILAYTRIVEDI/mutual-fund-nexus) — Portfolio management for financial advisors
- [AbilityHub](https://github.com/HILAYTRIVEDI/abilityhub) — Accessibility-first platform
- [LLM Indexing Plugins](https://github.com/HILAYTRIVEDI/llm-indexing-plugins) — Plugin ecosystem for LLM optimisation

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy

Push to GitHub and connect to Vercel. The project builds as a fully static site (`○ Static`) with no server-side requirements.

## Design Notes

- **Palette**: `#06060E` background · `#C8FF00` lime accent · `#F0EDE8` warm white
- **Layout**: All critical layout (max-width, grid, flex, spacing) uses inline styles or `.ht-container` / `.skill-group` CSS classes defined in `globals.css` — not Tailwind utilities — due to Tailwind v4's build-time class scanning behaviour
- **3D**: `THREE.Clock` replaced with accumulated `delta` in `useFrame` to avoid the Three.js 0.168+ deprecation warning
- **Animations**: Hero uses CSS `@keyframes heroFadeUp` with staggered `animation-delay`. Sections use IntersectionObserver toggling a `.reveal.visible` CSS class
