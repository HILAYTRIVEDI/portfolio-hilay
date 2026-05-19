# Next.js / React Stack

Use for production sites that need routing, CMS, API routes, or the user explicitly wants Next.js.

## Project structure
```
my-site/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   └── Nav.tsx
├── public/
│   └── videos/          ← HyperFrames-rendered MP4/WebM files
├── lib/
│   └── animations.ts    ← shared GSAP/Framer configs
└── package.json
```

## Dependencies
```bash
npm install framer-motion gsap @gsap/react
npm install -D @types/node @types/react tailwindcss
```

## globals.css tokens
```css
:root {
  --bg: #0a0a0a;
  --bg-2: #141414;
  --fg: #f0ede8;
  --fg-muted: #888580;
  --accent: #6c63ff;
  --accent-2: #ff6b6b;
  --border: rgba(255,255,255,0.08);
  --radius: 12px;
  --section-pad: clamp(4rem, 10vw, 8rem);
  --content-width: 1200px;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--fg); font-family: var(--font-sans, system-ui); overflow-x: hidden; }
```

## layout.tsx
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: '[Name] — [Tagline]',
  description: '[Description]',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  )
}
```

## Framer Motion patterns

### Page enter animation wrapper
```tsx
'use client'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

export function FadeUp({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
```

### Staggered list
```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

<motion.ul variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {skills.map(s => (
    <motion.li key={s} variants={item}>{s}</motion.li>
  ))}
</motion.ul>
```

### Hover card scale
```tsx
<motion.div
  whileHover={{ scale: 1.02, y: -4 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
  className="project-card"
>
  {/* card content */}
</motion.div>
```

## GSAP in Next.js (for timeline-heavy sections)

```tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const items = ref.current!.querySelectorAll('.timeline-item')
      items.forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          x: -32,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.1,
        })
      })
    })

    return () => mm.revert()
  }, [])

  return <div ref={ref}>{/* timeline items */}</div>
}
```

## HyperFrames player in Next.js

```tsx
'use client'
import { useEffect, useRef } from 'react'

// Use native video element — @hyperframes/player web component works but needs dynamic import
export function HFVideoBackground({ src }: { src: string }) {
  return (
    <video
      autoPlay muted loop playsInline
      className="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    >
      <source src={`/videos/${src}.webm`} type="video/webm" />
      <source src={`/videos/${src}.mp4`} type="video/mp4" />
    </video>
  )
}

// Project card with hover video
export function ProjectCard({ title, description, videoSrc, thumbSrc }: {
  title: string, description: string, videoSrc: string, thumbSrc: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div
      className="project-card"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => { if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0 }}}
    >
      <img src={thumbSrc} alt={`${title} preview`} width={800} height={450} loading="lazy" />
      <video ref={videoRef} muted loop playsInline src={videoSrc} className="card-video" />
      <div className="card-overlay">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
```

## Tailwind config additions
```js
// tailwind.config.ts
export default {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        accent: '#6c63ff',
        'accent-2': '#ff6b6b',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      }
    }
  }
}
```