import { useMemo } from "react";
import { Heart, RotateCcw } from "lucide-react";
import { config } from "../config";
import { rng } from "./Bloom";
import { useScene } from "./useScene";
import gsap from "gsap";

export default function Finale({ onReplay }: { onReplay: () => void }) {
  const petals = useMemo(() => { const r = rng(5); return Array.from({ length: 14 }, (_, i) => ({ i, x: r() * 100, s: 10 + r() * 14, d: 9 + r() * 8, delay: -r() * 14, dx: (r() - 0.5) * 140 })); }, []);
  const ref = useScene((root, q) => {
    gsap.from(q(".fx"), { opacity: 0, y: 24, stagger: 0.35, duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: root, start: "top 55%", toggleActions: "play none none reverse" } });
  });
  return (
    <section ref={ref} className="paper relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ivory px-6 text-center">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {petals.map((p) => <span key={p.i} className="petal bg-blush" style={{ left: `${p.x}%`, width: p.s, height: p.s, animationDuration: `${p.d}s`, animationDelay: `${p.delay}s`, ["--dx" as any]: `${p.dx}px`, opacity: 0.8 }} />)}
      </div>
      <p className="fx relative max-w-xl font-script text-[clamp(1.5rem,5.6vw,2.4rem)] leading-[1.7] text-ink">{config.finale.message}</p>
      <Heart className="fx heart relative mt-10 fill-crimson text-crimson" size={34} aria-hidden />
      <p className="fx relative mt-8 font-serif text-xl italic text-ink/75">{config.finale.closing}</p>
      <button onClick={onReplay} className="fx relative mt-12 inline-flex items-center gap-2 rounded-full border border-ink/30 px-5 py-2 font-serif text-lg italic text-ink hover:bg-blush/40">
        <RotateCcw size={16} aria-hidden /> {config.finale.replayLabel}
      </button>
    </section>
  );
}
