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
import { redirect } from 'next/navigation'

export type ContentType = 'page' | 'post' | 'category'

export interface ContentData {
    html_content: string
    css_content?: string
}

export interface PostData {
    post: ContentData
}



async function getContentBySlug<T>(
    slug: string,
    type: ContentType,
    fetchById: (id: string) => Promise<T>
): Promise<T | null> {
    const id = await fetchSlugToId(slug, type)
    if (!id) return null
    return await fetchById(id)
}


export const getPageFromSlug = async (slug: string) => {
    const page = await getContentBySlug(slug, 'page', fetchPageById)
    return page
}

export const getPostFromSlug = async (slug: string) => {
    const post = await getContentBySlug(slug, 'post', fetchArticleById)

    if (!post) return null
    return { post: post?.post, sidebar: post?.sidebar }
}

export const getCategoryFromSlug = async (slug: string) => {
    const category = await getContentBySlug(slug, 'category', fetchCategoryById)
    return category
}

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