
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { config } from "../config";

export default function Envelope() {
  const root = useRef<HTMLElement | null>(null);
  const busy = useRef(false);
  const q = gsap.utils.selector(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(q(".float"), {
          y: -10,
          duration: 2.4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });

        gsap.to(q(".shadow"), {
          scaleX: 0.8,
          opacity: 0.4,
          duration: 2.4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  const open = () => {
    if (busy.current) return;

    busy.current = true;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const go = () => {
      document.getElementById("bouquet")?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
      });

      busy.current = false;
    };

    if (reduce) {
      go();
      return;
    }

    gsap
      .timeline({ onComplete: go })
      .to(q(".hint"), { opacity: 0, duration: 0.4 })
      .to(
        q(".envelope-image"),
        {
          scale: 1.08,
          rotate: -3,
          duration: 0.7,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        q(".envelope-image"),
        {
          scale: 1.3,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        },
        0.7
      );
  };

  return (
    <section
      ref={root}
      className="paper relative flex h-[100svh] flex-col items-center justify-center overflow-hidden bg-ivory"
    >
      <button
        type="button"
        aria-label="Open the envelope"
        onClick={open}
        
className="float relative flex w-[min(65vw,360px)] items-center justify-center border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson"
>
        <img
          src="/assets/custom-rose-envelope-600.png"
          alt="A watercolor envelope decorated with roses and a ribbon"
          draggable={false}
          className="envelope-image block h-auto w-full select-none object-contain"
        />
      </button>

      <span className="shadow mt-2 h-3 w-40 rounded-[50%] bg-black/15 blur-md" />

      <p className="hint mt-6 px-4 text-center font-serif text-xl italic text-ink/70">
        {config.envelope.hint}
      </p>
    </section>
  );
}
