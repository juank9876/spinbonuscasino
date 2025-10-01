// @/services/content-service.ts
import {
    fetchArticleById,
    fetchCheckRedirect,
    fetchCategoryById,
    fetchPageById,
    fetchSlugToId,
    fetchPermalink,
    PermalinkType
} from '@/api-fetcher/fetcher'
import { Category, Page, PostResponse } from '@/types/types'
import { fixSeoUrlSlash } from '@/utils/fixSeoUrlSlash'
import { redirect } from 'next/navigation'

export type ContentType = 'page' | 'post' | 'category'

export interface ContentData {
    html_content: string
    css_content?: string
}

export interface PostData {
    post: ContentData
}

//FUNCION ABSTRACTA PARA HACER FETCH

async function getContentBySlug<T>(
    slug: string,
    type: ContentType,
    fetchById: (id: string) => Promise<T>
): Promise<T | null> {
    const id = await fetchSlugToId(slug, type)
    if (!id) return null
    return await fetchById(id)
}

//FETCH DE PAGINA CON PARSER
export const getPageFromSlug = async (slug: string): Promise<Page | undefined> => {
    const page = await getContentBySlug(slug, 'page', fetchPageById)

    if (!page) return undefined

    return {
        ...page,
        seo_url: fixSeoUrlSlash(page.seo_url || '')
    }
}

//FETCH POST PARSER
export const getPostFromSlug = async (slug: string): Promise<PostResponse | undefined> => {
    const post = await getContentBySlug(slug, 'post', fetchArticleById)

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
export const getCategoryFromSlug = async (slug: string): Promise<Category | undefined> => {
    const category = await getContentBySlug(slug, 'category', fetchCategoryById)

    if (!category) return undefined

    return {
        ...category,
        seo_url: fixSeoUrlSlash(category.seo_url || '')
    }
}

// FUNCION MULTIHERRAMIENTA PARA OBTENER PAGINA, POST O CATEGORIA
export async function getContentData(slug: string) {

    const page = await getPageFromSlug(slug)
    if (page) {
        return { type: 'page' as const, data: page }
    }

    const post = await getPostFromSlug(slug)
    if (post) {
        return { type: 'post' as const, data: post }
    }

    const category = await getCategoryFromSlug(slug)
    if (category) {
        return { type: 'category' as const, data: category }
    }
    return undefined
}

//BOOLEANO PARA COMPARAR URL ACTUAL (SEO_URL POR DEFECTO) CON PERMALINK
export async function isCheckUrlPermalink(slug: string, slugString: string, type: PermalinkType) {
    const id = await fetchSlugToId(slug, type)
    if (!id) return console.log("No id found to fetch Permalink")

    const { permalink } = await fetchPermalink(id, type)
    console.log("permalink", permalink, type)

    if (permalink !== slugString) {
        console.log("permalink no match", permalink, slugString)
        return false
    }
    else return true
}

