// src/config/debug-log.ts




export const debug = {
    brandlisty: {
        url: false,
        response: false,
        html: false,
    },
    fetcher: false,
    fetchPages: false,
    fetchPosts: false,
    fetchCategories: false,

    pages: false,
    htmlContent: false,
    cssContent: false,
    postOrCategoryPermalink: false,
    currentPostOrCategoryUrl: false,
    createMetadata: false,

    fetchAllSlugs: false,
    fetchSlugToId: false,
    apiFooter: true,
}





export function debugLog(isActive: boolean, ...args: any[]) {
    if (isActive) {
        console.log(...args);
    }
}