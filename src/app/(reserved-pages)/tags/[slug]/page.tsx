import { fetchArticles, fetchSlugToId, fetchTagById } from "@/api-fetcher/fetcher";
import NotFound from "@/app/not-found";
import { PreTag } from "@/components/juankui/pre-rendered/pre-tag";
import { getContentData, getContentDataTag } from "@/lib/fetch-data/getPageOrPostData";
import { handleRedirect } from "@/utils/handleRedirect";
import { PostsPagination } from "../../../../components/juankui/posts-with-pagination";
import { Post } from "@/types/types";
import { createPageWithDescription } from "@/utils/metadata-generator";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const content = await getContentDataTag(slug)

    const pageMeta = await createPageWithDescription(content?.data.name);

    return {
        ...pageMeta, // esto agrega title y description
    };
}

export default async function TagsPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams?: Promise<{ page?: string }> }) {
    const { slug } = await params
    const content = await getContentDataTag(slug)
    if (!content) return <NotFound />

    const currentPage = Number((await searchParams)?.page || 1)
    const POSTS_PER_PAGE = 10
    const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

    //Se puede hacer un fetchArticles y filtrar por Tag, o hacer un fetchTagById y traer los posts (de getContentData)
    const dataWithMeta = await fetchArticles({
        pagination: currentPage,
        per_page: POSTS_PER_PAGE,
        with_meta: true,
        tag_id: content.data.id
    })
    const posts: Post[] = dataWithMeta.data;
    const meta = dataWithMeta.meta;

    return (
        <main className="w-full flex flex-1 justify-center items-center flex-col h-full">

            <div className="max-w-7xl">
                <PostsPagination posts={posts} meta={meta} />
            </div>


        </main>
    );
};
