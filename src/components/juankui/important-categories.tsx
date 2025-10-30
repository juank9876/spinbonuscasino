import { Link } from "@/components/juankui/optionals/link";
import { ArrowRight } from "lucide-react";
import { fetchImportantCategories, ImportantCategory } from "@/api-fetcher/fetcher";
import Image from "next/image";


export async function ImportantCategories() {
    const categories = await fetchImportantCategories({ limit: 5, posts_per_category: 3 })
    if (categories.length === 0) return null

    return (
        <div className="space-y-5">
            {/* Mapeo de categorías */}
            {categories.map((category) => (
                <div key={category.id} className="space-y-3">
                    {/* Header de la categoría */}
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900 padding-none">
                            {category.name}
                        </h2>
                        {category.description && (
                            <p className="text-gray-600 text-base ">
                                {category.description}
                            </p>
                        )}
                    </div>

                    {/* Posts de la categoría */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {category.posts.map((post) => (
                            <Link
                                key={post.id}
                                href={post.url}
                                className="group flex flex-col bg-white border border-gray-200 hover:shadow-lg transition-all duration-200 rounded-lg overflow-hidden"
                            >
                                {/* Imagen */}
                                <div className="relative w-full h-[180px] overflow-hidden">
                                    <Image
                                        src={post.image || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop"}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>

                                {/* Contenido */}
                                <div className="flex flex-col px-4 flex-1">
                                    <h3 className="text-base hover:underline font-bold text-gray-900 transition-colors line-clamp-2 mt-4 mb-2 padding-none">
                                        {post.title}
                                    </h3>
                                    <p className="text-xs text-gray-600 line-clamp-3 mb-3 padding-none">
                                        {post.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* CTA - View All */}
                    <div className="flex justify-end">
                        <Link
                            href={category.url}
                            className="group flex items-center gap-1 text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-semibold transition-colors duration-200"
                        >
                            More
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Separador entre categorías */}
                    {categories.indexOf(category) < categories.length - 1 && (
                        <div className="w-full h-px bg-gray-200 mt-8" />
                    )}
                </div>
            ))}
        </div>
    );
}
