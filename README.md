# Corentin Megret - Portfolio

Portfolio public de Corentin Megret, développeur back-end Python / Django.

Site : [cmegret.dev](https://cmegret.dev)

Le contenu est disponible en français (`/fr`) et en anglais (`/en`). Il présente les applications métier, les API, les automatisations et le parcours à 42 Lausanne. Les codes des projets Arcom et Arven Distribution restent privés. La plateforme SAV Arcom est en production, sa PWA de scan est en test ; l’ERP Arven est en développement.

## Stack du site

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, next-intl, next-themes, Lenis et cmdk. Le formulaire de contact utilise une Server Action, Zod et Resend. Le suivi technique utilise Sentry et les outils Vercel.

Cette stack décrit le portfolio. Elle ne décrit pas la stack des projets métier présentés.

## Développement

Node.js 20.9 minimum, npm et une clé Resend pour l’envoi du formulaire.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Ne jamais versionner les fichiers d’environnement contenant des secrets.

```sh
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

## Contenu et visuel

- Textes et métadonnées FR/EN : `src/messages/fr.json` et `src/messages/en.json`.
- Projets et liens de code : `src/components/Projects.tsx`.
- Expériences et formations : `src/components/Timeline.tsx`.
- Références structurées : `src/components/json-ld.tsx`.
- Aperçus de partage : `src/app/[locale]/opengraph-image.tsx` et `twitter-image.tsx`.
- Images : `public/images/`.

Le design existant est conservé : couleurs, typographie, mise en page, carrousel, curseur, animations, menu de commandes et thèmes clair/sombre.

Les compétences distinguent pratique professionnelle, formation, notions et projet personnel. Les barres historiques sont décoratives ; elles ne sont pas des pourcentages de maîtrise.

Le logo Arven provient des ressources officielles de la marque. Les documents de candidature ciblés et les coordonnées privées ne sont pas publiés sur le site.

## Publication

Le site existant est hébergé sur Vercel et utilise le dépôt `C0X23/Portfolio`. Conserver le domaine et les routes `/fr` et `/en`. Les variables de production, notamment `RESEND_API_KEY` et celles de Sentry, se configurent sur l’hébergement ; elles ne doivent pas être ajoutées au dépôt.

## Licence

Ce projet est sous licence MIT.
