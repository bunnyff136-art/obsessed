import { memo, useState } from "react";
import { config } from "../config";

export function rng(seed: number) {
  return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

const P = {
  round: "M0 0C-17-6-19-34 0-44C19-34 17-6 0 0Z",
  cup: "M0 0C-14-4-16-26 0-34C16-26 14-4 0 0Z",
  point: "M0 0C-6-10-8-30 0-47C8-30 6-10 0 0Z"
};
type Ring = { n: number; s: number; off: number; d: string };
const specs: { g: string; stroke: string; rings: Ring[]; swirl?: boolean; stamens?: boolean }[] = [
  { g: "fr", stroke: "#5e0914", swirl: true, rings: [{ n: 5, s: 1, off: 0, d: P.round }, { n: 5, s: 0.72, off: 36, d: P.round }, { n: 4, s: 0.46, off: 18, d: P.cup }] },
  { g: "fp", stroke: "#b8456a", swirl: true, rings: [{ n: 5, s: 1, off: 0, d: P.round }, { n: 5, s: 0.72, off: 36, d: P.round }, { n: 4, s: 0.46, off: 18, d: P.cup }] },
  { g: "fc", stroke: "#c9a56e", stamens: true, rings: [{ n: 7, s: 1, off: 0, d: P.round }, { n: 7, s: 0.74, off: 25, d: P.round }, { n: 6, s: 0.5, off: 10, d: P.round }] },
  { g: "fd", stroke: "#4a0610", rings: [{ n: 12, s: 1, off: 0, d: P.point }, { n: 10, s: 0.78, off: 18, d: P.point }, { n: 8, s: 0.55, off: 9, d: P.point }, { n: 6, s: 0.3, off: 0, d: P.point }] }
];

const grads: [string, string[]][] = [
  ["fr", ["#6b0c18", "#b3202e", "#e2515b"]],
  ["fp", ["#c9577a", "#f093ac", "#fdd0da"]],
  ["fc", ["#d9b87e", "#f6e8d0", "#fffaf2"]],
  ["fd", ["#5e0914", "#a81c2a", "#d8404c"]]
];

/** Render once (in App) so every flower can reuse the same gradients. */
export function FlowerDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        {grads.map(([id, c]) => (
          <radialGradient key={id} id={id} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="46">
            <stop offset="0" stopColor={c[0]} /><stop offset=".45" stopColor={c[1]} /><stop offset="1" stopColor={c[2]} />
          </radialGradient>
        ))}
      </defs>
    </svg>
  );
}

function Bloom({ i, size, rot = 0, tint }: { i: number; size: string; rot?: number; tint?: string }) {
  const list = config.assets.flowers;
  const [bad, setBad] = useState(false);
  const style = { width: size, height: size, transform: `rotate(${rot}deg)` };
  if (list.length && !bad) return <img src={list[i % list.length]} alt="" loading="lazy" decoding="async" onError={() => setBad(true)} style={style} className="object-contain" draggable={false} />;
  const k = specs[i % 4];
  return (
    <svg viewBox="-50 -50 100 100" style={style} aria-hidden="true">
      {k.rings.map((r, l) =>
        Array.from({ length: r.n }).map((_, p) => (
          <path key={`${l}-${p}`} d={r.d} fill={tint ?? `url(#${k.g})`} stroke={k.stroke} strokeOpacity=".45" strokeWidth=".8"
            transform={`rotate(${r.off + (360 / r.n) * p}) scale(${r.s})`} />
        ))
      )}
      {k.swirl && <path d="M0 0q7-2 6-8q-2-7-10-4q-5 4-1 9" fill="none" stroke={k.stroke} strokeOpacity=".6" strokeWidth="1.1" strokeLinecap="round" />}
      {k.stamens && Array.from({ length: 9 }).map((_, n) => <circle key={n} cx={Math.cos(n * 0.7) * 5} cy={Math.sin(n * 0.7) * 5} r="1.5" fill="#e0a83a" />)}
      {k.g === "fd" && <circle r="2.2" fill="#e8b84a" />}
    </svg>
  );
}
export default memo(Bloom);