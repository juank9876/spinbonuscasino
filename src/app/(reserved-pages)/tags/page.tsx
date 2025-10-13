import { fetchTags } from "@/api-fetcher/fetcher";
import { Link } from "@/components/juankui/optionals/link";
import { createPageTitle, formatDate } from "@/lib/utils";
import { capitalize } from "@/utils/capitalize";


export async function generateMetadata() {
    return {
        title: await createPageTitle("Tags", "Tags"),
        description: capitalize("This is the categories site"),
    }
}

export default async function TagPage() {
    const tags = await fetchTags()

    if (tags.length === 0) {
        return (
            <main className="pt-20 flex flex-1 bg-[var(--color-primary-dark)]">
                <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 py-24">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Explore Tags
                        </h1>
                        <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                            Discover content organized by topics and themes
                        </p>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-white font-bold text-2xl">#</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No tags found</h3>
                        <p className="text-slate-400">Tags will appear here once content is created</p>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="pt-20 flex flex-1 flex-col bg-[var(--color-primary-dark)]">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-center ">
                Tags
            </h1>

            {/* Tags Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-wrap items-center justify-center gap-5">
                    {tags.map(tag => (
                        <Link
                            href={`/tags/${tag.slug}`}
                            key={tag.id}
                            className="group relative justify-between flex flex-col bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                        >
                            {/* Tag Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                                        {tag.name}
                                    </h3>

                                </div>
                                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="text-white font-bold text-sm">{tag.post_count}</span>
                                </div>
                            </div>

                            {/* Tag Description */}
                            <p className="text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                                {tag.description || "Explore posts related to this topic"}
                            </p>

                            {/* Tag Footer */}
                            <div className="flex items-center justify-between text-xs text-slate-400">
                                <span className="text-white">Created {formatDate(tag.created_at)}</span>
                                <div className="flex items-center gap-1 group-hover:text-purple-300 transition-colors">
                                    <span className="text-white">View posts</span>
                                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Hover Effect Overlay */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 transition-all duration-300 pointer-events-none"></div>
                        </Link>
                    ))}
                </div>

                {/* Empty State Enhancement */}
                {tags.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-white font-bold text-2xl">#</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No tags found</h3>
                        <p className="text-slate-400">Tags will appear here once content is created</p>
                    </div>
                )}
            </div>
        </main>
    );
};
