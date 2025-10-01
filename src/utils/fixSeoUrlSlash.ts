export function fixSeoUrlSlash(url: string) {
    return url?.replace(/\/$/g, '')
}
