import { fetchSiteSettings } from "@/api-fetcher/fetcher";
import { debug, debugLog } from "@/config/debug-log";
import { getContentData } from "@/lib/fetch-data/getPageOrPostData";
import { createPageTitle } from "@/lib/utils";
import { capitalize } from "@/utils/capitalize";
import { fixSeoUrlSlash } from "@/utils/fixSeoUrlSlash";
import { Metadata } from "next";

export async function createMetadata(slug: string): Promise<Metadata> {
    const settings = await fetchSiteSettings();
    const postOrPageOrCategory = await getContentData(slug)

    if (postOrPageOrCategory?.type === 'page' || postOrPageOrCategory?.type === 'post') {
        console.log('ESTO ES UNA PAGE')
        const page = postOrPageOrCategory.type === 'page' ? postOrPageOrCategory.data : postOrPageOrCategory.data.post
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
        )
        function convertToBoolean(value: number | undefined): boolean {
            return value === 1 || value === 1
        }
        console.log(convertToBoolean(page?.robots_noarchive))
        return {

            title: await createPageTitle(page?.meta_title, page?.title) || settings.site_title,
            description: capitalize(page?.meta_description) || settings.site_description,
            keywords: page?.meta_keywords || settings.meta_keywords,
            metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'),

            alternates: {
                canonical: page?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL}${page?.seo_url || "/"}`
            },

            openGraph: {
                title: page?.og_title || settings.meta_title,
                description: page?.og_description || settings.meta_description,
                url: `${process.env.NEXT_PUBLIC_SITE_URL}${page?.seo_url || '/'}`,
                images: page?.og_image ? [{ url: page.og_image }] : [],
                type: 'website',
            },

            robots: {
                index: page?.robots_index === "index",
                follow: page?.robots_follow === "follow",
                nocache: convertToBoolean(page?.robots_noarchive),
                nosnippet: convertToBoolean(page?.robots_nosnippet),
                noimageindex: convertToBoolean(page?.robots_noimageindex),
            },

            // --- Twitter ---
            twitter: {
                card: (page?.twitter_card as "summary" | "summary_large_image" | "player" | "app") || "summary",
                title: page?.twitter_title || page?.meta_title,
                description: page?.twitter_description || page?.meta_description,
                images: page?.twitter_image ? [page.twitter_image] : [],
            },


            icons: [
                {
                    rel: "icon",
                    url: settings.favicon || "/logo-1.png",
                    sizes: "32x32",
                    type: "image/png",
                },
            ],

            other: {
                "google-analytics": settings.ga_tracking_id || "",
                "facebook-pixel": settings.facebook_pixel || "",
                "custom-css": settings.custom_css || "",
                "custom-js": settings.custom_js || "",
                "schema-data": page?.schema_data
                    ? JSON.stringify(page.schema_data)
                    : "",
            },
        };
    }
    else if (postOrPageOrCategory?.type === 'category') {
        const category = postOrPageOrCategory.data
        return {
            title: await createPageTitle(category?.meta_title, settings?.site_title) || settings.site_title,
            description: capitalize(category?.meta_description) || settings.site_description,
            other: {

                "schema-data": category?.schema_data
                    ? JSON.stringify(category.schema_data)
                    : "",
            },
        }
    }
    else {
        console.log('ESTO NO ES UNA PAGE, RENDERIZANDO', settings.site_title, settings.site_description)
        return {
            title: settings.site_title,
            description: settings.site_description,
        }
    }
}