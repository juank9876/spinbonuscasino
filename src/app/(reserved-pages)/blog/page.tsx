// app/blog/page.tsx
import { fetchArticles } from "@/api-fetcher/fetcher";
import { PostsPagination } from "../../../components/juankui/posts-with-pagination";
import { Post } from "@/types/types";

type Props = {
    searchParams?: Promise<{ page?: string }>;
};


export default async function BlogWithPostsPage({ searchParams }: Props) {
    const currentPage = Number((await searchParams)?.page || 1)
    const POSTS_PER_PAGE = 10
    const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

    const dataWithMeta = await fetchArticles({
        pagination: currentPage,
        per_page: POSTS_PER_PAGE,
        with_meta: true
    })

    const posts: Post[] = dataWithMeta.data;
    const meta = dataWithMeta.meta;

    return (
        <main className="min-h-screen w-full py-20 px-4">
            <div className="max-w-[90vw] mx-auto">
                <PostsPagination posts={posts} meta={meta} />
            </div>
        </main>
    );
}