import { fetchCategories } from "@/api-fetcher/fetcher"
import { Link } from "@/components/juankui/optionals/link"
import { Section } from "@/components/juankui/wrappers/section"
import { ShineBorder } from "@/components/magicui/shine-border"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

export default async function CategoriesPage() {
  const categories = await fetchCategories()
  return (
    <main className={`flex w-full flex-1 flex-col items-center justify-center pb-10`}>
      <Section className="h-full items-center flex flex-col justify-center my-10">
        <div className=' grid grid-cols-2 gap-5 items-center justify-center space-x-0 space-y-5 lg:max-w-[60vw] lg:flex-row lg:flex-wrap lg:space-x-5 lg:space-y-0'>
          {categories?.map((category) => (
            <Card key={category.seo_url} className="duration-400 scale-custom relative h-full w-full overflow-hidden border-none p-0 shadow-none transition hover:bg-[var(--color-primary-dark)]">
              <Link href={`/categories/${category.seo_url}`} className="flex w-full">
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

                {/* Imagen como background */}
                <div
                  className="h-ful relative w-full bg-cover bg-center"
                >
                  {/* Overlay oscuro con filtro */}
                  <div className="backdrop-blur-xs absolute inset-0 h-full bg-black/70"></div>

                  {/* Contenido centrado */}
                  <CardContent className="relative z-10 flex h-[250px] flex-col justify-between p-8 text-white">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold">{category.name}</h2>
                      <p className="text-sm text-white opacity-80">{formatDate(category.created_at)}</p>
                      <p className="text-base text-white opacity-90">{category.description}</p>
                    </div>
                  </CardContent>
                </div>
              </Link>
            </Card>
          ))
          }
        </div>
      </Section>
    </main>
  )
}