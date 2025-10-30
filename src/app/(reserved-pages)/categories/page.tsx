import { fetchCategories, fetchSiteSettings } from "@/api-fetcher/fetcher"
import { Link } from "@/components/juankui/optionals/link"
import { formatDate, limitCharacters } from "@/lib/utils"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
    const settings = await fetchSiteSettings()

    return {
        title: `Categorías | ${settings.site_title}`,
        description: `Explora todas las categorías de ${settings.site_title}. Encuentra contenido organizado por temas de tu interés.`,
        openGraph: {
            title: `Categorías | ${settings.site_title}`,
            description: `Explora todas las categorías de ${settings.site_title}. Encuentra contenido organizado por temas de tu interés.`,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/categories`,
            type: 'website',
        },
        twitter: {
            card: 'summary',
            title: `Categorías | ${settings.site_title}`,
            description: `Explora todas las categorías de ${settings.site_title}. Encuentra contenido organizado por temas de tu interés.`,
        },
    }
}

export default async function CategoriesPage() {
    const categories = await fetchCategories()

    return (
        <main className=" flex w-full flex-1 flex-col items-center justify-center pb-10">
            <h1 className="text-4xl md:text-5xl font-bold  mb-6 text-center ">
                Categories
            </h1>
            <div className="container mx-auto px-4 ">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categories?.map((category) => (
                        <Link
                            key={category.seo_url}
                            href={category.seo_url}
                            className="group relative overflow-hidden rounded-lg bg-slate-800 px-5 py-2 shadow-lg transition-all duration-300 hover:bg-[var(--color-primary-dark)] hover:shadow-xl"
                        >
                            <div className="flex min-h-[200px] flex-col justify-between">
                                <div className="space-y-3">
                                    <h2 className="text-2xl font-bold text-white line-clamp-2">
                                        {category.name}
                                    </h2>
                                    <p className="text-sm text-white/70">
                                        {formatDate(category.created_at)}
                                    </p>
                                    <p className="text-sm leading-relaxed text-white/90 line-clamp-4">
                                        {limitCharacters(category.description, 120)}
                                    </p>
                                </div>

                                <button className="group-hover:translate-x-1 transition-transform cursor-pointer mt-4  w-fit py-2 px-3 rounded-full flex items-center text-sm font-medium text-white/80 group-hover:text-white ">
                                    <svg
                                        className=" h-4 w-4 "
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}