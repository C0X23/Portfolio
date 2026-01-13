# Portfolio Ultra Moderne - Corentin

Ce projet est un portfolio professionnel construit avec les technologies les plus modernes du moment.

## 🛠 Stack Technique

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Langage**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3/4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Fonctionnalités

- **Design Ultra-Moderne**: Interface sombre (Dark Mode), glassmorphism, gradients.
- **Internationalisation (i18n)**: Support complet Français / Anglais (`next-intl`).
- **Responsive**: Totalement adapté aux mobiles, tablettes et desktops.
- **Animations**: Transitions fluides et animations au défilement (Scroll Reveal, Framer Motion).
- **SEO Optimized**: Sitemap, Robots.txt, Metadonnées dynamiques.

## 📦 Installation et Démarrage

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

3. **Ouvrir le navigateur**
   Rendez-vous sur [http://localhost:3000](http://localhost:3000).

## 🗂 Structure du Projet

- `src/app`: Pages et layout (App Router avec support i18n `[locale]`).
- `src/components`: Composants UI réutilisables.
- `src/messages`: Fichiers de traduction (`fr.json`, `en.json`).
- `src/lib`: Utilitaires.

## 🎨 Personnalisation

### Modifier les textes (Traductions)
Tout le contenu textuel est géré dans les fichiers JSON situés dans `src/messages/` :
- `fr.json` : Contenu en Français.
- `en.json` : Contenu en Anglais.

Pour modifier un texte, mettez à jour la clé correspondante dans les deux fichiers.

### Modifier les images
Remplacez les images dans le dossier `public/images/`. Veillez à conserver les noms de fichiers ou à mettre à jour les chemins dans les composants (`src/components/Projects.tsx` pour les projets).

---

Généré par GitHub Copilot sur VS Code.
