import { fetchArticles } from "@/api-fetcher/fetcher";
import NotFound from "@/app/not-found";
import { getContentAuthor, getContentData, getContentDataTag } from "@/lib/fetch-data/getPageOrPostData";
import { PostsPagination } from "../../../../components/juankui/posts-with-pagination";
import { Post } from "@/types/types";

export async function generateMetadata ({ params }: { params: Promise<{ author: string }> }) {
  const { author } = await params
  const authorContent = await getContentAuthor(author)

  return {
    robots: {
      index: authorContent?.data.robots_index === "index"
    }
  }
}

export default async function AuthorPage ({ params, searchParams }: { params: Promise<{ author: string }>, searchParams?: Promise<{ page?: string }> }) {
  const { author } = await params
  const authorContent = await getContentAuthor(author)
  if (!authorContent) return <NotFound />

  const currentPage = Number((await searchParams)?.page || 1)
  const POSTS_PER_PAGE = 10

  //Se puede hacer un fetchArticles y filtrar por Tag, o hacer un fetchTagById y traer los posts (de getContentData)
  const dataWithMeta = await fetchArticles({
    pagination: currentPage,
    per_page: POSTS_PER_PAGE,
    with_meta: true,
    author_id: authorContent.data.id
  })
  const posts: Post[] = dataWithMeta.data;
  const meta = dataWithMeta.meta;

  return (
    <main className="flex h-full w-full flex-1 flex-col items-center justify-center bg-[var(--color-primary-dark)]">

      <div className="max-w-7xl">
        <h2 className="mb-10 text-center text-2xl font-bold text-slate-200">
          All posts of
        </h2>
        <PostsPagination posts={posts} meta={meta} />
      </div>
    </main>
  );
};
