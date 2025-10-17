import { fetchArticlesByCategoryId } from "@/api-fetcher/fetcher";
import { ArrowRight, FolderCheck, Newspaper } from "lucide-react";
import { Link } from "../optionals/link";
import { NewsCard } from "./card-post";

export async function CategoryPosts({ category, className, postId }: { category: { id: string | undefined, name: string | undefined, slug: string | undefined }, className?: string, postId?: string }) {
    if (!category.id) return null;

    let posts = await fetchArticlesByCategoryId(category.id);
    posts = posts.filter((post) => post.id !== postId)

    if (!posts || posts.length === 0) {
        return null;
    }

    const [featuredPost, ...otherPosts] = posts;

    return (
        <aside className={`bg-white rounded-xl h-fit border border-gray-200 overflow-hidden shadow-sm top-20 ${className}`}>
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[var(--color-primary-semi-dark)] to-[var(--color-primary-dark)] px-5 py-2">
                <div className="flex items-center gap-2">
                    <FolderCheck className="w-5 h-5 text-white" />
                    <h2 className="text-lg font-bold text-white padding-none">Category: {category.name}</h2>
                </div>
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            </div>

            <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
                {/* Featured Article */}
                {featuredPost && (
                    <div className="p-5 border-b-2 border-gray-100">

                        <NewsCard post={featuredPost} />
                    </div>
                )}

                {/* Other Posts */}
                <div className="p-5 space-y-4">
                    {otherPosts.map((post) => (
                        <NewsCard key={post.id} post={post} isCompact />
                    ))}
                </div>

                {/* View More Button */}
                <div className="p-5 pt-0">
                    <Link
                        href={'/blog'}
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 text-sm font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] hover:text-white rounded-lg transition-all duration-200 group"
                    >
                        <span>View all</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </aside>
    );
};
