# A Bouquet for You

React + Vite + TypeScript + Tailwind + GSAP/ScrollTrigger.

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # production build in /dist

## Personalise (all in `src/config.ts`)
- **Names & letter**: `config.letter`
- **Photos**: copy images into `public/assets/photos/`, set `src: "/assets/photos/us1.jpg"` (resize to ~1200px wide, JPEG/WebP)
- **Flowers**: transparent PNG/WebP cut-outs into `public/assets/flowers/`, list them in `assets.flowers` (order: red rose, pink rose, cream, red dahlia). Missing/broken files fall back to painted SVG blooms.
- **Music**: your own file in `public/assets/audio/` -> `music.src`, or an official Spotify/YouTube embed URL -> `music.embedUrl`. Plays only after a tap.
- **Colors**: `config.palette`

## Notes
- Pinned scenes: bouquet and letter only. Everything else scrolls normally.
- `prefers-reduced-motion`: no pinning or scrubbing; a static dense-flower scene and fully visible letter are shown.
- GSAP is registered once in `main.tsx`; each scene cleans up via `gsap.matchMedia().revert()`.
