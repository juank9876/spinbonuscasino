import { handleRedirect } from '@/utils/handleRedirect'
import { createMetadata } from '@/app/seo/createMetadata'
import NotFound from '@/app/not-found'
import { getContentData, isCheckUrlPermalink } from '@/lib/fetch-data/getPageOrPostData'
import { createCategory, createPage, createPost } from './page-post-category'




export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params
    const slugString = slug.join("/")

    await handleRedirect(slugString)
    return await createMetadata(slug[slug.length - 1])
}


export default async function Page({ params, searchParams }: { params: Promise<{ slug: string[] }>, searchParams: Promise<{ page?: string }> }) {
    console.log("WORKING")
    //PASO 1. OBTENER EL SLUG Y LOS SEARCH PARAMS
    const { slug } = await params
    const slugString = '/' + slug.join("/") + '/'; // "a/b/c"
    const content = await getContentData(slug[slug.length - 1])

    if (!content) return <NotFound />

    //PASO 2. VALIDAR LA URL Y REDIRECCIONAR SI ES NECESARIO
    await handleRedirect(slugString)


    const isValidUrl = await isCheckUrlPermalink(slug[slug.length - 1], slugString, content?.type)
    if (!isValidUrl) return <NotFound />

    //PASO 3. RENDERIZAR EL CONTENIDO
    console.log(content.type)

    switch (content.type) {
        case "post": return createPost({ content })
        case "page": return createPage({ content })
        case "category": return await createCategory({ content, searchParams })
        default: return <NotFound />
    }
}







