import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/** Runs `build` inside gsap.matchMedia so everything is reverted on unmount and skipped for reduced motion. */
export function useScene(build: (root: HTMLElement, q: (s: string) => Element[]) => void) {
  const ref = useRef<any>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => build(ref.current, gsap.utils.selector(ref)));
    return () => mm.revert();
  }, { scope: ref });
  return ref;
}
