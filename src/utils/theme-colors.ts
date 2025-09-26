import { SiteSettings } from "@/types/types";
import { hexToOklch } from "./hex-to-oklch";
import { CSSProperties } from "react";

export type ThemeColors = ReturnType<typeof generateThemeColors>;

/**
 * Genera colores derivados a partir de los valores de settings.
 */
export function generateThemeColors(settings: SiteSettings) {
    return {
        primary: {
            light: hexToOklch(settings.primary_color, 0.9),
            semiLight: hexToOklch(settings.primary_color, 0.5),
            semiDark: hexToOklch(settings.primary_color, 0.5, "darker"),
            dark: hexToOklch(settings.primary_color, 0.6, "darker"),
        },
        secondary: {
            light: hexToOklch(settings.secondary_color, 0.8),
            dark: hexToOklch(settings.secondary_color, 0.2, "darker"),
        },
        accent: {
            light: hexToOklch(settings.accent_color, 0.8),
            semiLight: hexToOklch(settings.accent_color, 0.6),
            dark: hexToOklch(settings.accent_color, 0.2, "darker"),
        },
    };
}

/**
 * Convierte los colores en variables CSS listas para inyectar en <body style={...} />
 */
export function generateCssVariables(
    settings: SiteSettings,
    themeColors: ThemeColors
): CSSProperties {
    return {
        "--color-primary-light": themeColors.primary.light,
        "--color-primary-semi-light": themeColors.primary.semiLight,
        "--color-primary": settings.primary_color,
        "--color-primary-semi-dark": themeColors.primary.semiDark,
        "--color-primary-dark": themeColors.primary.dark,

        "--color-accent-light": themeColors.accent.light,
        "--color-accent-semi-light": themeColors.accent.semiLight,
        "--color-accent": settings.accent_color,
        "--color-accent-dark": themeColors.accent.dark,

        "--color-secondary-light": themeColors.secondary.light,
        "--color-secondary": settings.secondary_color,
        "--color-secondary-dark": themeColors.secondary.dark,

        "--color-burger-menu-bg": settings.burger_menu_bg_color || "#ffffff",
        "--color-burger-menu-font": settings.burger_menu_font_color || "#000000",
    } as any
}
