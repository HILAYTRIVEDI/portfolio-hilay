# HTML Single-File Stack

Use this for portfolios, landing pages, and any site where the user wants instant preview with zero build step.

## File structure
```
my-site/
├── index.html          ← everything goes here (HTML + CSS + JS)
├── assets/
│   ├── fonts/
│   └── images/
└── public/
    └── videos/         ← HyperFrames-rendered MP4/WebM files go here
```

## Boilerplate shell

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[DESCRIPTION]">
  <title>[NAME] — [TAGLINE]</title>

  <!-- Preload critical font -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">

  <!-- GSAP (load before body for ScrollTrigger registration) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>

  <style>
    /* === RESET === */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    img, video { max-width: 100%; display: block; }
    
    /* === TOKENS === */
    :root {
      --bg: #0a0a0a;
      --bg-2: #141414;
      --bg-3: #1e1e1e;
      --fg: #f0ede8;
      --fg-muted: #888580;
      --accent: #6c63ff;
      --accent-2: #ff6b6b;
      --border: rgba(255,255,255,0.08);
      --radius: 12px;
      --font: 'Inter', system-ui, sans-serif;
      --section-pad: clamp(4rem, 10vw, 8rem);
      --content-width: 1200px;
    }

    /* === BASE === */
    body {
      font-family: var(--font);
      background: var(--bg);
      color: var(--fg);
      line-height: 1.7;
      overflow-x: hidden;
    }

    /* === UTILITY === */
    .container {
      width: min(var(--content-width), 100% - 2rem);
      margin-inline: auto;
    }
    .section { padding: var(--section-pad) 0; }
    .section-label {
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 1rem;
    }
    .section-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.02em;
      margin-bottom: 1.5rem;
    }

    /* === SKIP LINK === */
    .skip-link {
      position: absolute;
      top: -100%;
      left: 1rem;
      background: var(--accent);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: var(--radius);
      z-index: 9999;
      transition: top 0.2s;
    }
    .skip-link:focus { top: 1rem; }

    /* === SCROLL REVEAL (initial state) === */
    .reveal {
      opacity: 0;
      transform: translateY(24px);
    }
  </style>
</head>
<body>

  <a href="#main" class="skip-link">Skip to content</a>

  <!-- NAV -->
  <nav aria-label="Main navigation">
    <div class="container">
      <!-- logo + links -->
    </div>
  </nav>

  <main id="main">
    <!-- sections go here -->
  </main>

  <footer>
    <div class="container">
      <!-- footer content -->
    </div>
  </footer>

  <script>
    // Wait for GSAP to be available
    window.addEventListener('load', () => {
      gsap.registerPlugin(ScrollTrigger);

      // Scroll reveals — only if user hasn't requested reduced motion
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray('.reveal').forEach(el => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          });
        });
      });
    });
  </script>

</body>
</html>
```

## CSS patterns frequently needed

### Hero with video background
```css
.hero {
  position: relative;
  height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.hero-bg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.4;
}
.hero-content {
  position: relative;
  z-index: 1;
}
```

### Project card with hover video
```css
.project-card {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
}
.card-thumb,
.card-video {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  transition: opacity 0.3s ease;
}
.card-video {
  position: absolute;
  inset: 0;
  height: 100%;
  opacity: 0;
}
.project-card:hover .card-video { opacity: 1; }
.project-card:hover .card-thumb { opacity: 0; }
```

### Stats counter
```html
<span class="counter" data-target="6449">0</span>
```
```js
gsap.utils.toArray('.counter').forEach(el => {
  const target = parseInt(el.dataset.target);
  gsap.to({ val: 0 }, {
    val: target,
    duration: 2,
    ease: 'power2.out',
    snap: { val: 1 },
    scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    onUpdate() { el.textContent = Math.round(this.targets()[0].val).toLocaleString(); }
  });
});
```

### Staggered tag cloud
```js
gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
  gsap.from('.skill-tag', {
    opacity: 0,
    scale: 0.85,
    y: 10,
    duration: 0.4,
    stagger: 0.04,
    ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' }
  });
});
```

### Magnetic hover (optional, for social links)
```js
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    gsap.to(el, { x, y, duration: 0.3, ease: 'power2.out' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  });
});
```