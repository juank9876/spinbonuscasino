// src/config/debug-log.ts



export const debug = {
    brandlisty: {
        url: true,
        response: false,
        html: false,
    },
    fetcher: false,
    pages: false,
    cssContent: false,
    postOrCategoryPermalink: false,
    currentPostOrCategoryUrl: false,
}





export function debugLog(isActive: boolean, ...args: any[]) {
    if (isActive) {
        console.log(...args);
    }
}