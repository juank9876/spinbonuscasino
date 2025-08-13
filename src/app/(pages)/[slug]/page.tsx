import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PrePage } from '@/components/juankui/pre-rendered/pre-page'
import { fetchPageById, fetchSlugToId } from '@/api-fetcher/fetcher'
import NotFound from '@/app/not-found'
import { createMetadata } from '@/app/seo/createMetadata'
/*
async function getHomePageFromParams() {

  const map = await getPageSlugToIdMap();
  const slug = "home";
  const id = map[slug];


  const homePage = await fetchPageById(id)
  return homePage
}
*/
async function getPageFromParams({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params
  const id = await fetchSlugToId(slug)

  const page = await fetchPageById(id)
  return page
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const page = await getPageFromParams({ params })

  return await createMetadata(page);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  try {
    const page = await getPageFromParams({ params })

    if (!page || page.status !== 'published') return <NotFound />
    return (
      <PrePage page={page}>
        <HtmlRenderer html={page.html_content} cssContent={page.css_content} />
      </PrePage>
    )
  } catch (error) {
    console.log('404 Not found')
    return <NotFound />
  }

}
