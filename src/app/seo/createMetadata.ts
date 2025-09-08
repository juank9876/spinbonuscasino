import { fetchSiteSettings } from "@/api-fetcher/fetcher";
import { debug, debugLog } from "@/config/debug-log";
import { createPageTitle } from "@/lib/utils";
import { capitalize } from "@/utils/capitalize";
import { Metadata } from "next";

export async function createMetadata(page?: any | null, noTitle?: boolean): Promise<Metadata> {
    const settings = await fetchSiteSettings();

    debugLog(debug.createMetadata,
        `[+] createMetadata: 
            meta_title: ${page?.meta_title}, 
            title: ${page?.title}, 
            meta_description: ${page?.meta_description},
            meta_keywords: ${page?.meta_keywords}, 
            site_title: ${settings.site_title}, 
            site_description: ${settings.site_description} 
            favicon: ${settings.favicon},
            seo_url: ${page?.seo_url},
            metadataBase: ${process.env.NEXT_PUBLIC_SITE_URL},
        `
    );
    return {

        title: noTitle ? settings.site_title : await createPageTitle(page?.meta_title, page?.title) || settings.site_title,
        description: capitalize(page?.meta_description) || settings.site_description,

        keywords: page?.meta_keywords || settings.meta_keywords,
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'),

        openGraph: {
            title: page?.meta_title || settings.site_title,
            description: page?.meta_description || settings.site_description,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}${page?.seo_url || '/'}`,
            // imágenes, tipo, etc.
        },

        icons: [
            {
                rel: "icon",
                url: settings.favicon || "/favicon.svg",
                sizes: "32x32",
                type: "image/png",
            },
        ],

        other: {
            'google-analytics': settings.ga_tracking_id || '',
            'facebook-pixel': settings.facebook_pixel || '',
            'custom-css': settings.custom_css || '',
            'custom-js': settings.custom_js || '',
        },
    };
}