# HyperFrames Integration Reference

HyperFrames renders HTML compositions to MP4/WebM. The site embeds those as `<video>` elements.
The rendering happens offline (CLI) — no runtime dependency on HyperFrames in the deployed site.

## Prerequisites
- Node.js >= 22
- FFmpeg (for rendering)
- Python 3.8+ (for TTS / transcription / background removal)

## Setup
```bash
npx hyperframes init hf-compositions
cd hf-compositions
# Install skills for AI-assisted composition authoring:
npx skills add heygen-com/hyperframes
```

### Init Options
```bash
npx hyperframes init my-video                        # interactive wizard
npx hyperframes init my-video --example warm-grain   # pick an example
npx hyperframes init my-video --video clip.mp4       # with video file
npx hyperframes init my-video --audio track.mp3      # with audio file
npx hyperframes init my-video --example blank --tailwind # with Tailwind v4
npx hyperframes init my-video --non-interactive      # skip prompts (CI/agents)
```

Available examples/templates: `blank`, `warm-grain`, `play-mode`, `swiss-grid`, `vignelli`, `decision-tree`, `kinetic-type`, `product-promo`, `nyt-graph`.

## Composition file structure
```
hf-compositions/
├── index.html                    ← root composition (hero loop)
├── compositions/
│   ├── hero-loop.html
│   ├── project-creatornexus.html
│   ├── project-blogtoshorts.html
│   ├── skills-kinetic.html
│   └── career-timeline.html
└── assets/
    ├── fonts/
    └── images/
```

## CLI Dev Loop

The full workflow: **scaffold → write → lint → inspect → preview → render**

### Linting & Validation
```bash
npx hyperframes lint                  # current directory
npx hyperframes lint --verbose        # info-level findings
npx hyperframes lint --json           # machine-readable output
```

### Visual Inspect (catches layout overflow)
```bash
npx hyperframes inspect               # check rendered layout
npx hyperframes inspect --json        # agent-readable findings
npx hyperframes inspect --samples 15  # denser timeline sweep
npx hyperframes inspect --at 1.5,4,7  # explicit hero-frame timestamps
```

### Preview (hot-reloads on file change)
```bash
npx hyperframes preview               # serve current directory
npx hyperframes preview --port 4567   # custom port (default 3002)
```

### Troubleshooting
```bash
npx hyperframes doctor       # check environment (Chrome, FFmpeg, Node, memory)
npx hyperframes browser      # manage bundled Chrome
npx hyperframes info         # version and environment details
npx hyperframes upgrade      # check for updates
```

## Render commands

```bash
# Hero background loop (10s, 30fps, 1920x1080)
npx hyperframes render \
  --input compositions/hero-loop.html \
  --output ../public/videos/hero-loop.mp4 \
  --width 1920 --height 1080 --fps 30

# Project preview (8s, for card hover)
npx hyperframes render \
  --input compositions/project-creatornexus.html \
  --output ../public/videos/creatornexus-preview.mp4 \
  --width 800 --height 450 --fps 24

# Also render WebM for better browser support
npx hyperframes render \
  --input compositions/hero-loop.html \
  --output ../public/videos/hero-loop.webm \
  --format webm --width 1920 --height 1080
```

### Render flags reference

| Flag                 | Options               | Default                    | Notes                            |
| -------------------- | --------------------- | -------------------------- | -------------------------------- |
| `--output`           | path                  | renders/name_timestamp.mp4 | Output path                      |
| `--fps`              | 24, 30, 60            | 30                         | 60fps doubles render time        |
| `--quality`          | draft, standard, high | standard                   | draft for iterating              |
| `--format`           | mp4, webm             | mp4                        | WebM supports transparency       |
| `--workers`          | 1-8 or auto           | auto                       | Each spawns Chrome               |
| `--docker`           | flag                  | off                        | Reproducible/byte-identical      |
| `--gpu`              | flag                  | off                        | GPU-accelerated encoding         |
| `--strict`           | flag                  | off                        | Fail on lint errors              |
| `--variables`        | JSON object           | —                          | Override composition variables    |
| `--variables-file`   | path                  | —                          | JSON file with variable values   |

**Quality guidance:** `draft` while iterating, `standard` for review, `high` for final delivery.

## Composition patterns

### Data Attributes (all clips)

| Attribute          | Required                          | Values                                                 |
| ------------------ | --------------------------------- | ------------------------------------------------------ |
| `id`               | Yes                               | Unique identifier                                      |
| `data-start`       | Yes                               | Seconds or clip ID reference (`"el-1"`, `"intro + 2"`) |
| `data-duration`    | Required for img/div/compositions | Seconds. Video/audio defaults to media duration.       |
| `data-track-index` | Yes                               | Integer. Same-track clips cannot overlap.              |
| `data-media-start` | No                                | Trim offset into source (seconds)                      |
| `data-volume`      | No                                | 0-1 (default 1)                                        |

### Composition-level attributes

| Attribute                    | Required | Values                                    |
| ---------------------------- | -------- | ----------------------------------------- |
| `data-composition-id`        | Yes      | Unique composition ID                     |
| `data-start`                 | Yes      | Start time (root composition: use `"0"`)  |
| `data-duration`              | Yes      | Takes precedence over GSAP timeline       |
| `data-width` / `data-height` | Yes      | Pixel dimensions (1920x1080 or 1080x1920) |
| `data-composition-src`       | No       | Path to external HTML file                |
| `data-variable-values`       | No       | JSON object of per-instance overrides     |

### Timeline Contract
- All timelines start `{ paused: true }` — the player controls playback
- Register every timeline: `window.__timelines["<composition-id>"] = tl`
- Duration comes from `data-duration`, not from GSAP timeline length
- Never use `repeat: -1` (breaks capture engine)
- Never build timelines inside async/setTimeout/Promises
- No `Math.random()` / `Date.now()` — must be deterministic

### Pattern 1 — Hero loop (abstract AI/agent animation)
```html
<!-- compositions/hero-loop.html -->
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0a0a0a; overflow: hidden; }
    canvas { display: block; }
  </style>
</head>
<body>
  <div id="stage" 
    data-composition-id="hero-loop" 
    data-start="0" 
    data-width="1920" 
    data-height="1080">
    
    <canvas id="c" width="1920" height="1080"></canvas>

    <script>
      // Floating LLM node network — deterministic, seek-driven
      const canvas = document.getElementById('c');
      const ctx = canvas.getContext('2d');
      const W = 1920, H = 1080;
      
      // Fixed node positions (deterministic — no Math.random at seek time)
      const nodes = Array.from({ length: 40 }, (_, i) => ({
        x: (Math.sin(i * 2.3) * 0.5 + 0.5) * W,
        y: (Math.cos(i * 1.7) * 0.5 + 0.5) * H,
        r: 3 + (i % 5) * 1.5,
        phase: i * 0.4,
      }));

      // Register timeline for HyperFrames seeking
      const tl = gsap.timeline({ paused: true });
      
      tl.to({}, {
        duration: 10,
        onUpdate() {
          const t = tl.time();
          ctx.clearRect(0, 0, W, H);
          
          // Draw connections
          ctx.strokeStyle = 'rgba(108, 99, 255, 0.15)';
          ctx.lineWidth = 0.5;
          nodes.forEach((a, i) => {
            nodes.slice(i + 1).forEach(b => {
              const dist = Math.hypot(a.x - b.x, a.y - b.y);
              if (dist < 280) {
                const opacity = (1 - dist / 280) * 0.3 * (0.5 + 0.5 * Math.sin(t * 0.8 + a.phase));
                ctx.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
                ctx.beginPath();
                ctx.moveTo(a.x + Math.sin(t * 0.5 + a.phase) * 12, a.y + Math.cos(t * 0.4 + a.phase) * 8);
                ctx.lineTo(b.x + Math.sin(t * 0.5 + b.phase) * 12, b.y + Math.cos(t * 0.4 + b.phase) * 8);
                ctx.stroke();
              }
            });
          });

          // Draw nodes
          nodes.forEach(n => {
            const x = n.x + Math.sin(t * 0.5 + n.phase) * 12;
            const y = n.y + Math.cos(t * 0.4 + n.phase) * 8;
            const pulse = 0.7 + 0.3 * Math.sin(t * 1.2 + n.phase);
            
            ctx.beginPath();
            ctx.arc(x, y, n.r * pulse, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(108, 99, 255, ${0.4 + 0.4 * pulse})`;
            ctx.fill();
          });
        }
      });

      window.__timelines = window.__timelines || {};
      window.__timelines['hero-loop'] = tl;
    </script>
  </div>
</body>
</html>
```

### Pattern 2 — Project card preview (knowledge graph)
```html
<!-- compositions/project-creatornexus.html -->
<div id="stage" 
  data-composition-id="creatornexus-preview"
  data-start="0" data-width="800" data-height="450">

  <!-- Background -->
  <div style="position:absolute;inset:0;background:#0a0a0a;"></div>

  <!-- Title card -->
  <div id="title" class="clip" 
    data-start="0" data-duration="8" data-track-index="0"
    style="position:absolute;bottom:24px;left:24px;color:white;font-family:sans-serif;">
    <div style="font-size:22px;font-weight:700;">CreatorNexus AI</div>
    <div style="font-size:13px;opacity:0.6;">Research intelligence · Knowledge graph</div>
  </div>

  <canvas id="kg" width="800" height="450" 
    data-start="0" data-duration="8" data-track-index="1"
    style="position:absolute;inset:0;"></canvas>

  <script>
    const canvas = document.getElementById('kg');
    const ctx = canvas.getContext('2d');
    // ... knowledge graph animation using GSAP timeline
    // Register as window.__timelines['creatornexus-preview'] = tl;
  </script>
</div>
```

### Pattern 3 — Kinetic typography (skills section)
```html
<!-- compositions/skills-kinetic.html -->
<div id="stage"
  data-composition-id="skills-kinetic"
  data-start="0" data-width="1200" data-height="400">

  <div style="position:absolute;inset:0;background:#0a0a0a;display:flex;align-items:center;justify-content:center;overflow:hidden;">
    <div id="tags" style="display:flex;flex-wrap:wrap;gap:12px;padding:24px;justify-content:center;"></div>
  </div>

  <script>
    const skills = ['LLM Integration','Multi-Agent Systems','RAG Pipelines',
      'WordPress VIP','Next.js','Python','FastAPI','GSAP','Three.js'];
    
    const container = document.getElementById('tags');
    skills.forEach(s => {
      const el = document.createElement('span');
      el.textContent = s;
      el.style.cssText = 'background:rgba(108,99,255,0.15);border:1px solid rgba(108,99,255,0.3);color:#a39fff;padding:8px 18px;border-radius:999px;font-family:sans-serif;font-size:14px;opacity:0;transform:scale(0.8)';
      container.appendChild(el);
    });

    const tl = gsap.timeline({ paused: true });
    tl.to(container.children, {
      opacity: 1, scale: 1, duration: 0.4, stagger: 0.12, ease: 'back.out(1.4)'
    });

    window.__timelines = window.__timelines || {};
    window.__timelines['skills-kinetic'] = tl;
  </script>
</div>
```

## Embed patterns in the site

### Hero video background
```html
<!-- HYPERFRAMES: npx hyperframes render --input compositions/hero-loop.html --output public/videos/hero-loop.mp4 -->
<video autoplay muted loop playsinline class="hero-bg-video" aria-hidden="true">
  <source src="public/videos/hero-loop.webm" type="video/webm">
  <source src="public/videos/hero-loop.mp4" type="video/mp4">
</video>
```

### Project card hover video
```html
<!-- HYPERFRAMES: npx hyperframes render --input compositions/project-creatornexus.html --output public/videos/creatornexus-preview.mp4 --width 800 --height 450 -->
<div class="project-card"
  onmouseenter="this.querySelector('video').play()"
  onmouseleave="v=this.querySelector('video');v.pause();v.currentTime=0">
  <img src="assets/images/creatornexus-thumb.jpg" alt="CreatorNexus AI" class="card-thumb" loading="lazy" width="800" height="450">
  <video class="card-video" muted loop playsinline preload="none">
    <source src="public/videos/creatornexus-preview.mp4" type="video/mp4">
  </video>
</div>
```

## Placeholder for when videos aren't rendered yet

Use a gradient/static background as fallback while HyperFrames renders are in progress:
```css
.hero-bg-video-placeholder {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 20% 50%, rgba(108,99,255,0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 50%, rgba(255,107,107,0.1) 0%, transparent 60%);
}
```
Show placeholder until video is ready — swap with a JS check:
```js
const video = document.querySelector('.hero-bg-video');
if (video) {
  video.addEventListener('canplay', () => {
    document.querySelector('.hero-bg-video-placeholder')?.remove();
  });
}
```

## Performance tips
- Use `preload="none"` on project card videos — only load on hover
- Serve WebM first (smaller file size), MP4 as fallback
- Compress with ffmpeg: `ffmpeg -i input.mp4 -crf 28 -preset slow output.mp4`
- Target: hero loop ≤ 3MB WebM, project previews ≤ 1MB each

## Variables (Parametrized Compositions)

Render the same composition with different content without editing the source HTML.

```html
<html data-composition-variables='[
  {"id":"title","type":"string","label":"Title","default":"Hello"},
  {"id":"theme","type":"enum","label":"Theme","default":"light","options":[
    {"value":"light","label":"Light"},
    {"value":"dark","label":"Dark"}
  ]}
]'>
<body>
  <div data-composition-id="root" data-width="1920" data-height="1080">
    <h1 id="hero"></h1>
    <script>
      const { title, theme } = window.__hyperframes.getVariables();
      document.getElementById("hero").textContent = title;
    </script>
  </div>
</body>
</html>
```

```bash
# Override at render time
npx hyperframes render --variables '{"title":"Q4 Report","theme":"dark"}'
npx hyperframes render --variables-file ./vars.json
```

Sub-compositions accept per-instance values via `data-variable-values`:
```html
<div data-composition-id="card-pro"
  data-composition-src="compositions/card.html"
  data-variable-values='{"title":"Pro","price":"$29"}'>
</div>
```

## Media Preprocessing

### Text-to-Speech (Kokoro — local, no API key)
```bash
npx hyperframes tts "Text here" --voice af_nova --output narration.wav
npx hyperframes tts script.txt --voice bf_emma --output narration.wav
npx hyperframes tts --list                       # all 54 voices
```

Voice language prefixes: `a`=US English, `b`=British English, `e`=Spanish, `f`=French, `h`=Hindi, `i`=Italian, `j`=Japanese, `p`=Brazilian Portuguese, `z`=Mandarin.

### Transcription (Whisper)
```bash
npx hyperframes transcribe audio.mp3
npx hyperframes transcribe video.mp4 --model small --language es
npx hyperframes transcribe subtitles.srt          # import existing SRT/VTT
```

**Never use `.en` models unless audio is confirmed English** — `.en` models translate non-English audio into English silently.

Output: flat array of word objects with timestamps:
```json
[
  { "id": "w0", "text": "Hello", "start": 0.0, "end": 0.5 },
  { "id": "w1", "text": "world.", "start": 0.6, "end": 1.2 }
]
```

### Background Removal (u2net)
```bash
npx hyperframes remove-background subject.mp4 -o transparent.webm
npx hyperframes remove-background portrait.jpg -o cutout.png
npx hyperframes remove-background subject.mp4 -o subject.webm \
  --background-output plate.webm  # both layers in one pass
```

## Registry (Reusable Blocks & Components)

Install pre-built blocks and components:
```bash
npx hyperframes add data-chart              # install a block
npx hyperframes add grain-overlay           # install a component
npx hyperframes add shimmer-sweep --dir .   # target a specific project
```

- **Blocks** — standalone sub-compositions. Include via `data-composition-src`.
- **Components** — effect snippets. Paste directly into host composition HTML.

Registry config lives in `hyperframes.json`:
```json
{
  "registry": "https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry",
  "paths": {
    "blocks": "compositions",
    "components": "compositions/components",
    "assets": "assets"
  }
}
```

## Website-to-HyperFrames Workflow

Capture a website and produce a video from it (social ads, product tours, promos):

1. **Capture & Understand** — Run capture, extract site data
2. **Write DESIGN.md** — Brand reference from captured site (~90 lines)
3. **Write SCRIPT.md** — Narration script (story backbone)
4. **Write STORYBOARD.md** — Per-beat creative direction
5. **Generate VO + Map Timing** — TTS → transcribe → map timestamps to beats
6. **Build Compositions** — Author each composition following storyboard
7. **Validate & Deliver** — Lint, validate, preview, render

## Installed Skills Reference

All 15 skills are installed at `.agents/skills/`:

| Skill | Purpose |
| ----- | ------- |
| `hyperframes` | Core composition authoring (structure, timing, animation rules) |
| `hyperframes-cli` | Dev loop commands (init, lint, inspect, preview, render, doctor) |
| `hyperframes-media` | Asset preprocessing (tts, transcribe, remove-background) |
| `hyperframes-registry` | Registry blocks & components (`hyperframes add`) |
| `gsap` | GSAP animation patterns for HyperFrames |
| `three` | Three.js adapter patterns |
| `animejs` | Anime.js adapter patterns |
| `css-animations` | CSS animation patterns |
| `tailwind` | Tailwind v4 browser runtime usage |
| `lottie` | Lottie animation integration |
| `typegpu` | TypeGPU shader patterns |
| `waapi` | Web Animations API patterns |
| `remotion-to-hyperframes` | Convert Remotion projects |
| `website-to-hyperframes` | Capture websites → video |
| `contribute-catalog` | Contributing to the registry |