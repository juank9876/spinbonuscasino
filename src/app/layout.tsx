import "./globals.css";
import './globals-on.css';

import { Header } from "@/components/juankui/wrappers/nav/header";
import { Footer } from "@/components/juankui/wrappers/footer/footer";
import { fetchCookies, fetchSiteSettings, fetchAgeVerification, Cookies } from "@/api-fetcher/fetcher";
import { ViewTransitions } from 'next-view-transitions'
import { Providers } from "./providers";
import { generateFontsFromSettings } from "@/utils/fonts";
import { CookieConsent } from "@/components/juankui/cookies-consent";
import { AgeVerificationPopup } from "@/components/juankui/age-verification";
import { settings as cssSettings } from "@/config/debug-log";
import { generateCssVariables, generateThemeColors, ThemeColors } from "@/utils/theme-colors";
import { AgeVerification, SiteSettings } from "@/types/types";
import { SchemaJson } from "./seo/schemaJson";

export async function fetchLayoutData() {
  const [settings, cookies, ageVerification] = await Promise.all([
    fetchSiteSettings(),
    fetchCookies(),
    fetchAgeVerification(),
  ]);

  return { settings, cookies, ageVerification };
}

function LayoutBody({
  children,
  settings,
  themeColors,
  cookies,
  ageVerification,
}: {
  children: React.ReactNode;
  settings: SiteSettings;
  themeColors: ThemeColors;
  cookies: Cookies;
  ageVerification: AgeVerification;
}) {
  return (
    <body
      style={generateCssVariables(settings, themeColors)}
      className="bg-gradient-light max-w-screen antialiased"
      suppressHydrationWarning
    >
      <Providers>
        <div className="flex max-w-screen min-h-[100dvh] flex-col">
          <Header />
          {children}
          <Footer />
        </div>
        <CookieConsent cookies={cookies} />
        <AgeVerificationPopup ageVerification={ageVerification} />
      </Providers>
    </body>
  );
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch de datos en paralelo
  const layoutData = await fetchLayoutData();

  const { settings, cookies, ageVerification } = layoutData;

  // Generar fuente y colores a partir de settings
  const font = generateFontsFromSettings(settings);
  const themeColors = generateThemeColors(settings);

  return (
    <ViewTransitions>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${font.variable} font-sans ${cssSettings.styles.applyStylesheet ? 'globals-on' : 'globals-off'}`}
      >

        <LayoutBody
          settings={settings}
          themeColors={themeColors}
          cookies={cookies}
          ageVerification={ageVerification}
        >
          {children}
          <SchemaJson jsonLD={JSON.stringify(settings.schema_data)} />
        </LayoutBody>
      </html>
    </ViewTransitions>
  );
}
