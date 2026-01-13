# 🚀 Portfolio - Corentin M.

<p align="center">
  <strong>Portfolio de développeur Full Stack</strong><br/>
  Next.js 16 • TypeScript • Tailwind CSS • Framer Motion
</p>

<p align="center">
  <a href="#-aperçu">Aperçu</a> •
  <a href="#-stack-technique">Stack</a> •
  <a href="#-fonctionnalités">Fonctionnalités</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-structure">Structure</a>
</p>

---

## 📸 Aperçu

Un portfolio moderne et performant présentant mes compétences, projets et parcours professionnel.

---

## 🛠 Stack Technique

### Frontend

| Technologie | Version | Description |
|-------------|---------|-------------|
| [Next.js](https://nextjs.org/) | 16.1 | Framework React avec App Router |
| [React](https://react.dev/) | 19.2 | Bibliothèque UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Typage statique |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Framework CSS utility-first |

### Animations & UX

| Technologie | Description |
|-------------|-------------|
| [Framer Motion](https://www.framer.com/motion/) | Animations fluides et gestures |
| [Lenis](https://lenis.darkroom.engineering/) | Smooth scrolling |
| [cmdk](https://cmdk.paco.me/) | Command palette (⌘K) |

### Internationalisation

| Technologie | Description |
|-------------|-------------|
| [next-intl](https://next-intl-docs.vercel.app/) | i18n pour Next.js App Router |
| [country-flag-icons](https://www.npmjs.com/package/country-flag-icons) | Drapeaux SVG |

### Outils & Qualité

| Outil | Description |
|-------|-------------|
| [ESLint](https://eslint.org/) | Linting du code |
| [Zod](https://zod.dev/) | Validation de schémas |
| [Resend](https://resend.com/) | API d'envoi d'emails |

### Icônes & Assets

| Ressource | Description |
|-----------|-------------|
| [Lucide React](https://lucide.dev/) | Icônes modernes et légères |
| [Geist Font](https://vercel.com/font) | Police officielle Vercel |

---

## ✨ Fonctionnalités

### 🎨 Design
- **Mode Clair/Sombre** avec transition fluide
- **Glassmorphism** et gradients modernes
- **Responsive** : Mobile, Tablette, Desktop
- **Curseur personnalisé** avec effet magnétique

### 🌍 Internationalisation
- Support **Français** 🇫🇷 et **Anglais** 🇬🇧
- Sélecteur de langue avec drapeaux
- URLs localisées (`/fr`, `/en`)

### ⚡ Performance
- **SSR/SSG** avec Next.js App Router
- **Optimisation des images** automatique
- **Lazy loading** des composants

### 🔍 SEO
- Métadonnées dynamiques par langue
- `sitemap.xml` généré automatiquement
- `robots.txt` configuré

### 🎯 UX Avancée
- **Command Palette** (Ctrl+K / ⌘K)
- **Smooth Scroll** avec Lenis
- **Animations au scroll** avec Framer Motion
- **Formulaire de contact** avec validation Zod

---

## 📦 Installation

### Prérequis

- Node.js 18+
- npm ou yarn

### Étapes

```bash
# Cloner le repository
git clone https://github.com/C0X23/Portfolio.git
cd Portfolio

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | Vérification ESLint |

---

## 🗂 Structure

```
Portfolio/
├── public/
│   └── images/          # Images (portrait, projets)
├── src/
│   ├── app/
│   │   ├── [locale]/    # Pages avec routing i18n
│   │   ├── actions.ts   # Server Actions (contact form)
│   │   └── globals.css  # Styles globaux
│   ├── components/      # Composants React
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Timeline.tsx
│   │   ├── Contact.tsx
│   │   ├── Navigation.tsx
│   │   ├── command-menu.tsx
│   │   ├── mouse-follower.tsx
│   │   └── ...
│   ├── i18n/            # Configuration i18n
│   ├── lib/             # Utilitaires
│   └── messages/        # Traductions (fr.json, en.json)
├── .env.example         # Variables d'environnement (template)
├── next.config.ts       # Configuration Next.js
├── tailwind.config.ts   # Configuration Tailwind (si présent)
└── tsconfig.json        # Configuration TypeScript
```

---

## 🎨 Personnalisation

### Modifier les textes

Les traductions sont dans `src/messages/` :
- `fr.json` : Contenu français
- `en.json` : Contenu anglais

### Modifier les projets

Éditer la section `Projects` dans les fichiers de traduction et ajouter les images correspondantes dans `public/images/`.

### Modifier les couleurs

Le thème utilise la palette **Stone** de Tailwind CSS. Pour personnaliser, modifier les classes dans les composants ou `globals.css`.

---

## 🚀 Déploiement

### Vercel (Recommandé)

1. Connectez votre repo GitHub à [Vercel](https://vercel.com)
2. Vercel détecte automatiquement Next.js
3. Configurez les variables d'environnement si nécessaire
4. Déployez !

### Variables d'environnement

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Clé API Resend pour le formulaire de contact |

---

## 📄 Licence

Ce projet est sous licence MIT.

---

<p align="center">
  Fait avec ❤️ par <strong>Corentin M.</strong>
</p>

### Modifier les images
Remplacez les images dans le dossier `public/images/`. Veillez à conserver les noms de fichiers ou à mettre à jour les chemins dans les composants (`src/components/Projects.tsx` pour les projets).

---
