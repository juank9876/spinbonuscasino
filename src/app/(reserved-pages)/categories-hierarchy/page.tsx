import NotFound from "@/app/not-found";
import { CategoryHierarchy } from "./hierarchy"


export default async function CategoriesPage() {
    //const categories = await fetchCategories()
    const apiKey = process.env.API_KEY;
    const projectId = process.env.PROJECT_ID;
    const apiDomain = process.env.API_DOMAIN || "https://intercms.dev"
    const domain = process.env.NEXT_PUBLIC_SITE_URL || "https://spinbonuscasino.com"

    const data = await fetch(
        `${apiDomain}/api/v2/data.php?method=categories&api_key=${apiKey}&project_id=${projectId}&per_page=50`,
        {
            headers: {
                'User-Agent': `MyApp/1.0; ${domain}`
            },
        }
    )
    const dataRaw = await data.json()
    const categories = dataRaw.data
    if (process.env.CATEGORIES_HIERARCHY === "true") return (
        <div className="w-full h-screen overflow-hidden">
            <CategoryHierarchy categories={categories} />
        </div>
    )
    return <NotFound />
}