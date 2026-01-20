import dynamic from "next/dynamic";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

// Lazy load below-the-fold components to improve FCP/LCP
const Timeline = dynamic(() => import("@/components/Timeline").then(mod => ({ default: mod.Timeline })));
const Projects = dynamic(() => import("@/components/Projects").then(mod => ({ default: mod.Projects })));
const Skills = dynamic(() => import("@/components/Skills").then(mod => ({ default: mod.Skills })));
const Contact = dynamic(() => import("@/components/Contact").then(mod => ({ default: mod.Contact })));

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 selection:bg-stone-900 selection:text-white">
      <Navigation />
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
