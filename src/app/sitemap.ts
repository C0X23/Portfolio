import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: Remplacez par votre domaine réel lors du déploiement
  const baseUrl = "https://portfolio-corentin.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/fr`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
