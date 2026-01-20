import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
 
  return {
    metadataBase: new URL("https://cmegret.dev"),
    title: t('title'),
    description: t('description'),
    keywords: ["Développeur Web", "Full Stack", "React", "Next.js", "TypeScript", "Système", "Cloud"],
    authors: [{ name: "Corentin Megret" }],
    appleWebApp: {
      title: "Corentin M.",
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    openGraph: {
      type: "website",
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      url: "https://cmegret.dev",
      title: t('title'),
      description: t('description'),
      siteName: "Corentin Megret - Portfolio",
      images: [
        {
          url: `/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${t('title')} — ${t('description')}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: `/${locale}/twitter-image`,
          width: 1200,
          height: 630,
          alt: `${t('title')} — ${t('description')}`,
        },
      ],
    },
  };
}

import { ThemeProvider } from "@/components/theme-provider";
import { ClientOnlyComponents } from "@/components/client-only-components";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/json-ld";

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <JsonLd locale={locale} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-50 transition-colors duration-300`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <ClientOnlyComponents />
            {children}
            <SpeedInsights />
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

