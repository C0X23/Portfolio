"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MouseFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Reduced spring effect for snappier follow
  const springConfig = { damping: 50, stiffness: 500 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on desktop
    const checkMedia = () => {
        if (window.matchMedia("(pointer: fine)").matches) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    
    checkMedia();
    window.addEventListener("resize", checkMedia);
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Center the cursor (w-8 = 32px / 2 = 16)
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("resize", checkMedia);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-stone-800 dark:border-stone-200 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    >
       <div className="w-1.5 h-1.5 bg-stone-800 dark:bg-stone-200 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  );
}
