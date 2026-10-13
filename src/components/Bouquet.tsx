
import { useMemo } from "react";
import gsap from "gsap";
import Bloom, { rng } from "./Bloom";
import { useScene } from "./useScene";

const gpu = {
  willChange: "transform, opacity",
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
} as const;

function build(root: HTMLElement, q: (s: string) => Element[]) {
  gsap.defaults({ force3D: true });

  const tl = gsap.timeline({
    defaults: { force3D: true },
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
    },
  });

  tl.set(q(".dense"), { opacity: 0 })
    .fromTo(
      q(".bqin"),
      { scale: 0.18 },
      { scale: 3, ease: "none", duration: 5 },
      0
    )
    .to(q(".hint"), { opacity: 0, duration: 0.6 }, 0)
    .fromTo(
      q(".dense"),
      { opacity: 0, scale: 1.15 },
      { opacity: 1, scale: 1, duration: 3, ease: "none" },
      2.4
    )
    .to(q(".bq"), { opacity: 0, duration: 1.4, ease: "none" }, 3.8)
    .to(q(".ocean"), { opacity: 1, duration: 2.2, ease: "none" }, 6)
    .to(q(".dense"), { opacity: 0, duration: 2, ease: "none" }, 6.4);
}

export default function Bouquet() {
  const cluster = useMemo(() => {
    const r = rng(7);

    return Array.from({ length: 14 }, (_, i) => {
      const a = r() * 6.28;
      const d = Math.sqrt(r()) * 105;

      return {
        i,
        x: 160 + Math.cos(a) * d,
        y: 160 + Math.sin(a) * d * 1.1,
        s: 80 + r() * 50,
        rot: r() * 360,
      };
    });
  }, []);

  const mix = [0, 3, 0, 1, 2, 3, 0, 3, 1, 2];

  const dense = useMemo(() => {
    const r = rng(21);

    return Array.from({ length: 30 }, (_, i) => ({
      i: mix[i % 10] + 4 * Math.floor(i / 10),
      x: r() * 100,
      y: r() * 100,
      s: 28 + r() * 18,
      rot: r() * 360,
    }));
  }, []);

  const ref = useScene((root, q) => {
    build(root, q);
  });

  return (
    <section
      id="bouquet"
      ref={ref}
      className="paper relative h-[100svh] overflow-hidden bg-ivory"
    >
      <div
        className="ocean absolute inset-0 bg-gradient-to-b from-[#bfe3ea] to-[#e3f2f4] opacity-0"
        style={gpu}
      />

      {/* Dense red flower background */}
      <div
        className="dense absolute inset-0 motion-reduce:opacity-100"
        style={{
          ...gpu,
          background:
            "radial-gradient(circle at 50% 50%, #a31f2b, #7d1220)",
        }}
      >
        {dense.map((b) => (
          <span
            key={b.i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
            }}
          >
            <Bloom
              i={b.i}
              size={`${b.s}vmax`}
              rot={b.rot}
            />
          </span>
        ))}
      </div>

      {/* Initial bouquet animation */}
      <div
        className="bq absolute inset-0 grid place-items-center motion-reduce:hidden"
        style={gpu}
      >
        <div
          className="bqin relative h-[320px] w-[320px]"
          style={gpu}
        >
          {cluster.map((b) => (
            <span
              key={b.i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: b.x,
                top: b.y,
              }}
            >
              <Bloom
                i={b.i}
                size={`${b.s}px`}
                rot={b.rot}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Scroll instruction */}
      <p className="hint absolute inset-x-0 bottom-[max(2rem,env(safe-area-inset-bottom))] text-center font-serif text-lg italic text-ink/70">
        keep scrolling
      </p>
    </section>
  );
}
