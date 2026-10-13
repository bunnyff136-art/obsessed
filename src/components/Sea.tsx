import { useMemo } from "react";
import { FallingRoses } from "./Backdrops";
import { config } from "../config";
import Bloom, { rng } from "./Bloom";
import { useScene } from "./useScene";
import gsap from "gsap";

function Shell({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 100 90" className="h-full w-full" aria-hidden="true">
      <path d="M50 86 L6 42 Q50 -16 94 42 Z" fill={c} opacity=".85" />
      {[-34, -20, -7, 7, 20, 34].map((x) => <path key={x} d={`M50 84 L${50 + x * 1.2} 30`} stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" />)}
    </svg>
  );
}

export default function Sea({ children }: { children: React.ReactNode }) {
  const layers = useMemo(() => {
    const r = rng(99);
    const mk = (n: number, kind: string) => Array.from({ length: n }, (_, i) => ({ kind, i, x: r() * 100, y: r() * 100, s: 20 + r() * 70, rot: r() * 80 - 40 }));
    return [
      [...mk(7, "pearl"), ...mk(3, "shell")],
      [...mk(6, "pearl"), ...mk(5, "bloom"), ...mk(4, "petal")],
      [...mk(5, "pearl"), ...mk(3, "shell"), ...mk(3, "bloom")]
    ];
  }, []);
  const speeds = [-120, -280, -460, -200];
  const ref = useScene<HTMLDivElement>((root, q) => {
    q(".layer").forEach((el, i) => {
      gsap.to(el, { y: speeds[i], ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
    });
  });

  return (
    <div ref={ref} className="sea relative overflow-hidden" style={{ clipPath: "inset(0)" }}>
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      
        {layers.map((items, li) => (
          <div key={li} className="layer absolute inset-0 will-change-transform" style={{ height: "110%" }}>
            {items.map((b, k) => (
              <span key={`${b.kind}${k}`} className="absolute" style={{ left: `${b.x}%`, top: `${b.y}%`, width: b.s, height: b.s, transform: `rotate(${b.rot}deg)`, opacity: li === 0 ? 0.55 : 0.85 }}>
                {b.kind === "pearl" && <span className="pearl block h-full w-full" />}
                {b.kind === "shell" && <Shell c={["#f3cdd6", "#9cc3d3", "#f6e3cf"][k % 3]} />}
                {b.kind === "bloom" && <Bloom i={1 + (k % 2)} size="100%" tint={k % 2 ? "#fbe2ea" : "#fff4ee"} />}
                {b.kind === "petal" && <span className="block h-1/2 w-full rounded-[100%_0_100%_0] bg-blush/80" />}
              </span>
            ))}
            {li === 1 && config.assets.ocean.map((src, k) => <img key={src} src={src} alt="" loading="lazy" className="absolute w-40" style={{ left: `${(k * 37) % 80}%`, top: `${(k * 29) % 90}%` }} />)}
          </div>
        ))}
      </div>
      <FallingRoses />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
