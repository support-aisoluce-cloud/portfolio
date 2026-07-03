# AISOLUCE — AI-First Vibe Coding Portfolio

> A single-page engineer portfolio with a Three.js 3D gallery, a 6-language i18n engine, an interactive terminal and an MCP diagram — built with **zero frameworks, zero build step, zero runtime dependencies**.

**Live:** https://aisoluce-vibecode-portfolio.netlify.app/

Just `index.html`, `style.css` and a handful of vanilla `.js` files. No React, no bundler, no `node_modules` — everything you can do with the platform, done with the platform.

## The constraint, and why it's the point

The interesting part of this project is the self-imposed rule: **no framework and no build tooling**. Every feature that a typical portfolio reaches for a library to solve is instead hand-engineered against the browser's own APIs. That constraint is the demonstration — it shows what the vanilla platform actually gives you and forces clean, dependency-free solutions:

- **i18n without an i18n library** — a hand-rolled engine drives 6 languages (FR, EN, ZH, RU, ES, PT) off `data-i18n` attributes, including HTML-bearing strings and input placeholders. No `i18next`, no runtime framework.
- **3D without a scene framework** — Three.js loads on demand via a native `<script type="importmap">` (CDN, no bundler) to render an interactive GLTF gallery with Meshopt-compressed assets.
- **Interactivity without a UI framework** — the terminal emulator, MCP connector diagram (with live SVG connector lines), motion-design gallery and animated navigation are all plain DOM + event listeners.
- **No build step** — the repo is served exactly as written. `python -m http.server` is the entire toolchain.

## Modules

```
index.html ── page shell, semantic sections, importmap
   │
   ├── style.css ───────── responsive dark design system, motion/animation
   │
   ├── i18n.js ─────────── hand-built i18n engine
   │                       6 languages · data-i18n / data-i18n-html / -placeholder
   │
   ├── app.js ──────────── interactive modules (vanilla DOM):
   │      ├─ terminal emulator ── command parser + typed responses + mock logs
   │      ├─ MCP diagram ──────── clickable nodes, live SVG connector lines, code panels
   │      ├─ motion gallery ───── motion-design showcase
   │      ├─ animated nav ─────── dropdown menu + scroll progress bar
   │      └─ scroll/reveal ────── on-scroll animations
   │
   └── viewer3d.js ─────── Three.js GLTF gallery (importmap CDN, Meshopt,
                           lazy-loaded so 3D never blocks first paint)
```

## Tech stack

| Concern | Choice |
|---------|--------|
| Markup | Semantic HTML5, single page |
| Styling | Hand-written CSS — responsive, dark, motion design (no Tailwind, no preprocessor) |
| Logic | Vanilla JavaScript (ES modules), no framework |
| i18n | Custom engine, 6 languages, attribute-driven |
| 3D | Three.js via native `importmap` (CDN), GLTF + Meshopt, loaded on demand |
| Build | **None** — files are served as-is |
| Runtime deps | **None** bundled (Three.js pulled from CDN at runtime) |
| Hosting | Netlify (static) |

## Run locally

No install, no build:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Any static file server works (`npx serve`, `php -S`, etc.) — there is nothing to compile.

Heavy binary assets (`.glb` 3D models, `.mp4` motion clips) are intentionally kept out of the repo to keep it light; they're git-ignored. The [live demo](https://aisoluce-vibecode-portfolio.netlify.app/) has the full experience including 3D and video.

## Author

**Kylian Stomp** — AI-first full-stack engineer (AISOLUCE)

- Portfolio: https://aisoluce-vibecode-portfolio.netlify.app/
- LinkedIn: https://www.linkedin.com/in/kylian-stomp-a76b7b3ab
