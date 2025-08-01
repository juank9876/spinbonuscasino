import { fetchSiteSettings } from "@/api-fetcher/fetcher";
import { Inter, Lato, Merriweather, Montserrat, Onest, Open_Sans, Poppins, Roboto } from "next/font/google";


export type FontType = "Inter" | "Lato" | "Montserrat" | "Open_Sans" | "Poppins" | "Roboto";

export const inter = Inter({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // o ["400", "700"], según necesites
    subsets: ["latin"],
    variable: "--font-inter"
});

export const roboto = Roboto({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // o ["400", "700"], según necesites
    subsets: ["latin"],
    variable: "--font-roboto"
});

export const openSans = Open_Sans({
    weight: ["300", "400", "500", "600", "700", "800"], // o ["400", "700"], según necesites
    subsets: ["latin"],
    variable: "--font-open-sans"
})

export const lato = Lato({
    weight: ["100", "300", "400", "700", "900"], // o ["400", "700"], según necesites
    subsets: ["latin"],
    variable: "--font-lato"
})

export const montserrat = Montserrat({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // o ["400", "700"], según necesites
    subsets: ["latin"],
    variable: "--font-montserrat"
})

export const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // o ["400", "700"], según necesites
    subsets: ["latin"],
    variable: "--font-poppins"
})


export async function generateFonts() {
    const settings = await fetchSiteSettings()
    const fontName = settings.font_family as FontType || "Inter";

    const fontMap = {
        Inter: inter,
        Roboto: roboto,
        Open_Sans: openSans,
        Lato: lato,
        Montserrat: montserrat,
        Poppins: poppins // Note: You'll need to add the Poppins font configuration
    };

    return fontMap[fontName];
}