import "./globals.css";
import { Header } from "@/components/juankui/wrappers/nav/header";
import { Footer } from "@/components/juankui/wrappers/footer/footer";
import { fetchCookies, fetchSiteSettings } from "@/api-fetcher/fetcher";
import { ViewTransitions } from 'next-view-transitions'
import { hexToOklch } from "@/utils/hex-to-oklch";
import { Providers } from "./providers";
import Head from "next/head";
import { generateFonts } from "@/utils/fonts";
import { Metadata } from "next";
import { CookieConsent } from "@/components/juankui/cookies-consent";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings()

  return {
    title: settings.site_title,
    description: settings.site_description,
    keywords: settings.meta_keywords,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'),

    // OpenGraph metadata
    openGraph: {
      title: settings.meta_title || settings.site_title,
      description: settings.meta_description || settings.site_description,
      type: 'website',
      siteName: settings.site_title,
    },

    // Twitter metadata
    twitter: {
      card: 'summary_large_image',
      title: settings.meta_title || settings.site_title,
      description: settings.meta_description || settings.site_description,
    },

    icons: [
      {
        rel: "icon",
        url: settings.favicon || "/favicon.svg",
        sizes: "32x32",
        type: "image/png"
      }
    ],

    // Additional metadata
    other: {
      'google-analytics': settings.ga_tracking_id || '',
      'facebook-pixel': settings.facebook_pixel || '',
      'custom-css': settings.custom_css || '',
      'custom-js': settings.custom_js || '',
    }
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const font = await generateFonts();
  const settings = await fetchSiteSettings()
  const cookies = await fetchCookies();

  //cambiar el valor para distinta tonalidad
  const primaryLightColor = hexToOklch(settings.primary_color, 0.90)
  const primarySemiLightColor = hexToOklch(settings.primary_color, 0.50)
  const primarySemiDarkColor = hexToOklch(settings.primary_color, 0.5, 'darker')
  const primaryDarkColor = hexToOklch(settings.primary_color, 0.6, 'darker')

  const secondaryLightColor = hexToOklch(settings.secondary_color, 0.80);
  const secondaryDarkColor = hexToOklch(settings.secondary_color, 0.2, 'darker');

  const accentLightColor = hexToOklch(settings.accent_color, 0.80);
  const accentSemiLightColor = hexToOklch(settings.accent_color, 0.60);
  const accentDarkColor = hexToOklch(settings.accent_color, 0.2, 'darker');

  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning className={`${font.variable} font-sans`}>
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
            integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <title>{settings.site_title || "Welcome to our site"}</title>
          <meta name="description" content={settings.meta_description} />
          {/* puedes usar settings.favicon, site_logo, etc */}
          <link rel="icon" href={settings.favicon || "/vercel.svg"} />
        </head>
        <body
          style={{
            '--color-primary-light': primaryLightColor,
            '--color-primary-semi-light': primarySemiLightColor,
            '--color-primary': settings.primary_color,
            '--color-primary-semi-dark': primarySemiDarkColor,
            '--color-primary-dark': primaryDarkColor,

            '--color-accent-light': accentLightColor,
            '--color-accent-semi-light': accentSemiLightColor,
            '--color-accent': settings.accent_color,
            '--color-accent-dark': accentDarkColor,

            '--color-secondary-light': secondaryLightColor,
            '--color-secondary': settings.secondary_color,
            '--color-secondary-dark': secondaryDarkColor,

            '--color-burger-menu-bg': settings.burger_menu_bg_color || '#ffffff',
            '--color-burger-menu-font': settings.burger_menu_font_color || '#000000',
          } as React.CSSProperties
          }
          className={`bg-gradient-light max-w-screen antialiased`}
          suppressHydrationWarning
        >
          <Providers>
            <div className="flex min-h-[100dvh] flex-col">
              <Header />
              {children}
              <Footer />
            </div>
            <CookieConsent cookies={cookies} />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
