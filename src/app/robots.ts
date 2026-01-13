import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://portfolio-corentin.vercel.app"; // TODO: Mettre à jour avec le domaine réel
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
