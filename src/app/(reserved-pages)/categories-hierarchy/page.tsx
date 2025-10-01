import { CategoryHierarchy } from "./hierarchy"


export default async function CategoriesPage() {
    //const categories = await fetchCategories()
    const data = await fetch(
        "https://intercms.dev/api/v2/data.php?method=categories&api_key=web_1475846333cdb47427ee61484f182c3f82bcc30965ca2b42e277811fb1bb&project_id=7&per_page=50"
    )
    const dataRaw = await data.json()
    const categories = dataRaw.data
    return (
        <div className="w-full h-screen overflow-hidden">
            <CategoryHierarchy categories={categories} />
        </div>
    )
}