// app/[slug]/page.tsx
import { notFound } from 'next/navigation'
//import { Metadata } from 'next'
import { capitalize } from '@/utils/capitalize'
import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PrePage } from '@/components/juankui/pre-rendered/pre-page'
//import { PageSlugProps } from '@/types/types'
import { fetchPageById, fetchSiteSettings } from '@/api-fetcher/fetcher'
import { getPageSlugToIdMap } from '@/lib/utils'
import { PreHomePage } from '@/components/juankui/pre-rendered/pre-home'
import DynamicStyle from '@/components/juankui/css-content'
//import { Metadata } from 'next'
async function getHomePageFromParams() {

  const map = await getPageSlugToIdMap();
  const slug = "home";
  const id = map[slug];

  if (!id) throw notFound();

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


  if (!id) return notFound()

  const category = await fetchPageById(id)
  return category
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    const page = await getPageFromParams({ params })

    return {
      title: capitalize(page.title || ''),
      description: capitalize(page.meta_description || ''),
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    notFound()
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

      if (!page || page.status !== 'published') return notFound()

      return (
        <PrePage page={page}>
          <HtmlRenderer html={page.html_content} cssContent={page.css_content} />
        </PrePage>
      )
    } catch (error) {
      console.log('Error generating metadata:', error)
      notFound()
    }
  }

}
