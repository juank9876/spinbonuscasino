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
        <main className="min-h-screen w-full bg-[var(--color-primary-dark)] py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl text-center mb-10 text-slate-200 font-bold">
                    All posts of {NEXT_PUBLIC_SITE_URL}
                </h2>


                <PostsPagination posts={posts} meta={meta} />
            </div>
        </main>
    );
}