
import { PrePost } from '@/components/juankui/pre-rendered/pre-post'
import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PreCategory } from '@/components/juankui/pre-rendered/pre-category'
import { CardPostCategory } from '@/components/juankui/card-post-category'

import { handleRedirect } from '@/utils/handleRedirect'
import { createMetadata } from '@/app/seo/createMetadata'
import NotFound from '@/app/not-found'
import { getContentData, isCheckUrlPermalink } from '@/lib/fetch-data/getPageOrPostData'


export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params
    const slugString = slug.join("/")

    await handleRedirect(slugString)
    return await createMetadata(slug[slug.length - 1])
}


export default async function Page({ params, }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params
    const slugString = '/' + slug.join("/") + '/'; // "a/b/c"
    const content = await getContentData(slug[slug.length - 1])

    if (!content) return <NotFound />

    await handleRedirect(slugString)


    const isValidUrl = await isCheckUrlPermalink(slug[slug.length - 1], slugString, content?.type)

    if (!isValidUrl) return <NotFound />

    if (content.type === 'post') {
        const { post } = content.data

        return (
            <PrePost post={post} >
                <HtmlRenderer html={post.html_content} cssContent={post.css_content || undefined} />
            </PrePost>
        )
    }
    else if (content.type === 'category') {
        const { data: category } = content
        return (
            <>
                {category.posts.length === 0 ? (
                    <PreCategory category={category} className='flex h-full flex-col items-center justify-center'>

                        <span className="text-muted rounded-lg bg-[var(--color-accent)] px-5 py-10 text-xl italic">
                            Oops! No posts available in this category.
                        </span>
                    </PreCategory>
                ) : (
                    <PreCategory category={category} className='flex w-[90vw] flex-wrap flex-col justify-center space-y-5 rounded-lg lg:flex-row lg:w-[70vw] lg:gap-5'>

                        {category.posts.map((post) => (
                            <CardPostCategory key={post.id} post={post} category={category} />
                        ))}
                    </PreCategory>
                )}

            </>
        )
    }

    else {
        return <NotFound />
    }
}

