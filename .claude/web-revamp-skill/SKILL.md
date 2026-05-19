---
name: web-revamp
description: >
  Build or revamp interactive, modern, clean and responsive websites with motion graphics,
  smooth transitions, and HyperFrames video sections. Use this skill whenever the user wants
  to create a portfolio, personal brand site, landing page, SaaS homepage, or any web presence
  that should feel premium and alive — even if they just say "make my site look better",
  "redesign my portfolio", "build me a personal website", or "I want a cool homepage".
  Always use this skill for any website that involves animations, scroll effects, video backgrounds,
  or motion design. Covers both plain HTML/CSS/JS (single-file) and Next.js/React outputs.
  Handles HyperFrames video section integration by default.
---

# Web Revamp Skill

Build premium, interactive websites with motion graphics, smooth transitions, and HyperFrames video sections.

## Phase 0 — Always clarify before building

Before writing a single line of code, ask the user **3 targeted questions** (not more):

1. **Content** — What sections does the site need? (hero, about, projects, experience, contact, etc.)
2. **Vibe** — Pick a direction: dark/cinematic · clean/minimal · bold/energetic · futuristic/AI-native
3. **Output format** — Plain HTML (single file, immediate preview) or Next.js/React (production project)?

If the user shares a current site URL or existing content, read it first and pre-fill answers where possible, only asking about gaps.

---

## Phase 1 — Choose output format

Read the relevant reference before writing any code:

- **Plain HTML** → read `references/html-stack.md`
- **Next.js / React** → read `references/nextjs-stack.md`

If unsure, default to **plain HTML** for portfolios and landing pages (instant preview, zero setup), and **Next.js** only when the user explicitly needs routing, CMS, or API routes.

---

## Phase 2 — Animation library selection

Pick based on complexity and user's stated vibe:

| Use case | Library |
|---|---|
| Scroll-triggered reveals, staggered text, counters | **GSAP + ScrollTrigger** |
| Page transitions, layout animations, gesture-based | **Framer Motion** (Next.js only) |
| Simple hover/entrance effects, reduced-JS preference | **CSS animations + Intersection Observer** |
| Hero background, particle effects, 3D elements | **Three.js** (via CDN) |
| Complex timeline sequences (career, project demos) | **GSAP timelines** |

Use **GSAP as the default** for most sites — it works in both HTML and Next.js, handles scroll, timeline, and text animations, and is the best supported by HyperFrames.

Always load GSAP from CDN for HTML output:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

---

## Phase 3 — HyperFrames video integration (always include)

Every site built with this skill gets at least one HyperFrames video section. See `references/hyperframes-integration.md` for full patterns.

**Minimum required**: one of these three:

### A) Hero background loop
Pre-rendered MP4/WebM plays as a muted autoplay loop behind the hero text.
```html
<section class="hero">
  <video autoplay muted loop playsinline class="hero-bg-video">
    <source src="hero-loop.webm" type="video/webm">
    <source src="hero-loop.mp4" type="video/mp4">
  </video>
  <div class="hero-content"><!-- overlay text --></div>
</section>
```

### B) Project card hover videos
Each project card plays a 5–10s preview on hover. Show a static thumbnail by default, swap to video on `mouseenter`.
```html
<div class="project-card" 
  onmouseenter="this.querySelector('video').play()"
  onmouseleave="this.querySelector('video').pause(); this.querySelector('video').currentTime=0">
  <img class="card-thumb" src="thumb.jpg" alt="Project preview">
  <video class="card-video" muted loop playsinline src="project-preview.mp4"></video>
</div>
```

### C) Section background animation
Subtle animated background for about, skills, or CTA sections.

**Always include a placeholder comment** where the HyperFrames-rendered video should go, with the exact `npx hyperframes render` command to produce it:
```html
<!-- 
  HYPERFRAMES: render this composition to replace the placeholder
  npx hyperframes render --input compositions/hero.html --output public/videos/hero-loop.mp4 --loop
-->
```

---

## Phase 4 — Design system

Apply these rules to every site:

### Typography
- Display/hero: clamp(2.5rem, 6vw, 6rem), weight 700–900, tight letter-spacing (-0.02em to -0.04em)
- Body: 1rem/1.7, weight 400, comfortable line length (60–75ch max)
- Use system font stack or load one Google Font maximum

### Color
- Always define a CSS custom property palette at `:root`
- Minimum: `--bg`, `--bg-2`, `--fg`, `--fg-muted`, `--accent`, `--accent-2`
- Test contrast ratios mentally — AA compliance minimum

### Spacing
- Use `clamp()` for responsive spacing: `clamp(1rem, 4vw, 3rem)`
- Section padding: `clamp(4rem, 10vw, 8rem)` top and bottom
- Max content width: 1200px centered

### Responsive
- Mobile-first: base styles for mobile, `@media (min-width: 768px)` for tablet, `@media (min-width: 1200px)` for desktop
- No horizontal scroll at any viewport
- Touch targets minimum 44px

---

## Phase 5 — Motion design principles

These rules prevent janky, over-animated output:

1. **Entrance only** — elements animate in, never out (no exit animations on scroll)
2. **Stagger groups** — never animate all items at once; 0.1–0.15s stagger between siblings
3. **Ease out** — entrances use `power2.out` or `cubic-bezier(0.16, 1, 0.3, 1)`
4. **Duration budget** — hero animations: 0.8–1.2s · scroll reveals: 0.5–0.7s · hovers: 0.2–0.3s
5. **Reduced motion** — always wrap GSAP ScrollTrigger in `matchMedia`:
```js
gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
  // all ScrollTrigger animations here
});
```
6. **Transform only** — animate `transform` and `opacity` only. Never animate `width`, `height`, `top`, `left` (causes layout thrashing)
7. **Hardware acceleration** — add `will-change: transform` only to actively animating elements, remove after animation

---

## Phase 6 — Section-by-section patterns

### Hero
- Full viewport height (`100svh`)
- HyperFrames video background OR CSS gradient with animated mesh/particles
- Name/headline: split text animation (each word/char staggers in)
- Subheadline + CTA fade in after headline completes
- Scroll indicator: bouncing arrow or progress line

### About / Bio
- Stats counter (count up on scroll-enter with GSAP)
- Horizontal skill tag cloud with staggered pop-in
- Optional: split layout with fixed image and scrolling text

### Projects / Work
- Card grid with hover video previews (HyperFrames)
- Cards scale up slightly on hover (transform: scale(1.02))
- Project modal or expand-in-place for details

### Experience / Timeline
- Vertical timeline with line draw animation (GSAP `drawSVG` or CSS stroke-dashoffset)
- Each role slides in from left on scroll

### Open Source / Contributions
- GitHub contribution heatmap animation
- Badge/icon pop-in with spring easing

### Contact / CTA
- Availability pulse indicator (CSS keyframe, green dot)
- Social links with magnetic hover effect (optional, JS)
- Form with inline validation states

---

## Phase 7 — Code quality rules

- **No inline styles** except for CSS custom property overrides
- **Semantic HTML**: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` — no div soup
- **BEM or flat class naming**: `.hero__title`, `.project-card`, `.btn-primary`
- **All images**: `loading="lazy"`, `alt` text, explicit `width`/`height`
- **Performance**: defer non-critical JS, preload hero font/video, use `font-display: swap`
- **Accessibility**: focus-visible styles, skip-to-content link, ARIA labels on icon buttons

---

## Output checklist

Before delivering any output, verify:

- [ ] All 3 clarification questions answered before coding started
- [ ] Correct reference file read for chosen output format
- [ ] GSAP (or chosen library) imported correctly
- [ ] At least one HyperFrames video section included with placeholder comment + render command
- [ ] CSS custom property palette defined at `:root`
- [ ] Responsive at 375px, 768px, 1200px
- [ ] `prefers-reduced-motion` respected
- [ ] Semantic HTML structure
- [ ] No console errors in the output code

---

## Reference files

- `references/html-stack.md` — Complete HTML single-file template, CDN imports, file structure
- `references/nextjs-stack.md` — Next.js project structure, component patterns, Framer Motion setup
- `references/hyperframes-integration.md` — HyperFrames composition patterns, render commands, player embed