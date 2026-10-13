
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function useScene(
  build: (root: HTMLElement, q: (s: string) => Element[]) => void
) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      build(ref.current, gsap.utils.selector(ref));
    },
    { scope: ref }
  );

  return ref;
}
