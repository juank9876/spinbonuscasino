import { contextSiteSettings } from "@/app/context/getSiteSettings";
import { capitalize } from "./capitalize";

export async function createPageWithDescription(
    pageMetaTitle?: string,
    pageTitle?: string
) {
    const settings = await contextSiteSettings();

    const baseTitle = pageMetaTitle || pageTitle || settings.site_title;

    return {
        title: `${capitalize(baseTitle)} | ${capitalize(settings.site_title)}`,
        description: settings.site_description,
    };
}