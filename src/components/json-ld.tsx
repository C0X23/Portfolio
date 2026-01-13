export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Corentin Megret",
    url: "https://cmegret.dev",
    image: "https://cmegret.dev/opengraph-image",
    jobTitle: "Développeur Full Stack",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    sameAs: [
      "https://github.com/C0X23",
      "https://linkedin.com/in/corentin-music",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Python",
      "C",
      "C++",
      "Node.js",
      "Tailwind CSS",
      "Git",
      "Linux",
      "Docker",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "42",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Corentin Megret - Portfolio",
    url: "https://cmegret.dev",
    description: "Portfolio de Corentin Megret, développeur Full Stack spécialisé dans le développement web et système.",
    author: {
      "@type": "Person",
      name: "Corentin Megret",
    },
    inLanguage: ["fr", "en"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
