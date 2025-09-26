// @/services/content-service.ts
import {
    fetchArticleById,
    fetchCheckRedirect,
    fetchPageById,
    fetchSlugToId
} from '@/api-fetcher/fetcher'
import { redirect } from 'next/navigation'

export type ContentType = 'page' | 'post'

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


export const getPageFromSlug = (slug: string) =>
    getContentBySlug(slug, 'page', fetchPageById)

export const getPostFromSlug = (slug: string) =>
    getContentBySlug(slug, 'post', fetchArticleById)

export async function getContentData(slug: string) {
    const page = await getPageFromSlug(slug)
    if (page) {
        return { type: 'page' as const, data: page }
    }

    const post = await getPostFromSlug(slug)
    if (post) {
        return { type: 'post' as const, data: post }
    }

    return null
}