// @/services/content-service.ts
import {
    fetchArticleById,
    fetchCategoryById,
    fetchPageById,
    fetchSlugToId,
    fetchPermalink,
    PermalinkType,
    fetchTagById
} from '@/api-fetcher/fetcher'
import { Category, Page, PostResponse, Tag } from '@/types/types'
import { fixSeoUrlSlash } from '@/utils/fixSeoUrlSlash'


export type ContentType = 'page' | 'post' | 'category' | 'tag'

export interface ContentData {
    html_content: string
    css_content?: string
}


//FUNCION ABSTRACTA PARA HACER FETCH

async function getContentBySlug<T>(
    slug: string,
    type: ContentType,
    fetchById: (id: string) => Promise<T>,
    silent = false
): Promise<T | null> {
    const id = await fetchSlugToId(slug, type, silent)

    if (!id) return null
    return await fetchById(id)
}

//FETCH DE PAGINA CON PARSER
export const getPageFromSlug = async (slug: string, silent = false): Promise<Page | undefined> => {
    const page = await getContentBySlug(slug, 'page', fetchPageById, silent)

    if (!page) return undefined

    return {
        ...page,
        seo_url: fixSeoUrlSlash(page.seo_url || '')
    }
}

//FETCH POST PARSER  
export const getPostFromSlug = async (slug: string, silent = false): Promise<PostResponse | undefined> => {
    const post = await getContentBySlug(slug, 'post', fetchArticleById, silent)

    if (!post) return undefined

    return {
        ...post,
        post: {
            ...post.post,
            seo_url: fixSeoUrlSlash(post.post.seo_url || '')
        }
    }
}

//FETCH CATEGORY PARSER
export const getCategoryFromSlug = async (slug: string, silent = false): Promise<Category | undefined> => {
    const category = await getContentBySlug(slug, 'category', fetchCategoryById, silent)

    if (!category) return undefined

    return {
        ...category,
        seo_url: fixSeoUrlSlash(category.seo_url || '')
    }
}

//FETCH TAG PARSER
export const getTagFromSlug = async (slug: string): Promise<Tag | undefined> => {
    const tag = await getContentBySlug(slug, 'tag', fetchTagById)

    if (!tag) return undefined

    return {
        ...tag,
        //seo_url: fixSeoUrlSlash(tag.seo_url || '')
    }
}


// FUNCION MULTIHERRAMIENTA PARA OBTENER PAGINA, POST O CATEGORIA
export async function getContentData(slug: string) {
    try {
        // Ejecutar todas las consultas en paralelo con silent = true para evitar logs de errores esperados
        const [page, post, category] = await Promise.allSettled([
            getPageFromSlug(slug, true),
            getPostFromSlug(slug, true),
            getCategoryFromSlug(slug, true)
        ])

        // Log de errores si los hay (opcional, solo para debugging)
        const errors = [page, post, category].filter(result => result.status === 'rejected')
        if (errors.length > 0) {
            console.warn(`[getContentData] Some queries failed for slug "${slug}":`, errors)
        }

        // Verificar page (prioridad más alta)
        if (page.status === 'fulfilled' && page.value) {
            return { type: 'page' as const, data: page.value }
        }

        // Verificar post
        if (post.status === 'fulfilled' && post.value) {
            return { type: 'post' as const, data: post.value }
        }

        // Verificar category
        if (category.status === 'fulfilled' && category.value) {
            return { type: 'category' as const, data: category.value }
        }

        // Si llegamos aquí, no se encontró nada
        console.info(`[getContentData] No content found for slug: "${slug}"`)
        return undefined

    } catch (error) {
        console.error(`[getContentData] Unexpected error for slug "${slug}":`, error)
        return undefined
    }
}
//DERIVADA DE getContentData, para obtener solo el tag
export async function getContentDataTag(slug: string) {
    const tag = await getTagFromSlug(slug)
    if (!tag) return undefined
    return { type: 'tag' as const, data: tag }
}

//BOOLEANO PARA COMPARAR URL ACTUAL (SEO_URL POR DEFECTO) CON PERMALINK
export async function isCheckUrlPermalink(slug: string, slugString: string, type: PermalinkType) {
    const id = await fetchSlugToId(slug, type)
    if (!id) return console.log("No id found to fetch Permalink")

    const { permalink } = await fetchPermalink(id, type)

    if (permalink !== slugString) {
        console.log("permalink no match", permalink, slugString)
        return false
    }
    else return true
}

