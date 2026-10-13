
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function useScene<T extends HTMLElement>(
  build: (root: T, q: (s: string) => Element[]) => void
) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      build(ref.current, gsap.utils.selector(ref));
    },
    { scope: ref }
  );

  return ref;
}
