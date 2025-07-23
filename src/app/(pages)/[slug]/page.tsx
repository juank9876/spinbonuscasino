import { capitalize } from '@/utils/capitalize'
import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PrePage } from '@/components/juankui/pre-rendered/pre-page'
import { fetchPageById, fetchSiteSettings } from '@/api-fetcher/fetcher'
import { createPageTitle, getPageSlugToIdMap } from '@/lib/utils'
import { PreHomePage } from '@/components/juankui/pre-rendered/pre-home'
import NotFound from '@/app/not-found'

async function getHomePageFromParams() {

  const map = await getPageSlugToIdMap();
  const slug = "home";
  const id = map[slug];


  const homePage = await fetchPageById(id)
  return homePage
}

async function getPageFromParams({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const map = await getPageSlugToIdMap()
  const { slug } = await params
  const id = map[slug]


  const category = await fetchPageById(id)
  return category
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const page = await getPageFromParams({ params })
  try {
    return {
      title: await createPageTitle(page.title),
      description: capitalize(page.meta_description || ''),
    }
  } catch (error) {

    return <NotFound />
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  if ((await params).slug === "home") {

    const page = await getHomePageFromParams()
    const settings = await fetchSiteSettings()

    if (page) return (

      <PreHomePage
        settings={settings}
        pageProps={page}
      >

        <HtmlRenderer html={page.html_content} cssContent={page.css_content} />
      </PreHomePage>
    )
  } else {

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

}
