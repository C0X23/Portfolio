export function JsonLd({ locale }: { locale: string }) {
  const ogImageUrl = `https://cmegret.dev/${locale}/opengraph-image`;
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Corentin Megret",
    url: "https://cmegret.dev",
    image: ogImageUrl,
    jobTitle: locale === "fr" ? "Développeur back-end Python / Django" : "Back-end Developer, Python / Django",
    worksFor: [
      { "@type": "Organization", name: "Arcom" },
      { "@type": "Organization", name: "Arven Distribution" },
    ],
    sameAs: [
      "https://github.com/C0X23",
      "https://www.linkedin.com/in/corentin-megret-2b298a23b/",
    ],
    knowsAbout: [
      "Python",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "REST APIs",
      "pytest",
      "Redis",
      "Celery",
      "C",
      "C++",
      "Git",
      "Linux",
      "Docker",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "42 Lausanne",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Corentin Megret - Portfolio",
    url: "https://cmegret.dev",
    description: locale === "fr"
      ? "Portfolio de Corentin Megret, développeur back-end Python / Django. Applications métier, API et automatisations."
      : "Corentin Megret, back-end Python / Django developer. Business applications, APIs and automations.",
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
