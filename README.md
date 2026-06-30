# AISOLUCE : AI-First Vibe Coding Portfolio

Live demo: https://aisoluce-vibecode-portfolio.netlify.app/

A dependency-free, single-page portfolio by Kylian Stomp (AISOLUCE), AI-first full-stack engineer. No framework, no build step: just HTML, CSS and vanilla JavaScript.

## Highlights
- Hand-rolled i18n engine, 6 languages (FR, EN, ZH, RU, ES, PT), no library
- Interactive 3D gallery with Three.js (GLTF + Meshopt, loaded on demand)
- Autonomous agent systems showcase (multi-agent pipelines with a verification gate)
- Interactive terminal, MCP diagram, motion-design gallery, animated dropdown menu
- Fully responsive and dark, zero runtime dependencies (Three.js via CDN importmap)

## Stack
HTML, CSS, vanilla JavaScript, Three.js (importmap CDN). No bundler, no node_modules.

## Run locally
```
python -m http.server 8000
```
Then open http://localhost:8000

Heavy 3D (.glb) and video (.mp4) assets are not committed to keep the repo light. See the live demo for the full experience.

## Author
Kylian Stomp, AISOLUCE
- Portfolio: https://aisoluce-vibecode-portfolio.netlify.app/
- LinkedIn: https://www.linkedin.com/in/kylian-stomp-a76b7b3ab
