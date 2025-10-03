import { CategoryHierarchy } from "./hierarchy"


export default async function CategoriesPage() {
    //const categories = await fetchCategories()
    const apiKey = process.env.API_KEY;
    const projectId = process.env.PROJECT_ID;
    const data = await fetch(
        `https://intercms.dev/api/v2/data.php?method=categories&api_key=${apiKey}&project_id=${projectId}&per_page=50`
    )
    const dataRaw = await data.json()
    const categories = dataRaw.data
    return (
        <div className="w-full h-screen overflow-hidden">
            <CategoryHierarchy categories={categories} />
        </div>
    )
}