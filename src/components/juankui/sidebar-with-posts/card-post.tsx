import { Post } from "@/types/types";

interface NewsCardProps {
    post: Post;
    isCompact?: boolean;
}

export function NewsCard({ post, isCompact = false }: NewsCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    };

    if (isCompact) {
        return (
            <article className="group">
                <a href={post.seo_url} className="flex gap-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors duration-200">
                    {post.featured_image && (
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                            <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        {post.primary_category && (
                            <span className="inline-block text-[10px] font-bold text-[var(--color-accent)] uppercase tracking-wide mb-1">
                                {post.primary_category.name}
                            </span>
                        )}

                        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 group-hover:text-[var(--color-accent)] transition-colors line-clamp-2 padding-none">
                            {post.title}
                        </h3>

                        <div className="flex items-center text-[11px] text-gray-500 mt-1 gap-2">
                            <time dateTime={post.published_at}>
                                {formatDate(post.published_at)}
                            </time>
                            <span>•</span>
                            <span>{post.view_count} views</span>
                        </div>
                    </div>
                </a>
            </article>
        );
    }

    return (
        <article className="group">
            <a href={post.seo_url} className="block">
                {post.featured_image && (
                    <div className="relative aspect-video mb-3 rounded-lg overflow-hidden bg-gray-100">
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}


                {post.primary_category && (
                    <div className="mb-2">
                        <span className="px-2 py-1 text-[10px] font-bold text-white bg-[var(--color-primary)] rounded uppercase tracking-wider">
                            {post.primary_category.name}
                        </span>
                    </div>
                )}

                <h3 className="font-bold text-gray-900 text-base leading-tight mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-200 padding-none">
                    {truncateText(post.title, 90)}
                </h3>

                {post.excerpt && (
                    <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2 padding-none">
                        {post.excerpt}
                    </p>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-500">
                    {post.author_avatar && (
                        <img
                            src={post.author_avatar}
                            alt={post.author_name}
                            className="w-6 h-6 rounded-full"
                        />
                    )}
                    <span className="font-medium">{post.author_name}</span>
                    <span>•</span>
                    <time dateTime={post.published_at}>
                        {formatDate(post.published_at)}
                    </time>
                    <span>•</span>
                    <span>{post.view_count} views</span>
                </div>
            </a>
        </article>
    );
}