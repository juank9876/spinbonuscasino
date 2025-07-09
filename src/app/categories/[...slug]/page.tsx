// app/[...slug]/page.tsx
import { notFound } from 'next/navigation'
import { fetchArticleById, fetchCategoryById } from '@/api-fetcher/fetcher'
import { getPostSlugToIdMap, getCategorySlugToIdMap, cleanSlug } from '@/lib/utils'
import { capitalize } from '@/utils/capitalize'
import { PrePost } from '@/components/juankui/pre-rendered/pre-post'
import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PreCategory } from '@/components/juankui/pre-rendered/pre-category'
import { CardPostCategory } from '@/components/juankui/card-post-category'
import { Category, Post } from '@/types/types'

/** Decide si es un post o categoría y obtiene los datos */
type RouteData =
    | { type: 'post'; post: Post }
    | { type: 'category'; category: Category }

export async function getDataFromParams(slugArray: string[]): Promise<RouteData> {
    if (slugArray.length === 0) notFound()

    // 🚨 Eliminar el prefijo "categories" si existe
    if (slugArray[0] === "categories") {
        slugArray = slugArray.slice(1)
    }

    const postMap = await getPostSlugToIdMap()
    const categoryMap = await getCategorySlugToIdMap()


    const categorySlug = slugArray[slugArray.length - 1]
    const postSlug = slugArray[slugArray.length - 1]


    const categoryId = categoryMap[categorySlug]
    const postId = postMap[postSlug]


    if (categoryId) {
        const category = await fetchCategoryById(categoryId)

        {/*Si hay subcategoria, comprobar*/ }
        if (slugArray.length === 2) {
            console.log(cleanSlug(category.breadcrumbs[1].url), slugArray[0])
            if (cleanSlug(category.breadcrumbs[1].url) !== slugArray[0]) {

                console.error('not match')
                return notFound()
            }

        }
        return { type: 'category', category }
    }


    if (postId) {
        const post = (await fetchArticleById(postId)).post
        console.log(post)

        if (slugArray.length === 3) {
            if (cleanSlug(post.breadcrumbs[1].url) !== slugArray[0] || cleanSlug(post.breadcrumbs[2].url) !== slugArray[1]) {
                //console.log(post.breadcrumbs[1].url, slugArray[0], post.breadcrumbs[2].url, slugArray[1])
                return notFound()
            } else
                return { type: 'post', post }

        }
        if (slugArray.length === 2) {
            if (cleanSlug(post.breadcrumbs[1].url) !== slugArray[0]) {
                console.log(cleanSlug(post.breadcrumbs[1].url), slugArray[0]);
                return notFound()
            }
        }
        return { type: 'post', post }
    }

    notFound()
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug = [] } = await params

    try {
        const data = await getDataFromParams(slug)

        if (data.type === 'post') {
            return {
                title: capitalize(data.post.title),
                description: capitalize(data.post.excerpt),
            }
        }

        return {
            title: capitalize(data.category.name),
            description: capitalize(data.category.description),
        }
    } catch (error) {
        // Silenciosamente devuelve metadatos vacíos si hay 404
        return {
            title: 'Contenido no encontrado',
            description: 'Lo que buscas ya no está aquí.',
        }
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string[] }>
}) {
    const slugArray = (await params).slug || []
    const data = await getDataFromParams(slugArray)


    if (data.type === 'post') {
        const post = data.post
        return (
            <PrePost post={post}>
                <HtmlRenderer html={post.html_content} />
            </PrePost>
        )
    }

    const { category } = data
    const posts = category?.posts || []

    return (
        <>
            {posts.length === 0 ? (
                <PreCategory category={category} className='flex h-full flex-col items-center justify-center'>

                    <span className="text-muted rounded-lg bg-[var(--color-accent)] px-5 py-10 text-xl italic">
                        Oops! No posts available in this category.
                    </span>
                </PreCategory>
            ) : (
                <PreCategory category={category} className='flex w-[90vw] grid-cols-2 flex-col justify-center space-y-5 rounded-lg lg:grid lg:w-[60vw] lg:gap-5'>

                    {posts.map((post) => (
                        <CardPostCategory key={post.id} post={post} category={category} />
                    ))}
                </PreCategory>
            )}

        </>
    )
}
