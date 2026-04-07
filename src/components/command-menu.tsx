"use client";

import * as React from "react";
import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Laptop, Moon, Sun, User, Briefcase, FileText, Code, Mail, Search, Coffee, Terminal, RotateCcw, Tv, Film, Globe, Monitor, Sparkles } from "lucide-react";

// Easter Eggs Functions
const easterEggs = {
  // Mode Hacker - sudo hire me
  hackerMode: (t: (key: string) => string) => {
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
      { text: t("hacker_authenticating"), color: "#22c55e" },
      { text: "", color: "" },
      { text: t("hacker_access_granted"), color: "#4ade80" },
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
      { text: t("hacker_init"), color: "#22c55e" },
      { text: t("hacker_skills_verified"), color: "#4ade80" },
      { text: t("hacker_motivation"), color: "#4ade80" },
      { text: t("hacker_coffee_dep"), color: "#4ade80" },
      { text: t("hacker_available"), color: "#4ade80" },
      { text: "", color: "" },
      { text: t("hacker_success"), color: "#facc15", bold: true, big: true },
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
  coffee: (t: (key: string) => string) => {
    const container = document.createElement("div");
    container.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(12, 10, 9, 0.92); backdrop-filter: blur(8px);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center; font-family: system-ui;
      opacity: 1; transition: opacity 0.4s ease; cursor: pointer;
    `;

    container.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; gap:20px; max-width:300px; width:100%; padding: 0 24px;">

        <!-- Header -->
        <div style="text-align:center;">
          <p style="color:#a8a29e; font-size:10px; letter-spacing:0.25em; text-transform:uppercase; margin:0 0 6px 0;">${t("coffee_label")}</p>
          <p id="coffee-status" style="color:#fafaf9; font-size:20px; font-weight:600; margin:0; transition: all 0.4s ease;">${t("coffee_status_0")}</p>
        </div>

        <!-- Cup wrapper -->
        <div style="position:relative; width:130px; height:175px;">

          <!-- Steam -->
          <div id="steam-container" style="position:absolute; top:-36px; left:0; right:0; height:40px; opacity:0; transition:opacity 1s ease;">
            <div style="position:absolute; left:22px; width:8px; height:28px; background:linear-gradient(to top,rgba(250,250,249,0.35),transparent); border-radius:6px 6px 0 0; animation:steamRise 2.4s ease-in-out infinite;"></div>
            <div style="position:absolute; left:52px; width:8px; height:28px; background:linear-gradient(to top,rgba(250,250,249,0.35),transparent); border-radius:6px 6px 0 0; animation:steamRise 2.4s ease-in-out 0.8s infinite;"></div>
            <div style="position:absolute; left:82px; width:8px; height:28px; background:linear-gradient(to top,rgba(250,250,249,0.35),transparent); border-radius:6px 6px 0 0; animation:steamRise 2.4s ease-in-out 1.6s infinite;"></div>
          </div>

          <!-- Saucer -->
          <div style="position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:148px; height:13px; background:#1c1917; border-radius:50%; box-shadow:0 3px 10px rgba(0,0,0,0.5);"></div>

          <!-- Cup body -->
          <div id="cup-body" style="position:absolute; bottom:12px; left:8px; right:8px; height:145px; border:5px solid #44403c; border-radius:8px 8px 28px 28px; overflow:hidden; transition: box-shadow 0.6s ease;">
            <!-- Coffee liquid -->
            <div id="coffee-fill" style="position:absolute; bottom:0; left:0; right:0; height:0%; background:linear-gradient(to top,#78350f 0%,#92400e 55%,#b45309 100%); transition:height 0.04s linear;"></div>
            <!-- Shine -->
            <div style="position:absolute; top:12px; left:10px; width:7px; height:32px; background:rgba(255,255,255,0.07); border-radius:4px;"></div>
          </div>

          <!-- Handle -->
          <div style="position:absolute; bottom:42px; right:-20px; width:26px; height:48px; border:5px solid #44403c; border-left:none; border-radius:0 18px 18px 0;"></div>
        </div>

        <!-- Progress bar -->
        <div style="width:100%;">
          <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <span style="color:#78716c; font-size:11px; letter-spacing:0.05em;">${t("coffee_caffeine")}</span>
            <span style="color:#d6d3d1; font-size:13px; font-weight:600;"><span id="coffee-level">0</span>%</span>
          </div>
          <div style="width:100%; height:4px; background:#292524; border-radius:2px; overflow:hidden;">
            <div id="progress-bar" style="height:100%; width:0%; background:linear-gradient(to right,#78350f,#b45309,#f59e0b); border-radius:2px; transition:width 0.04s linear;"></div>
          </div>
        </div>

        <!-- Dev stats (visibles à 100%) -->
        <div id="dev-stats" style="opacity:0; transition:opacity 0.8s ease; width:100%; background:rgba(28,25,23,0.9); border:1px solid #292524; border-radius:10px; padding:12px 16px; display:flex; flex-direction:column; gap:7px;">
          <p style="color:#a8a29e; font-size:10px; letter-spacing:0.2em; text-transform:uppercase; margin:0 0 2px 0;">${t("coffee_recharged")}</p>
          <div style="display:flex; justify-content:space-between;"><span style="color:#78716c; font-size:12px;">${t("coffee_concentration")}</span><span style="color:#4ade80; font-size:12px; font-weight:600;">+∞</span></div>
          <div style="display:flex; justify-content:space-between;"><span style="color:#78716c; font-size:12px;">${t("coffee_bugs")}</span><span style="color:#4ade80; font-size:12px; font-weight:600;">+87%</span></div>
          <div style="display:flex; justify-content:space-between;"><span style="color:#78716c; font-size:12px;">${t("coffee_typing")}</span><span style="color:#4ade80; font-size:12px; font-weight:600;">+340 wpm</span></div>
          <div style="display:flex; justify-content:space-between;"><span style="color:#78716c; font-size:12px;">${t("coffee_meetings")}</span><span style="color:#4ade80; font-size:12px; font-weight:600;">${t("coffee_meetings_value")}</span></div>
        </div>

        <p style="color:#44403c; font-size:11px; margin:0;">${t("coffee_dismiss")}</p>
      </div>
    `;

    const style = document.createElement("style");
    style.textContent = `
      @keyframes steamRise {
        0%   { transform: translateY(0)    scaleX(1);   opacity: 0.7; }
        50%  { transform: translateY(-14px) scaleX(1.5); opacity: 0.35; }
        100% { transform: translateY(-28px) scaleX(0.7); opacity: 0; }
      }
      @keyframes cupGlow {
        0%, 100% { box-shadow: 0 0 0   0   rgba(180,83,9,0); }
        50%       { box-shadow: 0 0 22px 6px rgba(180,83,9,0.3); }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(container);

    const pouringSound = new Audio("/sounds/pouring-coffee.mp3");
    pouringSound.volume = 0.5;
    pouringSound.play().catch(() => {});

    const statusMessages: [number, string][] = [
      [0,  t("coffee_status_0")],
      [25, t("coffee_status_25")],
      [50, t("coffee_status_50")],
      [75, t("coffee_status_75")],
      [100, t("coffee_status_100")],
    ];

    let level = 0;
    const levelEl   = container.querySelector("#coffee-level");
    const fillEl    = container.querySelector<HTMLElement>("#coffee-fill");
    const progressEl= container.querySelector<HTMLElement>("#progress-bar");
    const statusEl  = container.querySelector<HTMLElement>("#coffee-status");
    const steamEl   = container.querySelector<HTMLElement>("#steam-container");
    const statsEl   = container.querySelector<HTMLElement>("#dev-stats");
    const cupBodyEl = container.querySelector<HTMLElement>("#cup-body");

    const interval = setInterval(() => {
      level = Math.min(level + 1, 100);
      if (levelEl)    levelEl.textContent = String(level);
      if (fillEl)     fillEl.style.height = `${level}%`;
      if (progressEl) progressEl.style.width = `${level}%`;

      // Status message
      for (let i = statusMessages.length - 1; i >= 0; i--) {
        if (level >= statusMessages[i][0] && statusEl) {
          statusEl.textContent = statusMessages[i][1];
          break;
        }
      }

      // Steam à 50%
      if (level >= 50 && steamEl) steamEl.style.opacity = "1";

      if (level >= 100) {
        clearInterval(interval);
        if (statsEl)   statsEl.style.opacity = "1";
        if (cupBodyEl) cupBodyEl.style.animation = "cupGlow 1.5s ease-in-out infinite";
        setTimeout(dismiss, 4000);
      }
    }, 25);

    const dismiss = () => {
      clearInterval(interval);
      pouringSound.pause();
      container.style.opacity = "0";
      setTimeout(() => { container.remove(); style.remove(); }, 400);
    };

    container.onclick = dismiss;
    setTimeout(() => { if (document.body.contains(container)) dismiss(); }, 9000);
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

  // Who Am I
  whoami: (t: (key: string) => string) => {
    const win = document.createElement("div");
    win.style.cssText = `
      position: fixed; bottom: 32px; right: 32px; z-index: 99999;
      width: 420px; background: #0d0d0d; border: 1px solid #2a2a2a;
      border-radius: 8px; font-family: 'Courier New', monospace;
      font-size: 13px; color: #d4d4d4; overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.6);
      animation: whoamiSlideIn 0.25s cubic-bezier(0.16,1,0.3,1) forwards;
    `;

    win.innerHTML = `
      <!-- Title bar -->
      <div style="display:flex; align-items:center; gap:6px; padding:10px 14px; background:#1a1a1a; border-bottom:1px solid #2a2a2a;">
        <div style="width:11px;height:11px;border-radius:50%;background:#ff5f56;"></div>
        <div style="width:11px;height:11px;border-radius:50%;background:#ffbd2e;"></div>
        <div style="width:11px;height:11px;border-radius:50%;background:#27c93f;"></div>
        <span style="margin-left:8px; color:#555; font-size:11px;">corentin@portfolio</span>
      </div>
      <!-- Terminal body -->
      <div style="padding:16px 18px; line-height:1.9;">
        <p style="margin:0; color:#6b7280;">corentin@portfolio:~$</p>
        <p style="margin:0; color:#e5e7eb;"><span style="color:#22d3ee;">uid</span>=1337(<span style="color:#a78bfa;">corentin</span>) <span style="color:#22d3ee;">gid</span>=42(42-school)</p>
        <p style="margin:0; color:#e5e7eb;"><span style="color:#22d3ee;">groups</span>=${t("whoami_groups")}</p>
        <p style="margin:0 0 4px; color:#555;">──────────────────────────────</p>
        <p style="margin:0; color:#6b7280;">corentin@portfolio:~$ cat .aboutme</p>
        <p style="margin:0; color:#e5e7eb;">${t("whoami_description")}</p>
        <p style="margin:0 0 4px; color:#555;">──────────────────────────────</p>
        <p style="margin:0; color:#6b7280;">corentin@portfolio:~$ uptime</p>
        <p style="margin:0; color:#e5e7eb;">${t("whoami_uptime")}</p>
        <p style="margin:12px 0 0; color:#374151; font-size:11px;">${t("whoami_close")}</p>
      </div>
    `;

    const style = document.createElement("style");
    style.textContent = `
      @keyframes whoamiSlideIn {
        from { transform: translateY(20px); opacity: 0; }
        to   { transform: translateY(0);    opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(win);

    const dismiss = () => { win.remove(); style.remove(); document.removeEventListener("keydown", onKey); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    win.onclick = dismiss;
    document.addEventListener("keydown", onKey);
    setTimeout(dismiss, 8000);
  },

  // Credits
  credits: (t: (key: string) => string) => {
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
        <p style="color: #78716c; margin-bottom: 50px; font-size: 14px; text-transform: uppercase; letter-spacing: 4px;">${t("credits_powered_by")}</p>
        <div style="font-size: 22px; line-height: 3;">
          <p style="color: #61dafb;">React &amp; Next.js</p>
          <p style="color: #3178c6;">TypeScript</p>
          <p style="color: #06b6d4;">Tailwind CSS</p>
          <p style="color: #f472b6;">Framer Motion</p>
          <p style="color: #22c55e;">next-intl</p>
          <p style="color: #a855f7;">Lenis Smooth Scroll</p>
          <p style="color: #f59e0b;">cmdk</p>
          <p style="color: #ffffff;">Vercel</p>
        </div>
        <div style="margin-top: 80px; color: #78716c; font-size: 14px;">
          <p>${t("credits_made_with")}</p>
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

  // Windows XP — multi-phase boot experience
  xpSound: (t: (key: string) => string) => {
    const willCrash = Math.random() < 0.3;
    const crashPercent = willCrash ? Math.floor(Math.random() * 40) + 45 : 999;
    let phase = "bios";
    let dismissed = false;

    const style = document.createElement("style");
    style.textContent = `
      @keyframes xpRoll    { 0%{left:-36px;opacity:.4} 10%{opacity:1} 90%{opacity:1} 100%{left:195px;opacity:.4} }
      @keyframes xpFadeIn  { from{opacity:0} to{opacity:1} }
      @keyframes xpBlink   { 0%,49%{opacity:1} 50%,100%{opacity:0} }
      @keyframes xpPop     { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }
      @keyframes xpSlideUp { from{opacity:0;transform:translate(-50%,-52%)} to{opacity:1;transform:translate(-50%,-58%)} }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement("div");
    overlay.style.cssText = `position:fixed;inset:0;z-index:99999;overflow:hidden;cursor:pointer;background:#000;`;
    document.body.appendChild(overlay);

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      document.removeEventListener("keydown", keyHandler);
      overlay.style.transition = "opacity .25s";
      overlay.style.opacity = "0";
      setTimeout(() => { overlay.remove(); style.remove(); }, 260);
    };
    const keyHandler = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    document.addEventListener("keydown", keyHandler);
    overlay.addEventListener("click", () => { if (phase !== "welcome") dismiss(); });

    // ── PHASE 1: BIOS POST ──────────────────────────────────────────────────
    overlay.innerHTML = `
      <div style="padding:22px 28px;font-family:'Courier New',monospace;font-size:13px;color:#ccc;line-height:1.85;animation:xpFadeIn .25s ease;">
        <div style="color:#fff;font-weight:bold;">Award Medallion BIOS v6.0 PG, An Energy Star Ally</div>
        <div style="color:#777;margin-bottom:10px;">Copyright (C) 1984-2003, Award Software, Inc.</div>
        <div>CPU: Intel(R) Pentium(R) 4 CPU 2.80GHz</div>
        <div>Memory Test: <span id="xp-ram">0</span> KB OK</div>
        <div style="margin-top:8px;color:#777;">Detecting IDE drives...</div>
        <div style="color:#777;">Primary Master&nbsp;&nbsp;: WDC WD800JB-75JMA0</div>
        <div style="color:#777;">Primary Slave&nbsp;&nbsp;&nbsp;: ATAPI CD-ROM Drive</div>
        <div style="color:#777;">Secondary Master: Not Detected</div>
        <div style="margin-top:14px;color:#ff0;">Press <span style="color:#fff;font-weight:bold;">DEL</span> to enter SETUP &nbsp; <span style="color:#fff;font-weight:bold;">F8</span> for Boot Menu</div>
        <div style="margin-top:6px;color:#444;font-size:11px;">ESC ou clic pour fermer</div>
      </div>`;

    let ram = 0;
    const ramTimer = setInterval(() => {
      ram = Math.min(ram + Math.floor(Math.random() * 28672) + 8192, 524288);
      const el = document.getElementById("xp-ram");
      if (el) el.textContent = ram.toLocaleString();
      if (ram >= 524288) clearInterval(ramTimer);
    }, 55);

    // ── PHASE 2: XP BOOT SCREEN ─────────────────────────────────────────────
    setTimeout(() => {
      if (dismissed) return;
      clearInterval(ramTimer);
      phase = "boot";

      const startupAudio = new Audio("/sounds/windows-xp-startup.wav");
      startupAudio.volume = 0.5;
      startupAudio.play().catch(() => {});

      overlay.innerHTML = `
        <div style="width:100%;height:100%;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;animation:xpFadeIn .5s ease;">
          <div style="display:flex;align-items:center;gap:18px;margin-bottom:60px;">
            <div style="width:58px;height:58px;background:conic-gradient(#f33 0deg 90deg,#3a3 90deg 180deg,#33f 180deg 270deg,#fa3 270deg 360deg);border-radius:5px;transform:perspective(80px) rotateY(-6deg) rotateX(3deg);box-shadow:0 4px 24px rgba(255,255,255,.1);"></div>
            <div>
              <div style="font-family:'Franklin Gothic Medium','Arial Narrow',Tahoma,sans-serif;font-size:25px;color:#fff;font-style:italic;font-weight:400;letter-spacing:1px;">Microsoft</div>
              <div style="font-family:'Franklin Gothic Medium','Arial Narrow',Tahoma,sans-serif;font-size:54px;color:#fff;font-weight:900;letter-spacing:-3px;line-height:1;margin-top:-5px;">Windows<span style="color:#f90;font-size:30px;vertical-align:super;font-weight:700;"> XP</span></div>
              <div style="font-family:Tahoma,sans-serif;font-size:12px;color:#666;letter-spacing:2px;font-style:italic;margin-top:4px;">${t("xp_boot_edition")}</div>
            </div>
          </div>
          <div style="width:182px;height:20px;border:1px solid #3a3a3a;border-radius:10px;background:#0a0a0a;overflow:hidden;position:relative;margin-bottom:18px;">
            <div style="position:absolute;top:3px;width:32px;height:14px;background:linear-gradient(180deg,#5aabff,#0058e6);border-radius:7px;animation:xpRoll 1.35s linear infinite 0s;box-shadow:0 0 8px rgba(59,149,255,.65);"></div>
            <div style="position:absolute;top:3px;width:32px;height:14px;background:linear-gradient(180deg,#5aabff,#0058e6);border-radius:7px;animation:xpRoll 1.35s linear infinite .45s;box-shadow:0 0 8px rgba(59,149,255,.65);"></div>
            <div style="position:absolute;top:3px;width:32px;height:14px;background:linear-gradient(180deg,#5aabff,#0058e6);border-radius:7px;animation:xpRoll 1.35s linear infinite .9s;box-shadow:0 0 8px rgba(59,149,255,.65);"></div>
          </div>
          <p id="xp-status" style="color:#444;font-family:Tahoma,sans-serif;font-size:11px;text-align:center;">${t("xp_loading_1")}</p>
        </div>`;

      const msgs = [t("xp_loading_1"),t("xp_loading_2"),t("xp_loading_3"),t("xp_loading_4"),t("xp_loading_5"),t("xp_loading_6"),t("xp_loading_7")];
      let mi = 0;
      const msgTimer = setInterval(() => {
        if (dismissed) { clearInterval(msgTimer); return; }
        mi = (mi + 1) % msgs.length;
        const el = document.getElementById("xp-status");
        if (el) el.textContent = msgs[mi];
      }, 800);

      let prog = 0;
      const progTimer = setInterval(() => {
        if (dismissed) { clearInterval(progTimer); clearInterval(msgTimer); return; }
        prog += Math.random() * 5 + 2;
        if (willCrash && prog >= crashPercent) {
          clearInterval(progTimer); clearInterval(msgTimer);
          startupAudio.pause();
          showBSOD();
          return;
        }
        if (prog >= 100) {
          clearInterval(progTimer); clearInterval(msgTimer);
          setTimeout(() => { if (!dismissed) showWelcome(startupAudio); }, 700);
        }
      }, 110);

    }, 2000);

    // ── BSOD ────────────────────────────────────────────────────────────────
    const showBSOD = () => {
      if (dismissed) return;
      phase = "bsod";
      const bsodAudio = new Audio("/sounds/windows-xp-critical-stop.wav");
      bsodAudio.volume = 0.6;
      bsodAudio.play().catch(() => {});
      overlay.style.background = "#0000aa";
      overlay.innerHTML = `
        <div style="padding:44px 52px;font-family:'Lucida Console','Courier New',monospace;font-size:14px;color:#fff;line-height:1.85;animation:xpFadeIn .08s ease;">
          <div style="background:#aaa;color:#000;display:inline-block;padding:1px 8px;margin-bottom:26px;font-size:14px;">Windows</div>
          <p style="margin-bottom:18px;">${t("xp_bsod_title")}</p>
          <p style="margin-bottom:18px;">${t("xp_bsod_hint")}</p>
          <p style="margin-bottom:5px;">${t("xp_bsod_check1")}</p>
          <p style="margin-bottom:22px;">${t("xp_bsod_check2")}</p>
          <p style="margin-bottom:5px;">Technical information:</p>
          <p style="margin-bottom:3px;">*** STOP: 0x0000007E (0xC0000005, 0xF748E0BF, 0xF78DA208, 0xF78D9F08)</p>
          <p style="color:#bbb;margin-bottom:3px;">*** win32k.sys - Address F748E0BF base at F7450000, DateStamp 45f01f82</p>
          <p style="margin-top:36px;color:#ccc;animation:xpBlink 1s infinite;">${t("xp_bsod_key")}</p>
        </div>`;
      setTimeout(dismiss, 6000);
    };

    // ── WELCOME SCREEN ───────────────────────────────────────────────────────
    const showWelcome = (audio: HTMLAudioElement) => {
      if (dismissed) return;
      phase = "welcome";
      audio.play().catch(() => {});
      const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      overlay.style.background = "";
      overlay.innerHTML = `
        <div style="width:100%;height:100%;background:linear-gradient(180deg,#164f90 0%,#2070c8 25%,#2272cc 75%,#1a5faa 100%);display:flex;flex-direction:column;animation:xpFadeIn .9s ease;">
          <div style="background:linear-gradient(180deg,#154e90,#1e6abf);padding:13px 28px;display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid rgba(255,255,255,.12);">
            <div style="display:flex;align-items:center;gap:14px;">
              <div style="width:40px;height:40px;background:conic-gradient(#f33 0deg 90deg,#3a3 90deg 180deg,#33f 180deg 270deg,#fa3 270deg 360deg);border-radius:4px;"></div>
              <span style="font-family:Tahoma,sans-serif;font-size:30px;font-weight:bold;color:#fff;text-shadow:1px 2px 4px rgba(0,0,0,.4);">Windows XP</span>
            </div>
            <span style="font-family:Tahoma,sans-serif;font-size:13px;color:#b8d8ff;">${timeStr}</span>
          </div>
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;">
            <p style="font-family:Tahoma,sans-serif;font-size:16px;color:#cce5ff;letter-spacing:.5px;text-shadow:0 1px 3px rgba(0,0,0,.4);">${t("xp_login_click")}</p>
            <div id="xp-user-btn" style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:18px 32px;border-radius:10px;cursor:pointer;border:1px solid rgba(255,255,255,.15);transition:background .15s;">
              <div style="width:70px;height:70px;border-radius:50%;background:linear-gradient(135deg,#60c4f4,#0277bd);display:flex;align-items:center;justify-content:center;border:3px solid rgba(255,255,255,.65);font-family:Tahoma,sans-serif;font-size:30px;color:#fff;font-weight:bold;box-shadow:0 4px 18px rgba(0,0,0,.35);">C</div>
              <span style="font-family:Tahoma,sans-serif;font-size:16px;color:#fff;font-weight:bold;text-shadow:1px 1px 3px rgba(0,0,0,.4);">${t("xp_login_user")}</span>
            </div>
          </div>
          <div style="background:linear-gradient(180deg,#154e90,#185298);padding:10px 28px;display:flex;justify-content:space-between;align-items:center;border-top:2px solid rgba(255,255,255,.12);">
            <span style="font-family:Tahoma,sans-serif;font-size:11px;color:#b8d8ff;">Pour vous connecter, cliquez sur votre nom d'utilisateur</span>
            <span style="font-family:Tahoma,sans-serif;font-size:11px;color:#b8d8ff;cursor:pointer;">Désactiver l'ordinateur</span>
          </div>
        </div>`;

      const userBtn = document.getElementById("xp-user-btn");
      if (userBtn) {
        userBtn.addEventListener("mouseenter", () => { userBtn.style.background = "rgba(255,255,255,.18)"; });
        userBtn.addEventListener("mouseleave", () => { userBtn.style.background = ""; });
        userBtn.addEventListener("click", (e) => { e.stopPropagation(); showDesktop(); });
      }
    };

    // ── DESKTOP ──────────────────────────────────────────────────────────────
    const showDesktop = () => {
      if (dismissed) return;
      phase = "desktop";
      const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      overlay.innerHTML = `
        <div style="width:100%;height:100%;background:linear-gradient(180deg,#5294c8 0%,#82bcdf 32%,#90cc72 64%,#59a025 100%);position:relative;overflow:hidden;animation:xpPop .45s ease;">
          <div style="position:absolute;bottom:48px;left:-8%;right:-8%;height:48%;background:radial-gradient(ellipse 130% 65% at 50% 100%,#78b83a 0%,#5ea028 45%,#4a8820 100%);border-radius:52% 58% 0 0/30% 28% 0 0;"></div>
          <div style="position:absolute;top:14px;left:12px;display:flex;flex-direction:column;gap:14px;">
            <div style="display:flex;flex-direction:column;align-items:center;gap:3px;width:70px;">
              <div style="font-size:32px;">🖥️</div>
              <span style="font-family:Tahoma,sans-serif;font-size:11px;color:#fff;text-shadow:1px 1px 3px rgba(0,0,0,.85);text-align:center;line-height:1.3;">Poste de<br>travail</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:3px;width:70px;">
              <div style="font-size:32px;">🌐</div>
              <span style="font-family:Tahoma,sans-serif;font-size:11px;color:#fff;text-shadow:1px 1px 3px rgba(0,0,0,.85);text-align:center;">Portfolio</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:3px;width:70px;">
              <div style="font-size:32px;">🗑️</div>
              <span style="font-family:Tahoma,sans-serif;font-size:11px;color:#fff;text-shadow:1px 1px 3px rgba(0,0,0,.85);text-align:center;">Corbeille</span>
            </div>
          </div>
          <div style="position:absolute;top:50%;left:50%;animation:xpSlideUp .35s ease .1s both;background:#ece9d8;border:2px solid #777;border-radius:5px;box-shadow:4px 4px 18px rgba(0,0,0,.45);min-width:268px;overflow:hidden;">
            <div style="background:linear-gradient(180deg,#2b7fd9,#1e6ec8);padding:5px 8px;display:flex;align-items:center;justify-content:space-between;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:15px;height:15px;background:conic-gradient(#f33 0deg 90deg,#3a3 90deg 180deg,#33f 180deg 270deg,#fa3 270deg 360deg);border-radius:2px;"></div>
                <span style="font-family:Tahoma,sans-serif;font-size:12px;color:#fff;font-weight:bold;">Windows XP</span>
              </div>
              <div id="xp-close-x" style="width:17px;height:17px;background:linear-gradient(180deg,#f88,#c00);border-radius:3px;display:flex;align-items:center;justify-content:center;font-family:Tahoma,sans-serif;font-size:10px;color:#fff;font-weight:bold;cursor:pointer;border:1px solid #900;">✕</div>
            </div>
            <div style="padding:22px 26px;text-align:center;">
              <div style="font-size:38px;margin-bottom:9px;">🎉</div>
              <div style="font-family:Tahoma,sans-serif;font-size:17px;font-weight:bold;color:#003399;margin-bottom:5px;">${t("xp_welcome")}</div>
              <div style="font-family:Tahoma,sans-serif;font-size:12px;color:#555;margin-bottom:18px;">${t("xp_login_user")}</div>
              <div id="xp-ok-btn" style="background:linear-gradient(180deg,#f0ece0,#d4d0c8);border:1px solid #7b7b7b;border-radius:3px;padding:5px 26px;display:inline-block;cursor:pointer;font-family:Tahoma,sans-serif;font-size:12px;box-shadow:1px 1px 3px rgba(0,0,0,.2);">OK</div>
            </div>
          </div>
          <div style="position:absolute;bottom:0;left:0;right:0;height:48px;background:linear-gradient(180deg,#2878cc 0%,#1d6abf 40%,#185aaa 60%,#1e6abf 100%);display:flex;align-items:center;border-top:2px solid #3b90d8;box-shadow:0 -2px 6px rgba(0,0,0,.25);">
            <div style="height:50px;padding:0 18px 0 10px;background:linear-gradient(180deg,#5ebc36,#3ea01e 40%,#308a14,#4caa28 100%);border-radius:0 26px 26px 0;display:flex;align-items:center;gap:9px;cursor:pointer;box-shadow:2px 0 8px rgba(0,0,0,.3);">
              <div style="width:22px;height:22px;background:conic-gradient(#f33 0deg 90deg,#3a3 90deg 180deg,#33f 180deg 270deg,#fa3 270deg 360deg);border-radius:3px;"></div>
              <span style="font-family:Tahoma,sans-serif;font-size:14px;color:#fff;font-weight:bold;font-style:italic;text-shadow:1px 1px 3px rgba(0,0,0,.4);">démarrer</span>
            </div>
            <div style="width:1px;height:34px;background:rgba(255,255,255,.2);margin:0 6px;"></div>
            <div style="background:rgba(0,0,0,.22);border:1px solid rgba(255,255,255,.18);border-radius:3px;padding:4px 11px;display:flex;align-items:center;gap:6px;font-family:Tahoma,sans-serif;font-size:11px;color:#fff;">
              <span>🌐</span><span>Portfolio — Corentin</span>
            </div>
            <div style="flex:1;"></div>
            <div style="display:flex;align-items:center;gap:8px;background:rgba(0,0,40,.32);padding:5px 12px;margin:4px;border:1px solid rgba(255,255,255,.1);border-radius:3px;">
              <span style="font-size:13px;">🔊</span>
              <span style="font-size:13px;">📶</span>
              <span style="font-family:Tahoma,sans-serif;font-size:11px;color:#fff;">${timeStr}</span>
            </div>
          </div>
        </div>`;

      const okBtn = document.getElementById("xp-ok-btn");
      const closeX = document.getElementById("xp-close-x");
      if (okBtn) okBtn.addEventListener("click", (e) => { e.stopPropagation(); dismiss(); });
      if (closeX) closeX.addEventListener("click", (e) => {
        e.stopPropagation();
        const dlg = closeX.closest("div[style*='xpSlideUp']") as HTMLElement | null
          ?? closeX.parentElement?.parentElement?.parentElement as HTMLElement | null;
        if (dlg) dlg.style.display = "none";
      });
      setTimeout(dismiss, 9000);
    };
  },

  // Thanos Snap — multi-phase cinematic disintegration
  thanos: (t: (key: string) => string) => {
    // Capture visible page elements before any mutation
    const pageElements = Array.from(
      document.querySelectorAll<HTMLElement>("h1,h2,h3,h4,p,img,section,nav,footer,header,article,li,a,button")
    ).filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && r.top < window.innerHeight && r.bottom > 0 && !el.closest("#thanos-ui");
    });

    // Sort left-to-right for the restoration wave
    const sortedForRestore = [...pageElements].sort((a, b) => {
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      return ra.left - rb.left + (ra.top - rb.top) * 0.25;
    });

    // ── STYLES ───────────────────────────────────────────────────────────────
    const style = document.createElement("style");
    style.textContent = `
      @keyframes thanosGauntlet { 0%{transform:scale(0) rotate(-40deg);opacity:0} 65%{transform:scale(1.18) rotate(6deg);opacity:1} 100%{transform:scale(1) rotate(0);opacity:1} }
      @keyframes thanosQuote    { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      @keyframes thanosFlash    { 0%{opacity:0} 20%{opacity:1} 100%{opacity:0} }
      @keyframes thanosShake    { 0%,100%{transform:translate(0,0)} 15%{transform:translate(-5px,-3px)} 30%{transform:translate(5px,3px)} 45%{transform:translate(-4px,4px)} 60%{transform:translate(4px,-2px)} 75%{transform:translate(-2px,3px)} 90%{transform:translate(2px,-2px)} }
      @keyframes thanosIronman  { from{opacity:0;transform:translateY(18px) scale(.92)} to{opacity:1;transform:translateY(0) scale(1)} }
      @keyframes thanosStoneGlow{ 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.6)} }
    `;
    document.head.appendChild(style);

    // ── CANVAS ────────────────────────────────────────────────────────────────
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.id = "thanos-ui";
    canvas.style.cssText = `position:fixed;inset:0;z-index:99999;pointer-events:none;`;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    // ── PRE-SNAP OVERLAY ──────────────────────────────────────────────────────
    const preOverlay = document.createElement("div");
    preOverlay.id = "thanos-ui";
    preOverlay.style.cssText = `
      position:fixed;inset:0;z-index:99998;
      background:rgba(0,0,0,.88);
      display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;
      pointer-events:none; opacity:0; transition:opacity .35s ease;
    `;
    preOverlay.innerHTML = `
      <div style="display:flex;gap:12px;animation:thanosGauntlet .9s cubic-bezier(.17,.67,.35,1.3) .5s both;">
        <span style="font-size:88px;filter:drop-shadow(0 0 32px rgba(255,160,0,.85));">✊</span>
      </div>
      <div style="display:flex;gap:10px;animation:thanosQuote .5s ease 1.3s both;">
        <span style="display:inline-block;width:13px;height:13px;border-radius:50%;background:#4db8ff;animation:thanosStoneGlow 1.5s infinite 0s;"></span>
        <span style="display:inline-block;width:13px;height:13px;border-radius:50%;background:#ff4444;animation:thanosStoneGlow 1.5s infinite .25s;"></span>
        <span style="display:inline-block;width:13px;height:13px;border-radius:50%;background:#f5a623;animation:thanosStoneGlow 1.5s infinite .5s;"></span>
        <span style="display:inline-block;width:13px;height:13px;border-radius:50%;background:#a855f7;animation:thanosStoneGlow 1.5s infinite .75s;"></span>
        <span style="display:inline-block;width:13px;height:13px;border-radius:50%;background:#22c55e;animation:thanosStoneGlow 1.5s infinite 1s;"></span>
        <span style="display:inline-block;width:13px;height:13px;border-radius:50%;background:#f59e0b;animation:thanosStoneGlow 1.5s infinite 1.25s;"></span>
      </div>
      <p style="font-family:Georgia,'Times New Roman',serif;font-size:22px;color:rgba(255,228,150,.95);text-align:center;max-width:440px;line-height:1.7;text-shadow:0 2px 20px rgba(0,0,0,1);padding:0 28px;animation:thanosQuote .6s ease 1.8s both;">${t("thanos_quote")}</p>
    `;
    document.body.appendChild(preOverlay);
    setTimeout(() => { preOverlay.style.opacity = "1"; }, 10);

    // ── SNAP (after 2.6s) ─────────────────────────────────────────────────────
    interface Pt { x:number;y:number;vx:number;vy:number;size:number;color:string;life:number;decay:number;rot:number;rv:number; }
    const particles: Pt[] = [];
    const MCU_COLORS = ["#d4a017","#e8b84b","#c0392b","#922b21","#a855f7","#7c3aed","#888","#aaa","#ccc","#fff","#f59e0b","#78350f"];
    let animRunning = false;

    const spawnWave = (waveX: number, count: number) => {
      for (let i = 0; i < count; i++) {
        particles.push({
          x: waveX + (Math.random() - 0.5) * 240,
          y: Math.random() * window.innerHeight,
          vx: Math.random() * 5.5 + 1.5,
          vy: (Math.random() - 0.45) * 3.5,
          size: Math.random() * 6 + 0.8,
          color: MCU_COLORS[Math.floor(Math.random() * MCU_COLORS.length)],
          life: 0.9 + Math.random() * 0.1,
          decay: Math.random() * 0.006 + 0.003,
          rot: Math.random() * Math.PI * 2,
          rv: (Math.random() - 0.5) * 0.18,
        });
      }
    };

    const animateParticles = () => {
      if (!animRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.vy += (Math.random() - 0.48) * 0.12;
        p.y += p.vy;
        p.life -= p.decay;
        p.rot += p.rv;
        if (p.life <= 0 || p.x > canvas.width + 60) { particles.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = Math.min(p.life, 0.95);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.size < 2.5) {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size * 0.5, -p.size * 0.5, p.size, p.size);
        }
        ctx.restore();
      }
      requestAnimationFrame(animateParticles);
    };

    setTimeout(() => {
      preOverlay.style.background = "rgba(0,0,0,0)";
      preOverlay.style.transition = "background .4s";

      // White flash
      const flash = document.createElement("div");
      flash.style.cssText = `position:fixed;inset:0;z-index:999999;background:#fff;pointer-events:none;animation:thanosFlash .5s ease forwards;`;
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 500);

      // Body shake
      document.body.style.animation = "thanosShake .55s ease";
      setTimeout(() => { document.body.style.animation = ""; }, 560);

      // DOM disintegration: right-to-left wave (rightmost elements vanish first)
      const sorted = [...pageElements].sort((a, b) => {
        const ra = a.getBoundingClientRect();
        const rb = b.getBoundingClientRect();
        return (rb.left + rb.width * 0.5) - (ra.left + ra.width * 0.5);
      });
      sorted.forEach((el, idx) => {
        const delay = idx * 28 + Math.random() * 60;
        const dx = 40 + Math.random() * 80;
        const dy = (Math.random() - 0.5) * 30;
        const dr = (Math.random() - 0.5) * 6;
        setTimeout(() => {
          el.style.transition = `opacity 1.1s ease, transform 1.4s ease, filter 1.3s ease`;
          el.style.opacity = "0";
          el.style.transform = `translateX(${dx}px) translateY(${dy}px) rotate(${dr}deg)`;
          el.style.filter = "blur(4px)";
        }, delay);
      });

      // Spawn particle waves sweeping left-to-right
      animRunning = true;
      animateParticles();
      let wave = 0; const totalWaves = 32;
      const nextWave = () => {
        if (wave >= totalWaves) return;
        const x = window.innerWidth * (1 - wave / totalWaves);
        spawnWave(x, 160);
        wave++;
        setTimeout(nextWave, 90);
      };
      nextWave();

      // ── IRONMAN QUOTE + RESTORATION ─────────────────────────────────────────
      setTimeout(() => {
        animRunning = false;
        canvas.remove();
        preOverlay.remove();

        const ironman = document.createElement("div");
        ironman.style.cssText = `
          position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;
          background:rgba(0,0,0,.72);pointer-events:none;
          animation:thanosIronman .65s ease both;
        `;
        ironman.innerHTML = `<span style="font-family:Georgia,'Times New Roman',serif;font-size:34px;color:#e5a823;letter-spacing:.04em;text-shadow:0 0 60px rgba(229,168,35,.9),0 0 24px rgba(229,168,35,.6),0 2px 8px rgba(0,0,0,1);">${t("thanos_ironman")}</span>`;
        document.body.appendChild(ironman);

        // Restore elements left-to-right
        sortedForRestore.forEach((el, idx) => {
          const delay = idx * 12;
          setTimeout(() => {
            el.style.transition = `opacity 1s ease, transform 1s ease, filter 1s ease`;
            el.style.opacity = "";
            el.style.transform = "";
            el.style.filter = "";
            setTimeout(() => { el.style.transition = ""; }, 1100);
          }, delay);
        });

        setTimeout(() => {
          ironman.style.transition = "opacity .5s ease";
          ironman.style.opacity = "0";
          setTimeout(() => { ironman.remove(); style.remove(); }, 520);
        }, 2800);
      }, 5200);
    }, 2600);
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
      // Fermer avec ESC
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  // Empêcher le scroll de la page quand le menu est ouvert
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // Stopper Lenis smooth scroll
      if (window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      // Reprendre Lenis smooth scroll
      if (window.lenis) {
        window.lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [open]);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command Menu"
      className="fixed left-1/2 top-[20vh] z-[9999] w-[calc(100%-2rem)] max-w-[640px] -translate-x-1/2 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-2xl dark:border-stone-800 dark:bg-stone-950"
      loop
    >
      <Dialog.Title className="sr-only">Command Menu</Dialog.Title>
        <div className="flex items-center border-b border-stone-200 dark:border-stone-800 px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Command.Input
            autoFocus
            placeholder={t("search")}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-stone-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-stone-50"
          />
          <div className="text-xs text-stone-500 border border-stone-200 dark:border-stone-800 rounded px-1.5 py-0.5 select-none">ESC</div>
        </div>
        <Command.List
          className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2"
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
        >
          <Command.Empty className="py-6 text-center text-sm text-stone-500">
            No results found.
          </Command.Empty>

          <Command.Group heading={t("navigation")} className="text-stone-500 dark:text-stone-400 text-xs font-medium px-2 py-1.5 mb-1 select-none">
            <CommandItem onSelect={() => runCommand(() => (window.location.hash = "#about"))}>
              <User className="mr-2 h-4 w-4" />
              <span>About</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => (window.location.hash = "#timeline"))}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Timeline</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => (window.location.hash = "#projects"))}>
              <Code className="mr-2 h-4 w-4" />
              <span>Projects</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => (window.location.hash = "#skills"))}>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Skills</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => (window.location.hash = "#contact"))}>
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
          <CommandItem onSelect={() => runCommand(() => easterEggs.hackerMode(t))}>
            <Terminal className="mr-2 h-4 w-4" />
            <span>sudo hire me</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => easterEggs.coffee(t))}>
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
          <CommandItem onSelect={() => runCommand(() => easterEggs.whoami(t))}>
            <User className="mr-2 h-4 w-4" />
            <span>whoami</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => easterEggs.credits(t))}>
            <Film className="mr-2 h-4 w-4" />
            <span>credits</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => easterEggs.helloWorld())}>
            <Globe className="mr-2 h-4 w-4" />
            <span>hello</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => easterEggs.xpSound(t))}>
            <Monitor className="mr-2 h-4 w-4" />
            <span>xp</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => easterEggs.thanos(t))}>
            <Sparkles className="mr-2 h-4 w-4" />
            <span>thanos</span>
          </CommandItem>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}

function CommandItem({ children, onSelect, keywords }: { children: React.ReactNode, onSelect: () => void, keywords?: string[] }) {
  return (
    <Command.Item
      onSelect={onSelect}
      keywords={keywords}
      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-stone-100 dark:hover:bg-stone-800 aria-selected:bg-stone-100 dark:aria-selected:bg-stone-800 text-stone-900 dark:text-stone-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 transition-colors"
    >
      {children}
    </Command.Item>
  );
}
