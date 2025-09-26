import "./globals.css";
import './globals-on.css';

import { Header } from "@/components/juankui/wrappers/nav/header";
import { Footer } from "@/components/juankui/wrappers/footer/footer";
import { fetchCookies, fetchSiteSettings, fetchAgeVerification } from "@/api-fetcher/fetcher";
import { ViewTransitions } from 'next-view-transitions'
import { Providers } from "./providers";
import { generateFonts } from "@/utils/fonts";
import { Metadata } from "next";
import { CookieConsent } from "@/components/juankui/cookies-consent";
import { AgeVerificationPopup } from "@/components/juankui/age-verification";
import { settings as cssSettings } from "@/config/debug-log";
import { generateCssVariables, generateThemeColors } from "@/utils/theme-colors";

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
        url: settings.favicon || "/logo-1.png",
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
export async function fetchLayoutData() {
  const [settings, cookies, ageVerification] = await Promise.all([
    fetchSiteSettings(),
    fetchCookies(),
    fetchAgeVerification(),
  ]);

  return { settings, cookies, ageVerification };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const font = await generateFonts();
  const { settings, cookies, ageVerification } = await fetchLayoutData();

  const themeColors = generateThemeColors(settings);

  console.log('favicon', settings.favicon)
  return (
    <ViewTransitions>
      {/*esta invertido ahora mismo*/}
      <html lang="en" suppressHydrationWarning className={`${font.variable} font-sans ${cssSettings.styles.applyStylesheet ? 'globals-on' : 'globals-off'}`}>
        <head>
          {settings.schema_data && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(settings.schema_data) }}
            />
          )}
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
          <link rel="icon" href={settings.favicon || "/logo-1.svg"} />
        </head>
        <body
          style={generateCssVariables(settings, themeColors)}
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
            <AgeVerificationPopup ageVerification={ageVerification} />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
