
import { Post } from "@/types/types";
import { MetaArticle } from "@/api-fetcher/fetcher";
import { Link } from "@/components/juankui/optionals/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CardPostCategory } from "@/components/juankui/card-post-category";

type BlogPostsProps = {
    posts: Post[];
    meta: MetaArticle;
};

export function PostsPagination({ posts, meta }: BlogPostsProps) {
    const currentPage = Number(meta.current_page);
    console.log(posts)
    return (
        <>

            {/* Posts */}
            <div className="flex flex-wrap flex-row gap-6 mb-12">
                {posts.map((post) => (
                    <CardPostCategory key={post.id} post={post} />
                ))}
            </div>

            {/* Paginación con links */}
            <div className="flex items-center justify-center gap-4 w-full py-5">
                {meta.prev_page ? (
                    <Link
                        href={`/blog?page=${meta.prev_page}`}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 hover:bg-slate-700 hover:border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-800 disabled:hover:border-slate-700 transition-all duration-300 font-semibold"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                ) : (
                    <button disabled className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 hover:bg-slate-700 hover:border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-800 disabled:hover:border-slate-700 transition-all duration-300 font-semibold">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                )}

                {Array.from({ length: meta.total_pages }, (_, i) => i + 1).map((page) => (
                    <Link
                        key={page}
                        href={`?page=${page}`}
                        className={`px-6 py-3 rounded-lg font-bold shadow-lg transition-all duration-300 ${page === currentPage
                            ? "bg-gradient-to-br from-slate-400 to-slate-500 text-white underline shadow-blue-500/20"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-400 hover:to-purple-400"
                            }`}
                    >
                        {page}
                    </Link>
                ))}

                {meta.next_page ? (
                    <Link
                        href={`?page=${meta.next_page}`}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 hover:bg-slate-700 hover:border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-800 disabled:hover:border-slate-700 transition-all duration-300 font-semibold"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                ) :
                    <button disabled className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 hover:bg-slate-700 hover:border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-800 disabled:hover:border-slate-700 transition-all duration-300 font-semibold">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                }
            </div>
        </>

    );
}