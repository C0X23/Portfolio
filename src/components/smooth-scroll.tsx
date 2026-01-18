"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

// Exporter l'instance Lenis globalement pour pouvoir la contrôler
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

// Variable pour contrôler la vitesse du scroll automatique (en secondes)
const SCROLL_DURATION = 2.5;

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Configuration par défaut pour le scroll manuel (naturel)
    const lenis = new Lenis();

    lenisRef.current = lenis;
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Intercepter les clics sur les liens d'ancre pour utiliser le scroll Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href?.startsWith("#")) {
          e.preventDefault();
          
          if (href === "#") {
              lenis.scrollTo(0, {
                duration: SCROLL_DURATION,
                easing: (t) => 1 - Math.pow(1 - t, 4), // EaseOutQuart
              });
              return;
          }

          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
              // Custom duration and easing ONLY for anchor clicks
              lenis.scrollTo(targetElement, {
                duration: SCROLL_DURATION,
                easing: (t) => 1 - Math.pow(1 - t, 4), // EaseOutQuart
              });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      window.lenis = undefined;
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return null;
}
