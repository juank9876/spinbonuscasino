import { Onest, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/juankui/wrappers/nav/header";
import { Footer } from "@/components/juankui/wrappers/footer";
import { fetchSiteSettings } from "@/api-fetcher/fetcher";
import { ViewTransitions } from 'next-view-transitions'
import { hexToOklch } from "@/utils/hex-to-oklch";
import { Providers } from "./providers";
import Head from "next/head";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: "400", // o ["400", "700"], según necesites
  subsets: ["latin"],
  variable: "--font-poppins"
});


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await fetchSiteSettings()
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
      <html lang="en" suppressHydrationWarning className={`${onest.variable} ${poppins.variable}`}>
        <Head>
          <title>{settings.meta_title}</title>
          <meta name="description" content={settings.meta_description} />
          {/* puedes usar settings.favicon, site_logo, etc */}
          <link rel="icon" href={settings.favicon || "/vercel.svg"} />
        </Head>
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
          } as React.CSSProperties
          }
          className={`bg-gradient-light max-w-screen antialiased`}
          suppressHydrationWarning
        >
          <Providers>
            <div className="flex min-h-[100dvh] flex-col">
              <Header />
              {children}
              <Footer settings={settings} />
            </div>
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
