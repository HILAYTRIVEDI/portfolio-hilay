---
name: web-revamp
description: >
  Build or revamp premium interactive websites with motion graphics, smooth transitions,
  and HyperFrames video sections. Covers both plain HTML (single-file, zero build) and
  Next.js/React production outputs. Includes ready-to-render HyperFrames composition
  templates for hero loops, project previews, and kinetic typography. Use whenever the
  user wants to create a portfolio, landing page, SaaS homepage, or any web presence
  that should feel alive — animations, scroll effects, video backgrounds, motion design.
---

# Web Revamp Skill

Build premium, interactive websites with motion graphics, smooth transitions, and HyperFrames video sections.

## Phase 0 — Clarify (3 questions max)

1. **Content** — What sections? (hero, about, projects, experience, contact, etc.)
2. **Vibe** — dark/cinematic · clean/minimal · bold/energetic · futuristic/AI-native
3. **Output format** — Plain HTML (instant preview) or Next.js/React (production)?

If the user shares a current site or content, pre-fill where possible.

---

## Phase 1 — Output Format

- **Plain HTML** → read [references/html-stack.md](references/html-stack.md)
- **Next.js / React** → read [references/nextjs-stack.md](references/nextjs-stack.md)

Default to **plain HTML** unless user needs routing, CMS, or API routes.

---

## Phase 2 — Animation Library

| Use case | Library |
|---|---|
| Scroll reveals, staggered text, counters | **GSAP + ScrollTrigger** |
| Page transitions, layout animations | **Framer Motion** (Next.js only) |
| Simple hover/entrance effects | **CSS + Intersection Observer** |
| Hero particles, 3D elements | **Three.js** |
| Complex timelines (career, demos) | **GSAP timelines** |

**Default: GSAP** — works in HTML and Next.js, best HyperFrames compatibility.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

---

## Phase 3 — HyperFrames Video Integration

Every site gets at least one video section. See [references/hyperframes.md](references/hyperframes.md) for the full reference and [templates/](templates/) for ready-to-render compositions.

### A) Hero background loop
```html
<video autoplay muted loop playsinline class="hero-bg-video" aria-hidden="true">
  <source src="/videos/hero-loop.webm" type="video/webm">
  <source src="/videos/hero-loop.mp4" type="video/mp4">
</video>
```

### B) Project card hover videos
```html
<div class="project-card"
  onmouseenter="this.querySelector('video').play()"
  onmouseleave="v=this.querySelector('video');v.pause();v.currentTime=0">
  <img class="card-thumb" src="thumb.jpg" alt="Project" loading="lazy" width="800" height="450">
  <video class="card-video" muted loop playsinline preload="none" src="preview.mp4"></video>
</div>
```

### C) Section background animation
Subtle animated background for about, skills, or CTA sections.

Always include a render command comment:
```html
<!-- HYPERFRAMES: npx hyperframes render --input compositions/hero.html --output public/videos/hero-loop.mp4 -->
```

---

## Phase 4 — Design System

### Typography
- Display: `clamp(2.5rem, 6vw, 6rem)`, weight 700–900, letter-spacing -0.02em to -0.04em
- Body: 1rem/1.7, weight 400, max 60–75ch
- One Google Font max or system stack

### Color (define at `:root`)
```css
:root {
  --bg: #0a0a0a; --bg-2: #141414; --bg-3: #1e1e1e;
  --fg: #f0ede8; --fg-muted: #888580;
  --accent: #6c63ff; --accent-2: #ff6b6b;
  --border: rgba(255,255,255,0.08); --radius: 12px;
}
```

### Spacing & Layout
- Sections: `padding: clamp(4rem, 10vw, 8rem) 0`
- Content width: `min(1200px, 100% - 2rem)` centered
- Mobile-first: 375px → 768px → 1200px breakpoints

---

## Phase 5 — Motion Design Rules

1. **Entrance only** — animate in, not out (no exit on scroll)
2. **Stagger** — 0.1–0.15s between siblings
3. **Ease out** — `power2.out` or `cubic-bezier(0.16, 1, 0.3, 1)`
4. **Duration budget** — hero: 0.8–1.2s · scroll: 0.5–0.7s · hover: 0.2–0.3s
5. **Reduced motion** — always wrap in `gsap.matchMedia()`:
   ```js
   gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => { /* animations */ });
   ```
6. **Transform only** — animate `transform` + `opacity`. Never `width`/`height`/`top`/`left`.
7. **Hardware accel** — `will-change: transform` only during animation

---

## Phase 6 — Section Patterns

| Section | Key technique |
|---|---|
| **Hero** | Full viewport `100svh`, HyperFrames video BG, split-text stagger entrance |
| **About** | Stats counter (GSAP snap), skill tags pop-in, optional split layout |
| **Projects** | Card grid + hover video, scale(1.02) on hover |
| **Experience** | Vertical timeline, line-draw animation, slide-in on scroll |
| **Skills** | Kinetic tag cloud (use `templates/skills-kinetic.html`) |
| **Contact** | Availability pulse, magnetic hover, inline validation |

---

## Phase 7 — Code Quality

- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- All images: `loading="lazy"`, `alt`, explicit dimensions
- Defer non-critical JS, preload hero font/video
- Focus-visible styles, skip-to-content link, ARIA labels on icon buttons
- No inline styles (except CSS custom property overrides)

---

## Output Checklist

- [ ] Correct reference file read for output format
- [ ] GSAP imported correctly
- [ ] At least one HyperFrames video section with render command
- [ ] CSS custom properties defined at `:root`
- [ ] Responsive at 375px, 768px, 1200px
- [ ] `prefers-reduced-motion` respected
- [ ] Semantic HTML, no console errors

---

## References

- [references/html-stack.md](references/html-stack.md) — HTML single-file template, CDN imports
- [references/nextjs-stack.md](references/nextjs-stack.md) — Next.js project structure, Framer Motion
- [references/hyperframes.md](references/hyperframes.md) — HyperFrames CLI, composition rules, render commands, media tools
- [templates/hero-loop.html](templates/hero-loop.html) — Ready-to-render hero background composition
- [templates/project-preview.html](templates/project-preview.html) — Project card hover video composition
- [templates/skills-kinetic.html](templates/skills-kinetic.html) — Kinetic tag cloud composition
