"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

// Exporter l'instance Lenis globalement pour pouvoir la contrôler
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);

  return null;
}
