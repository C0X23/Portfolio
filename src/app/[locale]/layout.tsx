import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
 
  return {
    title: t('title'),
    description: t('description'),
    keywords: ["Développeur Web", "Full Stack", "React", "Next.js", "TypeScript", "Système", "Cloud"],
    authors: [{ name: "Corentin" }],
    openGraph: {
      type: "website",
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      url: "https://votre-domaine.com",
      title: t('title'),
      description: t('description'),
      siteName: "Portfolio de Corentin",
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
    },
  };
}

import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CommandMenu } from "@/components/command-menu";
import { MouseFollower } from "@/components/mouse-follower";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
            <SmoothScroll />
            <MouseFollower />
            <CommandMenu />
            {children}
            <SpeedInsights />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

