"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in-up" | "fade-in-left" | "fade-in-right";
  delay?: number;
  threshold?: number;
}

export function AnimateOnScroll({
  children,
  className = "",
  animation = "fade-in-up",
  delay = 0,
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? `animate-${animation}` : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
