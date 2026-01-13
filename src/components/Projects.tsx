"use client";

import { motion, useMotionValue, useAnimationFrame, animate } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const projectsFallback = [
  {
    title: "Gestion SAV - Arcom",
    key: "arcom_desc",
    tags: ["Python", "Django", "Web", "Automation", "SQL"],
    image: "/images/project-arcom.jpg",
    link: "https://github.com/C0X23/Arcom",
    github: "https://github.com/C0X23/Arcom"
  },
  {
    title: "Minishell",
    key: "minishell_desc",
    tags: ["C", "System", "Unix", "Bash"],
    image: "/images/project-minishell.jpg",
    link: "https://github.com/C0X23/Minishell",
    github: "https://github.com/C0X23/Minishell"
  },
  {
    title: "Cub3D (Raycasting)",
    key: "cub3d_desc",
    tags: ["C", "Graphics", "Maths", "Game Dev"],
    image: "/images/project-cub3d.jpg",
    link: "https://github.com/C0X23/42-School-V2",
    github: "https://github.com/C0X23/42-School-V2"
  },
  {
    title: "Philosophers",
    key: "philosophers_desc",
    tags: ["C", "Threads", "Concurrency", "Algorithm"],
    image: "/images/project-philosophers.jpg",
    link: "https://github.com/C0X23/42-School-V2",
    github: "https://github.com/C0X23/42-School-V2"
  }
];

export function Projects() {
  const t = useTranslations("Projects");

  // Re-map with translations
  const projects = projectsFallback.map(p => ({
     ...p,
     description: t(p.key)
  }));

  // Tripler les projets pour l'effet infini (maintenant à l'intérieur du composant pour avoir les traductions)
  const duplicatedProjects = [...projects, ...projects, ...projects];

  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  // Timer référence pour reprendre le scroll
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (carouselRef.current) {
      // La largeur d'un set de projets (1/3 du total car triplé)
      // On soustrait un gap à la fin pour la précision si besoin, 
      // mais ici diviser par 3 suffit pour le reset point
      const measure = () => {
         if (carouselRef.current) {
            setCarouselWidth(carouselRef.current.scrollWidth / 3);
         }
      };
      
      measure();
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
  }, []);

  const pauseInteraction = () => {
    setIsPaused(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000); // Reprend après 2 secondes
  };

  const handleDragStart = () => {
    setIsDragging(true);
    pauseInteraction();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    pauseInteraction();
  };

  useAnimationFrame((time, delta) => {
    if (!isPaused && !isDragging && carouselWidth > 0) {
      // Vitesse : px par seconde. Ajuster -50 pour plus rapide ou plus lent
      const moveBy = -40 * (delta / 1000); 
      let newX = x.get() + moveBy;

      // Gestion de la boucle infinie
      // Si on est allé trop à gauche (plus loin que la largeur d'un set)
      if (newX <= -carouselWidth) {
        newX += carouselWidth;
      }
      // Si on est allé trop à droite (positif)
      else if (newX > 0) {
        newX -= carouselWidth;
      }

      x.set(newX);
    }
  });

  const scrollManual = (direction: "left" | "right") => {
    pauseInteraction();
    const currentX = x.get();
    const cardWidth = 430; // 380px (carte) + 32px (gap) + marge approx
    const targetX = direction === "left" ? currentX + cardWidth : currentX - cardWidth;
    
    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30
    });
  };

  return (
    <section id="projects" className="py-24 bg-white dark:bg-stone-900 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-stone-900 to-stone-500 dark:from-stone-100 dark:to-stone-400 mb-4">
              {t("title")}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 max-w-xl">
              {t("subtitle")}
            </p>
          </div>
          
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => scrollManual("left")}
              className="p-3 rounded-full border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scrollManual("right")}
              className="p-3 rounded-full border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>

        {/* Carousel Container */}
        <div 
            ref={containerRef}
            className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => { if (!isDragging) setIsPaused(false); }}
        >
          <motion.div 
            ref={carouselRef}
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -10000, right: 10000 }} // Pas de contrainte réelle
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="flex gap-8 pb-8 w-max"
          >
            {duplicatedProjects.map((project, index) => (
              <ProjectCard key={`${project.title}-${index}`} project={project} t={t} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface Project {
  title: string;
  key: string;
  tags: string[];
  image: string;
  link?: string;
  github?: string;
  demo?: string;
  description?: string;
}

function ProjectCard({ project, t }: { project: Project; t: ReturnType<typeof useTranslations> }) {
  return (
    <motion.div
      className="w-[85vw] md:w-[380px] shrink-0 relative rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 overflow-hidden hover:border-stone-300 dark:hover:border-stone-700 shadow-sm hover:shadow-md transition-all select-none"
    >
      <div className="aspect-video w-full bg-stone-100 dark:bg-stone-800 relative overflow-hidden group hover:border-b border-stone-200 dark:border-stone-700 transition-colors pointer-events-none">
        {/* Background Blur Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            className="object-cover opacity-20 blur-xl scale-110"
            draggable={false}
          />
        </div>
        
        {/* Main Image */}
        <div className="relative z-10 w-full h-full p-4"> 
           <Image 
            src={project.image} 
            alt={project.title}
            fill
            className="object-contain transition-transform duration-500 hover:scale-105 drop-shadow-2xl"
            draggable={false}
          />
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag: string) => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 font-medium">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-stone-600 dark:text-stone-400 text-sm mb-6 line-clamp-3">
          {project.description}
        </p>

        <div className="flex items-center gap-4">
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-sm font-medium text-stone-900 dark:text-stone-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors z-20 cursor-pointer"
            onPointerDown={(e) => e.stopPropagation()} // Empêcher le drag quand on clique sur le lien
          >
            <ExternalLink className="w-4 h-4 mr-2" /> {t("demo")}
          </a>
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors z-20 cursor-pointer"
            onPointerDown={(e) => e.stopPropagation()} // Empêcher le drag quand on clique sur le lien
          >
            <Github className="w-4 h-4 mr-2" /> {t("code")}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
