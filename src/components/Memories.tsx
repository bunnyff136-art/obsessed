import { Heart } from "lucide-react";
import { config } from "../config";
import { useScene } from "./useScene";
import gsap from "gsap";

export default function Memories() {
  const ref = useScene((_, q) => {
    q(".pol").forEach((el, i) => {
      gsap.from(el, { opacity: 0, y: 60, rotation: (i % 2 ? 1 : -1) * 14, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" } });
      gsap.to(el.querySelector(".in"), { y: (i % 2 ? -1 : 1) * 28, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    });
  });
  const tilt = [-4, 3, -2, 5, -3, 2];

  return (
    <section ref={ref} className="px-5 pb-32 pt-24" aria-label="Our memories">
      <h2 className="mb-14 text-center font-script text-[clamp(1.8rem,6vw,2.6rem)] text-ink/80">The little Things I Kept</h2>
      <div className="mx-auto flex max-w-5xl flex-wrap items-start justify-center gap-x-10 gap-y-14">
        {config.memories.map((m, i) => (
          <figure key={i} className="pol w-[min(78vw,17rem)]" style={{ rotate: `${tilt[i % tilt.length]}deg`, marginTop: i % 2 ? "2.5rem" : 0 }}>
            <div className="in bg-[#fbf6ee] p-3 pb-4 shadow-[0_14px_30px_rgba(60,90,120,.25)]">
              <div className="aspect-[4/5] overflow-hidden bg-blush/40">
                {m.src ? <img src={m.src} alt={m.caption} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  : <div className="grid h-full place-items-center bg-gradient-to-br from-blush/70 to-aqua"><Heart className="text-crimson/60" size={36} aria-hidden /><span className="sr-only">Photo placeholder</span></div>}
              </div>
              <figcaption className="mt-3 text-center font-script text-lg leading-tight text-ink">{m.caption}<span className="mt-1 block font-serif text-sm italic text-ink/60">{m.date}</span></figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
