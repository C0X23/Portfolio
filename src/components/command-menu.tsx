"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Laptop, Moon, Sun, User, Briefcase, FileText, Code, Mail, Search, Coffee, Terminal, RotateCcw, Tv, Cat, Film, Globe, Monitor, Sparkles } from "lucide-react";

// Easter Eggs Functions
const easterEggs = {
  // Mode Hacker - sudo hire me
  hackerMode: () => {
    const overlay = document.createElement("div");
    overlay.id = "hacker-overlay";
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 99999; background: #0a0a0a;
      font-family: 'Courier New', monospace; color: #22c55e; padding: 40px;
      overflow: hidden; font-size: 16px; line-height: 1.8; cursor: pointer;
    `;
    document.body.appendChild(overlay);
    
    const lines = [
      { text: "$ sudo hire me", color: "#a855f7" },
      { text: "[sudo] password for recruiter: ********", color: "#22c55e" },
      { text: "Authenticating...", color: "#22c55e" },
      { text: "", color: "" },
      { text: "Access granted.", color: "#4ade80" },
      { text: "", color: "" },
      { text: "$ cat /home/corentin/skills.txt", color: "#a855f7" },
      { text: "", color: "" },
      { text: "  C/C++        [####################] 95%", color: "#22c55e" },
      { text: "  Python       [####################] 95%", color: "#22c55e" },
      { text: "  React        [##################--] 85%", color: "#22c55e" },
      { text: "  TypeScript   [##################--] 85%", color: "#22c55e" },
      { text: "  Next.js      [################----] 80%", color: "#22c55e" },
      { text: "", color: "" },
      { text: "$ ./hire_corentin.sh", color: "#a855f7" },
      { text: "", color: "" },
      { text: "Initializing hiring sequence...", color: "#22c55e" },
      { text: "[OK] Skills verified", color: "#4ade80" },
      { text: "[OK] Motivation: 100%", color: "#4ade80" },
      { text: "[OK] Coffee dependency: Maximum", color: "#4ade80" },
      { text: "[OK] Available: Yes", color: "#4ade80" },
      { text: "", color: "" },
      { text: "HIRE SUCCESSFUL!", color: "#facc15", bold: true, big: true },
      { text: "", color: "" },
      { text: "Contact: megret.corentin@gmail.com", color: "#60a5fa" },
    ];
    
    const output = document.createElement("div");
    overlay.appendChild(output);
    
    const cursor = document.createElement("span");
    cursor.textContent = "█";
    cursor.style.cssText = "animation: blink 1s infinite; color: #22c55e;";
    const style = document.createElement("style");
    style.textContent = `@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }`;
    document.head.appendChild(style);
    
    // Typing sound
    // Typing sound - preload before starting
    const typingSound = new Audio("/sounds/typing-keyboard.mp3");
    typingSound.volume = 0.5;
    typingSound.loop = true;
    typingSound.preload = "auto";
    
    let lineIndex = 0;
    let charIndex = 0;
    let currentSpan: HTMLSpanElement | null = null;
    let isTyping = true;
    let started = false;
    
    const typeChar = () => {
      if (!isTyping) return;
      
      if (lineIndex >= lines.length) {
        // Done typing
        typingSound.pause();
        output.appendChild(cursor);
        setTimeout(() => { 
          if (overlay.parentNode) {
            overlay.remove(); 
            style.remove(); 
          }
        }, 3000);
        return;
      }
      
      const line = lines[lineIndex];
      
      // Empty line - just add break and move to next line
      if (line.text === "") {
        output.innerHTML += "<br>";
        lineIndex++;
        charIndex = 0;
        currentSpan = null;
        setTimeout(typeChar, 50);
        return;
      }
      
      // Start of a new line - create span
      if (charIndex === 0) {
        currentSpan = document.createElement("span");
        currentSpan.style.color = line.color;
        if (line.bold) currentSpan.style.fontWeight = "bold";
        if (line.big) currentSpan.style.fontSize = "20px";
        output.appendChild(currentSpan);
        
        // Start typing sound at random position
        if (typingSound.duration) {
          typingSound.currentTime = Math.random() * (typingSound.duration - 1);
        }
        typingSound.play().catch(() => {});
      }
      
      // Type one character
      if (currentSpan && charIndex < line.text.length) {
        currentSpan.textContent += line.text[charIndex];
        charIndex++;
        overlay.scrollTop = overlay.scrollHeight;
        
        // Random delay for realism (20-50ms)
        const delay = Math.floor(Math.random() * 30) + 20;
        setTimeout(typeChar, delay);
      } else {
        // End of line
        typingSound.pause();
        output.innerHTML += "<br>";
        lineIndex++;
        charIndex = 0;
        currentSpan = null;
        
        // Pause between lines (100-200ms)
        setTimeout(typeChar, Math.floor(Math.random() * 100) + 100);
      }
    };
    
    // Start typing once sound is loaded
    const startTyping = () => {
      if (started) return;
      started = true;
      typeChar();
    };
    
    typingSound.addEventListener("canplaythrough", startTyping, { once: true });
    // Fallback timeout if sound takes too long
    setTimeout(startTyping, 300);
    
    overlay.onclick = () => { 
      isTyping = false;
      typingSound.pause();
      overlay.remove(); 
      style.remove(); 
    };
  },

  // Coffee - animation de remplissage
  coffee: () => {
    const container = document.createElement("div");
    container.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(0,0,0,0.8); display: flex; flex-direction: column;
      align-items: center; justify-content: center; font-family: system-ui;
    `;
    container.innerHTML = `
      <div style="position: relative; width: 120px; height: 150px;">
        <div style="position: absolute; bottom: 0; left: 10px; right: 10px; height: 0; background: linear-gradient(to top, #78350f, #92400e); border-radius: 0 0 10px 10px; animation: fillCoffee 2s ease-out forwards;"></div>
        <div style="position: absolute; inset: 0; border: 6px solid #d6d3d1; border-radius: 0 0 20px 20px; border-top: none;"></div>
        <div style="position: absolute; top: 20px; right: -30px; width: 30px; height: 50px; border: 6px solid #d6d3d1; border-left: none; border-radius: 0 20px 20px 0;"></div>
      </div>
      <p style="color: #fafaf9; margin-top: 30px; font-size: 18px;">Rechargement en cours...</p>
      <p style="color: #78716c; margin-top: 10px; font-size: 14px;">Niveau de caféine: <span id="coffee-level">0</span>%</p>
    `;
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fillCoffee {
        0% { height: 0; }
        100% { height: 120px; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(container);
    
    // Pouring coffee sound
    const pouringSound = new Audio("/sounds/pouring-coffee.mp3");
    pouringSound.volume = 0.5;
    pouringSound.play().catch(() => {});
    
    let level = 0;
    const levelEl = container.querySelector("#coffee-level");
    const interval = setInterval(() => {
      level += 2;
      if (levelEl) levelEl.textContent = String(Math.min(level, 100));
      if (level >= 100) clearInterval(interval);
    }, 40);
    
    setTimeout(() => { container.remove(); style.remove(); pouringSound.pause(); }, 3000);
    container.onclick = () => { container.remove(); style.remove(); clearInterval(interval); pouringSound.pause(); };
  },

  // Flip the page
  flip: () => {
    document.body.style.transition = "transform 1s ease-in-out";
    document.body.style.transform = "rotateY(360deg)";
    setTimeout(() => {
      document.body.style.transform = "";
      setTimeout(() => { document.body.style.transition = ""; }, 100);
    }, 1000);
  },

  // Retro CRT mode
  retro: () => {
    const style = document.createElement("style");
    style.id = "retro-style";
    style.textContent = `
      body::before {
        content: ""; position: fixed; inset: 0; z-index: 99998;
        background: repeating-linear-gradient(
          0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px,
          transparent 1px, transparent 2px
        );
        pointer-events: none;
      }
      body::after {
        content: ""; position: fixed; inset: 0; z-index: 99997;
        background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%);
        pointer-events: none;
      }
      * { 
        image-rendering: pixelated !important;
        font-family: 'Courier New', monospace !important;
      }
    `;
    document.head.appendChild(style);
    setTimeout(() => style.remove(), 8000);
  },

  // Nyan Cat - vrai GIF
  nyanCat: () => {
    const container = document.createElement("div");
    container.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: #003366; overflow: hidden;
    `;
    
    // Rainbow trail
    const rainbow = document.createElement("div");
    rainbow.style.cssText = `
      position: absolute; top: 50%; left: 0; right: 50%;
      transform: translateY(-50%); height: 80px;
      background: linear-gradient(to bottom,
        #ff0000 0%, #ff0000 16.66%,
        #ff9900 16.66%, #ff9900 33.32%,
        #ffff00 33.32%, #ffff00 49.98%,
        #33ff00 49.98%, #33ff00 66.64%,
        #0099ff 66.64%, #0099ff 83.3%,
        #6633ff 83.3%, #6633ff 100%
      );
      animation: rainbowMove 4s linear forwards;
    `;
    
    // Nyan cat GIF
    const nyan = document.createElement("img");
    nyan.src = "https://media.tenor.com/Xpek5iXaRjMAAAAi/nyan-cat-rainbow.gif";
    nyan.style.cssText = `
      position: absolute; top: 50%; left: -200px;
      transform: translateY(-50%); height: 100px; width: auto;
      animation: nyanMove 4s linear forwards;
      image-rendering: pixelated;
    `;
    
    const style = document.createElement("style");
    style.textContent = `
      @keyframes nyanMove {
        0% { left: -200px; }
        100% { left: calc(100% + 200px); }
      }
      @keyframes rainbowMove {
        0% { right: 100%; }
        100% { right: -100%; }
      }
    `;
    
    document.head.appendChild(style);
    container.appendChild(rainbow);
    container.appendChild(nyan);
    document.body.appendChild(container);
    
    container.onclick = () => { container.remove(); style.remove(); };
    setTimeout(() => { container.remove(); style.remove(); }, 4000);
  },

  // Who Am I
  whoami: () => {
    const modal = document.createElement("div");
    modal.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(0,0,0,0.85); display: flex;
      align-items: center; justify-content: center;
      animation: fadeIn 0.3s ease;
    `;
    modal.innerHTML = `
      <div style="background: linear-gradient(135deg, #1c1917 0%, #292524 100%); color: #fafaf9; padding: 40px; border-radius: 20px; max-width: 420px; text-align: center; font-family: system-ui; border: 1px solid #3f3f46; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
        <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: linear-gradient(135deg, #78716c, #a8a29e); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1c1917" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <h2 style="font-size: 26px; margin-bottom: 8px; font-weight: 700;">Corentin Megret</h2>
        <p style="color: #a8a29e; margin-bottom: 20px; font-size: 15px;">Full Stack Developer</p>
        <div style="background: #0a0a0a; border-radius: 12px; padding: 16px; margin-bottom: 20px; text-align: left; font-family: 'Courier New', monospace; font-size: 13px; color: #22c55e;">
          <p style="margin: 0 0 8px 0;"><span style="color: #a855f7;">$</span> whoami</p>
          <p style="margin: 0; color: #d6d3d1;">Passionné de code, fan de 42, amateur de clean code et de café. Transforme les specs en features depuis 2021.</p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" style="padding: 12px 32px; background: #fafaf9; color: #1c1917; border: none; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 15px; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          Fermer
        </button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  },

  // Credits
  credits: () => {
    const credits = document.createElement("div");
    credits.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: #000; color: #fafaf9; overflow: hidden;
      font-family: system-ui; text-align: center;
      cursor: pointer;
    `;
    credits.innerHTML = `
      <div id="credits-scroll" style="position: absolute; width: 100%; animation: creditsRoll 12s linear forwards;">
        <div style="height: 100vh;"></div>
        <h1 style="font-size: 36px; margin-bottom: 50px; font-weight: 300; letter-spacing: 8px;">CREDITS</h1>
        <p style="color: #78716c; margin-bottom: 50px; font-size: 14px; text-transform: uppercase; letter-spacing: 4px;">Un portfolio propulsé par</p>
        <div style="font-size: 22px; line-height: 3;">
          <p style="color: #61dafb;">React & Next.js</p>
          <p style="color: #3178c6;">TypeScript</p>
          <p style="color: #06b6d4;">Tailwind CSS</p>
          <p style="color: #f472b6;">Framer Motion</p>
          <p style="color: #22c55e;">next-intl</p>
          <p style="color: #a855f7;">Lenis Smooth Scroll</p>
          <p style="color: #f59e0b;">cmdk</p>
          <p style="color: #ffffff;">Vercel</p>
        </div>
        <div style="margin-top: 80px; color: #78716c; font-size: 14px;">
          <p>Développé avec passion</p>
          <p style="margin-top: 30px; font-size: 18px; color: #fafaf9;">par Corentin Megret</p>
        </div>
        <p style="margin-top: 50px; font-size: 12px; color: #3f3f46;">2026</p>
        <div style="height: 100vh;"></div>
      </div>
    `;
    const style = document.createElement("style");
    style.textContent = `
      @keyframes creditsRoll {
        0% { transform: translateY(0); }
        100% { transform: translateY(-100%); }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(credits);
    credits.onclick = () => { credits.remove(); style.remove(); };
    setTimeout(() => { credits.remove(); style.remove(); }, 12000);
  },

  // Hello World
  helloWorld: () => {
    const languages = [
      { lang: "Python", code: 'print("Hello, World!")' },
      { lang: "JavaScript", code: 'console.log("Hello, World!");' },
      { lang: "C", code: 'printf("Hello, World!");' },
      { lang: "C++", code: 'std::cout << "Hello, World!";' },
      { lang: "Java", code: 'System.out.println("Hello, World!");' },
      { lang: "Rust", code: 'println!("Hello, World!");' },
      { lang: "Go", code: 'fmt.Println("Hello, World!")' },
      { lang: "Ruby", code: 'puts "Hello, World!"' },
    ];
    const random = languages[Math.floor(Math.random() * languages.length)];
    const toast = document.createElement("div");
    toast.style.cssText = `
      position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
      background: #1c1917; color: #fafaf9; padding: 16px 24px;
      border-radius: 12px; z-index: 99999; font-family: 'Courier New', monospace;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3); animation: slideUp 0.3s ease;
    `;
    toast.innerHTML = `<span style="color: #78716c;">${random.lang}:</span> <span style="color: #4ade80;">${random.code}</span>`;
    const style = document.createElement("style");
    style.textContent = `@keyframes slideUp { from { transform: translateX(-50%) translateY(20px); opacity: 0; } }`;
    document.head.appendChild(style);
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); style.remove(); }, 3000);
  },

  // Windows XP Sound
  xpSound: () => {
    const willCrash = Math.random() < 0.3; // 30% de chance de crash
    const crashPercent = willCrash ? Math.floor(Math.random() * 50) + 40 : 999; // Crash entre 40% et 90%
    let currentPercent = 0;
    let crashed = false;
    
    const modal = document.createElement("div");
    modal.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: #000; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
    `;
    modal.innerHTML = `
      <div style="text-align: center;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 30px;">
          <div style="width: 48px; height: 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 3px;">
            <div style="background: #ff0000; border-radius: 2px;"></div>
            <div style="background: #00ff00; border-radius: 2px;"></div>
            <div style="background: #0000ff; border-radius: 2px;"></div>
            <div style="background: #ffff00; border-radius: 2px;"></div>
          </div>
          <div>
            <div style="font-family: 'Franklin Gothic Medium', Tahoma, sans-serif; font-size: 32px; color: white; font-weight: normal; font-style: italic;">Microsoft</div>
            <div style="font-family: 'Franklin Gothic Medium', Tahoma, sans-serif; font-size: 48px; color: white; font-weight: bold; letter-spacing: -2px; margin-top: -8px;">Windows<span style="color: #ff6600; font-size: 28px; vertical-align: super;">XP</span></div>
          </div>
        </div>
        <div style="width: 200px; height: 24px; background: #333; border-radius: 12px; overflow: hidden; margin: 0 auto 15px;">
          <div id="xp-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #0058e6, #3b95ff, #0058e6); transition: width 0.1s; border-radius: 12px;"></div>
        </div>
        <div id="xp-loading" style="display: flex; gap: 8px; justify-content: center; margin-bottom: 20px;">
          <div style="width: 10px; height: 10px; background: #0058e6; border-radius: 50%; animation: xpBounce 0.6s infinite 0s;"></div>
          <div style="width: 10px; height: 10px; background: #0058e6; border-radius: 50%; animation: xpBounce 0.6s infinite 0.1s;"></div>
          <div style="width: 10px; height: 10px; background: #0058e6; border-radius: 50%; animation: xpBounce 0.6s infinite 0.2s;"></div>
        </div>
        <p id="xp-status" style="color: #888; font-family: Tahoma, sans-serif; font-size: 12px; margin: 0;">Chargement de Windows...</p>
        <p id="xp-percent" style="color: #666; font-family: Tahoma, sans-serif; font-size: 11px; margin-top: 8px;">0%</p>
      </div>
    `;
    
    const style = document.createElement("style");
    style.textContent = `
      @keyframes xpBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    const progressBar = modal.querySelector("#xp-progress") as HTMLElement;
    const statusText = modal.querySelector("#xp-status") as HTMLElement;
    const percentText = modal.querySelector("#xp-percent") as HTMLElement;
    const loadingDots = modal.querySelector("#xp-loading") as HTMLElement;
    
    // Play startup sound
    const startupAudio = new Audio("/sounds/windows-xp-startup.wav");
    startupAudio.volume = 0.5;
    startupAudio.play().catch(() => {});
    
    const messages = [
      "Chargement de Windows...",
      "Préparation du bureau...",
      "Chargement des paramètres...",
      "Initialisation des pilotes...",
      "Configuration du réseau...",
      "Chargement des services...",
      "Préparation de votre session..."
    ];
    
    const interval = setInterval(() => {
      if (crashed) return;
      
      currentPercent += Math.floor(Math.random() * 5) + 3;
      
      if (currentPercent >= crashPercent) {
        // CRASH!
        crashed = true;
        clearInterval(interval);
        startupAudio.pause();
        
        const criticalAudio = new Audio("/sounds/windows-xp-critical-stop.wav");
        criticalAudio.volume = 0.6;
        criticalAudio.play();
        
        loadingDots.style.display = "none";
        progressBar.style.background = "#cc0000";
        statusText.style.color = "#ff4444";
        statusText.textContent = "❌ Une erreur fatale s'est produite";
        percentText.textContent = `Erreur à ${currentPercent}%`;
        
        setTimeout(() => {
          modal.remove();
          style.remove();
        }, 2500);
        return;
      }
      
      if (currentPercent >= 100) {
        // Success!
        clearInterval(interval);
        progressBar.style.width = "100%";
        percentText.textContent = "100%";
        loadingDots.style.display = "none";
        statusText.textContent = "✓ Bienvenue dans Windows XP !";
        statusText.style.color = "#4ade80";
        
        setTimeout(() => {
          const shutdownAudio = new Audio("/sounds/windows-xp-shutdown.wav");
          shutdownAudio.volume = 0.5;
          shutdownAudio.play();
          modal.remove();
          style.remove();
        }, 2000);
        return;
      }
      
      progressBar.style.width = currentPercent + "%";
      percentText.textContent = currentPercent + "%";
      statusText.textContent = messages[Math.floor(currentPercent / 15) % messages.length];
    }, 80);
    
    modal.onclick = () => {
      if (!crashed) {
        clearInterval(interval);
        startupAudio.pause();
        const shutdownAudio = new Audio("/sounds/windows-xp-shutdown.wav");
        shutdownAudio.volume = 0.5;
        shutdownAudio.play();
      }
      modal.remove();
      style.remove();
    };
  },

  // Thanos Snap - Disintegration effect
  thanos: () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.style.cssText = `position: fixed; inset: 0; z-index: 99998; pointer-events: none;`;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    // Overlay to hide original content progressively
    const overlay = document.createElement("div");
    overlay.style.cssText = `position: fixed; inset: 0; z-index: 99997; background: var(--background, #fafaf9); opacity: 0; transition: opacity 1s ease;`;
    document.body.appendChild(overlay);

    interface Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      life: number;
      decay: number;
    }

    const particles: Particle[] = [];
    const colors = ["#a8a29e", "#78716c", "#57534e", "#44403c", "#292524", "#1c1917", "#fafaf9", "#f5f5f4"];
    
    // Get text elements and their positions
    const textElements = document.querySelectorAll("h1, h2, h3, h4, p, span, a, button, li");
    const rects: DOMRect[] = [];
    
    textElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0) {
        rects.push(rect);
      }
    });

    // Create particles from text positions
    let particleIndex = 0;
    const createParticles = () => {
      rects.forEach((rect) => {
        const density = Math.min(rect.width * rect.height / 50, 100);
        for (let i = 0; i < density; i++) {
          if (Math.random() > 0.3) continue;
          particles.push({
            x: rect.left + Math.random() * rect.width,
            y: rect.top + Math.random() * rect.height,
            size: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 4,
            vy: -Math.random() * 6 - 2,
            life: 1,
            decay: Math.random() * 0.01 + 0.005,
          });
        }
      });
      particleIndex++;
      if (particleIndex < 20) {
        setTimeout(createParticles, 100);
      }
    };

    // Start disintegration
    setTimeout(() => {
      overlay.style.opacity = "1";
      createParticles();
    }, 200);

    // Animation loop
    let running = true;
    const animate = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.vy -= 0.1; // gravity upward (floating away)
        p.y += p.vy;
        p.life -= p.decay;
        
        if (p.life <= 0 || p.y < -50) {
          particles.splice(i, 1);
          continue;
        }
        
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup after animation
    setTimeout(() => {
      running = false;
      canvas.remove();
      overlay.remove();
    }, 5000);
  },
};

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("CommandMenu");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-stone-950/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0" 
        onClick={() => setOpen(false)} 
      />
      <Command
        className="relative w-full max-w-[640px] overflow-hidden rounded-xl border border-stone-200 bg-white shadow-2xl dark:border-stone-800 dark:bg-stone-950 animate-in zoom-in-95 duration-100"
        loop
      >
        <div className="flex items-center border-b border-stone-200 dark:border-stone-800 px-3" cmdk-input-wrapper="">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <Command.Input
          autoFocus
          placeholder={t("search")}
          className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-stone-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-stone-50"
        />
        <div className="text-xs text-stone-500 border border-stone-200 dark:border-stone-800 rounded px-1.5 py-0.5 select-none">ESC</div>
      </div>
      <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
        <Command.Empty className="py-6 text-center text-sm text-stone-500">
          No results found.
        </Command.Empty>

        <Command.Group heading={t("navigation")} className="text-stone-500 dark:text-stone-400 text-xs font-medium px-2 py-1.5 mb-1 select-none">
          <CommandItem onSelect={() => runCommand(() => window.location.hash = "#about")}>
            <User className="mr-2 h-4 w-4" />
            <span>About</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.hash = "#timeline")}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Timeline</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.hash = "#projects")}>
            <Code className="mr-2 h-4 w-4" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.hash = "#skills")}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Skills</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.hash = "#contact")}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Contact</span>
          </CommandItem>
        </Command.Group>

        <Command.Group heading={t("theme")} className="text-stone-500 dark:text-stone-400 text-xs font-medium px-2 py-1.5 mb-1 mt-2 select-none">
          <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
            <Sun className="mr-2 h-4 w-4" />
            <span>{t("light")}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
            <Moon className="mr-2 h-4 w-4" />
            <span>{t("dark")}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
            <Laptop className="mr-2 h-4 w-4" />
            <span>{t("system")}</span>
          </CommandItem>
        </Command.Group>

        <Command.Group heading={t("lang")} className="text-stone-500 dark:text-stone-400 text-xs font-medium px-2 py-1.5 mb-1 mt-2 select-none">
          <CommandItem onSelect={() => runCommand(() => router.replace(pathname, { locale: 'fr' }))}>
             <span className="mr-2 flex h-4 w-4 items-center justify-center font-bold text-xs uppercase">FR</span>
            <span>{t("fr")}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.replace(pathname, { locale: 'en' }))}>
            <span className="mr-2 flex h-4 w-4 items-center justify-center font-bold text-xs uppercase">EN</span>
            <span>{t("en")}</span>
          </CommandItem>
        </Command.Group>

        <Command.Group heading="Easter Eggs" className="text-stone-500 dark:text-stone-400 text-xs font-medium px-2 py-1.5 mb-1 mt-2 select-none">
          <CommandItem onSelect={() => runCommand(() => easterEggs.hackerMode())}>
            <Terminal className="mr-2 h-4 w-4" />
            <span>sudo hire me</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => easterEggs.coffee())}>
            <Coffee className="mr-2 h-4 w-4" />
            <span>coffee</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => easterEggs.flip())}>
            <RotateCcw className="mr-2 h-4 w-4" />
            <span>flip</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => easterEggs.retro())}>
            <Tv className="mr-2 h-4 w-4" />
            <span>retro</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => easterEggs.nyanCat())}>
            <Cat className="mr-2 h-4 w-4" />
            <span>nyan</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => easterEggs.whoami())}>
            <User className="mr-2 h-4 w-4" />
            <span>whoami</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => easterEggs.credits())}>
            <Film className="mr-2 h-4 w-4" />
            <span>credits</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => easterEggs.helloWorld())}>
            <Globe className="mr-2 h-4 w-4" />
            <span>hello</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => easterEggs.xpSound())}>
            <Monitor className="mr-2 h-4 w-4" />
            <span>xp</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => easterEggs.thanos())}>
            <Sparkles className="mr-2 h-4 w-4" />
            <span>thanos</span>
          </CommandItem>
        </Command.Group>
      </Command.List>
      </Command>
    </div>
  );
}

function CommandItem({ children, onSelect }: { children: React.ReactNode, onSelect: () => void }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-stone-100 dark:aria-selected:bg-stone-800 text-stone-900 dark:text-stone-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
    >
      {children}
    </Command.Item>
  );
}
