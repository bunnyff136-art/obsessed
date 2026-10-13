import { useMemo } from "react";
import { config } from "../config";
import Bloom, { rng } from "./Bloom";

const pos: [number, number, number][] = [[50, 20, 0], [27, 33, 1], [73, 33, 3], [40, 46, 2], [61, 48, 0], [50, 36, 1], [22, 50, 3]];

function BouquetArt() {
  return (
    <div className="relative h-full w-full" aria-hidden="true">
      {[[18, 28, -50], [78, 26, 50], [30, 12, -20], [68, 10, 25]].map(([x, y, r], k) => (
        <span key={k} className="absolute h-[11%] w-[26%] rounded-[50%] bg-[#6f9a6a]" style={{ left: `${x}%`, top: `${y}%`, transform: `rotate(${r}deg)` }} />
      ))}
      <span className="absolute bottom-0 left-1/2 h-[48%] w-[62%] -translate-x-1/2 bg-[#d9b48a] [clip-path:polygon(0_0,100%_0,62%_100%,38%_100%)]" />
      <span className="absolute bottom-0 left-1/2 h-[48%] w-[62%] -translate-x-1/2 bg-[#c49a6c]/60 [clip-path:polygon(50%_0,100%_0,62%_100%,50%_100%)]" />
      {pos.map(([x, y, i], k) => (
        <span key={k} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}><Bloom i={i} size="38%" rot={k * 47} /></span>
      ))}
    </div>
  );
}

const spots = [
  { l: "-3%", t: "10%", w: "clamp(150px,34vw,300px)", r: -12 },
  { l: "auto", t: "34%", w: "clamp(160px,36vw,330px)", r: 14, right: "-5%" },
  { l: "-4%", t: "58%", w: "clamp(150px,32vw,290px)", r: -8 },
  { l: "auto", t: "82%", w: "clamp(150px,34vw,300px)", r: 10, right: "-4%" }
];

export function BouquetLayer() {
  const imgs = config.assets.flowers;
  return (
    <div className="layer absolute inset-0" style={{ height: "110%" }}>
      {spots.map((s, k) => (
        <div key={k} className="absolute aspect-[5/6]" style={{ left: s.l, right: s.right, top: s.t, width: s.w, transform: `rotate(${s.r}deg)`, opacity: 0.95 }}>
          {imgs.length ? <img src={imgs[k % imgs.length]} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain" /> : <BouquetArt />}
        </div>
      ))}
    </div>
  );
}

/** Red and pink roses falling over the whole blue section. */
/** Pink and red petals falling over the whole blue section. */
export function FallingRoses() {
  const colors = ["#f4c6d0", "#f4a9bd", "#ee7f9f", "#d93a4f", "#b3202e"];
  const petals = useMemo(() => { const r = rng(33); return Array.from({ length: 24 }, (_, i) => ({ i, x: r() * 100, w: 14 + r() * 18, d: 10 + r() * 9, delay: -r() * 18, dx: (r() - 0.5) * 200, c: colors[i % 5] })); }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-20" aria-hidden="true">
      {petals.map((p) => (
        <span key={p.i} className="fpetal" style={{ left: `${p.x}%`, width: p.w, height: p.w * 0.62, background: p.c, animationDuration: `${p.d}s`, animationDelay: `${p.delay}s`, ["--dx" as any]: `${p.dx}px`, opacity: 0.85 }} />
      ))}
    </div>
  );
}