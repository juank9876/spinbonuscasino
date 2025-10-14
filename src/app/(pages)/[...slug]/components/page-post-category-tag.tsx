import { PrePost } from '@/components/juankui/pre-rendered/pre-post'
import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PreCategory } from '@/components/juankui/pre-rendered/pre-category'
import { fetchArticles } from '@/api-fetcher/fetcher'
import { PostsPagination } from '@/components/juankui/posts-with-pagination'
import { PrePage } from '@/components/juankui/pre-rendered/pre-page'
import { PreTag } from '@/components/juankui/pre-rendered/pre-tag'


export function createPage({ content }: { content: any }) {
    const { data: page } = content
    return (
        <PrePage page={page}>
            <HtmlRenderer
                html={page.html_content}
                cssContent={page.css_content || undefined}
            />
        </PrePage>
    )

}

export function createPost({ content }: { content: any }) {
    const { post } = content.data

    return (
        <PrePost post={post} >
            <HtmlRenderer html={post.html_content} cssContent={post.css_content || undefined} />
        </PrePost>
    )
}

export async function createCategory({ content, searchParams }: { content: any, searchParams: Promise<{ page?: string | undefined }> }) {
    const { data: category } = content
    const currentPage = Number((await searchParams)?.page || 1)
    const POSTS_PER_PAGE = 10

    const dataWithMeta = await fetchArticles({
        pagination: currentPage,
        per_page: POSTS_PER_PAGE,
        with_meta: true,
        category_id: category.id
    })

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

                    {/*category.posts DEPRECATED. AHORA SE FILTRA CON METODO POSTS&CATEGORY_ID=TAL*/}
                    {/*
                        {dataWithMeta.data.map((post) => (
                            <CardPostCategory key={post.id} post={post}
                            //category={category} 
                            />
                        ))}
                            */}
                    <PostsPagination posts={dataWithMeta.data} meta={dataWithMeta.meta} />
                </PreCategory>
            )}

        </>
    )
}
export async function createTag({ content, searchParams }: { content: any, searchParams: Promise<{ page?: string | undefined }> }) {
    const { data: category } = content
    const currentPage = Number((await searchParams)?.page || 1)
    const POSTS_PER_PAGE = 10

    const dataWithMeta = await fetchArticles({
        pagination: currentPage,
        per_page: POSTS_PER_PAGE,
        with_meta: true,
        category_id: category.id
    })

    return (
        <>
            {category.posts.length === 0 ? (
                <PreTag className='flex h-full flex-col items-center justify-center'>

                    <span className="text-muted rounded-lg bg-[var(--color-accent)] px-5 py-10 text-xl italic">
                        Oops! No posts available in this category.
                    </span>
                </PreTag>
            ) : (
                <PreTag className='flex w-[90vw] flex-wrap flex-col justify-center space-y-5 rounded-lg lg:flex-row lg:w-[70vw] lg:gap-5'>
                    <PostsPagination posts={dataWithMeta.data} meta={dataWithMeta.meta} />
                </PreTag>
            )}

        </>
    )
}