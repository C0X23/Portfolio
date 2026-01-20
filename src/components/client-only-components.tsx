"use client";

import dynamic from "next/dynamic";

// Lazy load non-critical components to improve FCP/LCP
// These components are loaded only on the client side after hydration
const SmoothScroll = dynamic(
  () => import("@/components/smooth-scroll").then((mod) => ({ default: mod.SmoothScroll })),
  { ssr: false }
);

const CommandMenu = dynamic(
  () => import("@/components/command-menu").then((mod) => ({ default: mod.CommandMenu })),
  { ssr: false }
);

const MouseFollower = dynamic(
  () => import("@/components/mouse-follower").then((mod) => ({ default: mod.MouseFollower })),
  { ssr: false }
);

export function ClientOnlyComponents() {
  return (
    <>
      <SmoothScroll />
      <MouseFollower />
      <CommandMenu />
    </>
  );
}
