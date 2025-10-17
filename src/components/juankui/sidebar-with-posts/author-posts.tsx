import { fetchArticlesByAuthorId } from "@/api-fetcher/fetcher";
import { NewsCard } from "./card-post";
import { Smile } from "lucide-react";



export async function AuthorPosts({ author, className, postId }: { author: { id: string, name: string, avatar: string, bio: string }, className?: string, postId?: string }) {
    if (!author.id) return null;

    let posts = await fetchArticlesByAuthorId(author.id)
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
                    <Smile className="w-5 h-5 text-white" />
                    <h2 className="text-lg font-bold text-white padding-none">More of {author.name}</h2>
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
                    {otherPosts.map((post) => {
                        return (

                            <NewsCard key={post.id} post={post} isCompact />

                        )
                    })}
                </div>


            </div>
        </aside>
    );
};
