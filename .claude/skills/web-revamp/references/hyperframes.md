# HyperFrames Reference

HyperFrames renders HTML compositions to MP4/WebM offline via CLI. The deployed site uses plain `<video>` elements — no runtime dependency.

## Prerequisites
- Node.js >= 22, FFmpeg, Python 3.8+ (for TTS/transcription)

## Setup
```bash
npx hyperframes init hf-compositions          # interactive wizard
npx hyperframes init hf-compositions --example blank --tailwind  # with Tailwind v4
npx hyperframes init hf-compositions --non-interactive           # CI/agents
```

Templates: `blank`, `warm-grain`, `play-mode`, `swiss-grid`, `vignelli`, `kinetic-type`, `product-promo`, `nyt-graph`.

## Project Structure
```
hf-compositions/
├── index.html                    ← root composition
├── hyperframes.json              ← registry config
├── compositions/
│   ├── hero-loop.html
│   ├── project-preview.html
│   └── skills-kinetic.html
└── assets/
```

## CLI Dev Loop

```bash
npx hyperframes lint              # validate structure
npx hyperframes inspect           # visual layout check (catches overflow)
npx hyperframes preview           # hot-reload dev server (default :3002)
npx hyperframes render            # produce MP4/WebM
npx hyperframes doctor            # troubleshoot environment
```

## Render Commands

```bash
# Hero loop (10s, 1920x1080)
npx hyperframes render --input compositions/hero-loop.html \
  --output ../public/videos/hero-loop.mp4 --width 1920 --height 1080 --fps 30

# Project preview (8s, 800x450 for card hover)
npx hyperframes render --input compositions/project-preview.html \
  --output ../public/videos/project-preview.mp4 --width 800 --height 450 --fps 24

# WebM (smaller, better browser support)
npx hyperframes render --input compositions/hero-loop.html \
  --output ../public/videos/hero-loop.webm --format webm
```

### Render Flags

| Flag | Options | Default | Notes |
|------|---------|---------|-------|
| `--output` | path | renders/name_timestamp.mp4 | Output file |
| `--fps` | 24, 30, 60 | 30 | 60fps = 2x render time |
| `--quality` | draft/standard/high | standard | draft for iteration |
| `--format` | mp4, webm | mp4 | WebM = transparency |
| `--workers` | 1-8, auto | auto | Each spawns Chrome |
| `--docker` | flag | off | Byte-identical output |
| `--variables` | JSON | — | Override variables |
| `--variables-file` | path | — | JSON var file |

## Composition Rules (Non-Negotiable)

### Data Attributes

| Attribute | Required | Purpose |
|-----------|----------|---------|
| `id` | Yes | Unique clip ID |
| `data-start` | Yes | Start time (seconds) |
| `data-duration` | Yes (div/img/comp) | Clip length |
| `data-track-index` | Yes | Layer index (no overlap on same track) |
| `data-composition-id` | Yes (root) | Composition identifier |
| `data-width`/`data-height` | Yes (root) | Canvas size |
| `data-composition-src` | No | External sub-composition |
| `data-variable-values` | No | Per-instance variable overrides |

### Timeline Contract
- All timelines: `gsap.timeline({ paused: true })`
- Register: `window.__timelines["<composition-id>"] = tl`
- Duration = `data-duration` (not GSAP timeline length)
- **No** `repeat: -1`, `Math.random()`, `Date.now()`, async timeline building
- **Deterministic** — same frame at same time on every render

### Animation Rules
- Only animate `transform` + `opacity` (no `width`, `height`, `display`, `visibility`)
- Never call `video.play()`/`audio.play()` — framework owns playback
- Video must be `muted playsinline`, audio is always separate `<audio>`
- Offset first animation 0.1–0.3s (not t=0)
- No `gsap.set()` on elements from future scenes

### Scene Transitions
- **Always** use transitions between scenes (no jump cuts)
- **Always** entrance animations on every element (`gsap.from()`)
- **Never** exit animations before a transition fires (transition IS the exit)
- Final scene only: may fade to black

## Variables (Parametrized Compositions)

```html
<html data-composition-variables='[
  {"id":"title","type":"string","label":"Title","default":"Hello"}
]'>
<body>
  <div data-composition-id="root" data-width="1920" data-height="1080">
    <script>
      const { title } = window.__hyperframes.getVariables();
    </script>
  </div>
</body></html>
```

```bash
npx hyperframes render --variables '{"title":"Custom Title"}'
```

## Media Preprocessing

### Text-to-Speech (Kokoro, local, no API key)
```bash
npx hyperframes tts "Your text" --voice af_nova --output narration.wav
npx hyperframes tts --list  # 54 voices
```
Voice prefixes: `a`=US, `b`=British, `e`=Spanish, `f`=French, `j`=Japanese, `z`=Mandarin.

### Transcription (Whisper)
```bash
npx hyperframes transcribe audio.mp3 --model small
npx hyperframes transcribe video.mp4 --model small --language es
```
**Never use `.en` models on non-English audio** — they translate instead of transcribing.

### Background Removal
```bash
npx hyperframes remove-background subject.mp4 -o transparent.webm
npx hyperframes remove-background portrait.jpg -o cutout.png
```

## Registry (Reusable Blocks)

```bash
npx hyperframes add data-chart       # install block
npx hyperframes add grain-overlay    # install component
```

Config (`hyperframes.json`):
```json
{
  "registry": "https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry",
  "paths": { "blocks": "compositions", "components": "compositions/components" }
}
```

## Embed Patterns

### Hero video background
```html
<video autoplay muted loop playsinline class="hero-bg-video" aria-hidden="true">
  <source src="/videos/hero-loop.webm" type="video/webm">
  <source src="/videos/hero-loop.mp4" type="video/mp4">
</video>
```

### Project card hover
```html
<div class="project-card"
  onmouseenter="this.querySelector('video').play()"
  onmouseleave="v=this.querySelector('video');v.pause();v.currentTime=0">
  <img src="thumb.jpg" alt="Project" loading="lazy" width="800" height="450">
  <video muted loop playsinline preload="none" src="preview.mp4"></video>
</div>
```

### Fallback placeholder (while videos render)
```css
.hero-bg-placeholder {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 20% 50%, rgba(108,99,255,0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 50%, rgba(255,107,107,0.1) 0%, transparent 60%);
}
```

## Performance
- `preload="none"` on hover videos — only load on interaction
- WebM first (smaller), MP4 fallback
- Target: hero ≤ 3MB, previews ≤ 1MB
- Compress: `ffmpeg -i input.mp4 -crf 28 -preset slow output.mp4`
