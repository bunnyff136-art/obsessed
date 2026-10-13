import { config } from "../config";
import { useScene } from "./useScene";
import gsap from "gsap";

const lines = config.letter.paragraphs.map((p) => p.match(/[^.!?]+[.!?]+/g) ?? [p]);

export default function Letter() {
  const ref = useScene((root, q) => {
    const tl = gsap.timeline({ defaults: { force3D: true }, scrollTrigger: { trigger: root, start: "top top", end: "+=220%", pin: true, scrub: 1, anticipatePin: 1 } });
    tl.fromTo(q(".sheet"), { yPercent: 70 }, { yPercent: -4, ease: "power2.out", duration: 2 })
      .fromTo(q(".ln"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.5, duration: 0.8, ease: "power1.out" }, 1.4)
      .to({}, { duration: 0.8 });

    if (q(".bow").length) {
      const end = tl.duration();
      tl.fromTo(q(".bow"), { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "none" }, 0)
        .fromTo(q(".bow"), { scale: 1.3, x: 80, y: 0 }, { scale: 1, x: 0, y: -30, duration: end, ease: "none" }, 0)
        .to(q(".bow"), { opacity: 0, duration: 1.5, ease: "none" }, end - 1.5);
    }
  });

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden" aria-label="A letter for you">
      {config.assets.letterFrame && (
        <img src={config.assets.letterFrame} alt="" decoding="async" draggable={false}
          className="bow pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-right will-change-transform" />
      )}
      <div className="sheet absolute left-1/2 top-[6svh] z-[1] w-[min(88vw,30rem)] -translate-x-1/2 rotate-[-2deg] bg-[#fbf6ee] px-6 py-7 shadow-[0_18px_40px_rgba(60,90,120,.25)] motion-reduce:top-[4svh]">
        <p className="font-serif text-[clamp(1.05rem,4.4vw,1.35rem)] italic leading-snug">From: {config.letter.from}<br />For: {config.letter.to}</p>
        <div className="mt-4 space-y-3 font-serif text-[clamp(.98rem,3.9vw,1.2rem)] italic leading-relaxed">
          {lines.map((ls, i) => <p key={i}>{ls.map((l, j) => <span key={j} className="ln inline">{l.trim()} </span>)}</p>)}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-[2] mx-auto h-[26svh] w-[min(100vw,36rem)]">
        <div className="absolute inset-0 bg-[#e9a8b9] [clip-path:polygon(0_0,50%_55%,100%_0,100%_100%,0_100%)] shadow-xl" />
        <div className="absolute inset-0 bg-[#d98aa1] opacity-60 [clip-path:polygon(0_100%,50%_30%,100%_100%)]" />
      </div>
    </section>
  );
}