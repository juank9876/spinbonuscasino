//import data from '@/lib/data.json'

import { fetchPageById, fetchSiteSettings } from '@/api-fetcher/fetcher'
import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PreHomePage } from '@/components/juankui/pre-rendered/pre-home'
import { getPageSlugToIdMap } from '@/lib/utils'
import { notFound } from 'next/navigation'
//parse, 


async function getHomePageFromParams() {

  const map = await getPageSlugToIdMap();
  const slug = "";
  const id = map[slug];

  if (!id) throw notFound();

  const homePage = await fetchPageById(id)
  return homePage
}

export default async function Home() {
  const page = await getHomePageFromParams()
  const settings = await fetchSiteSettings()
  //console.log(settings)
  if (page) return (

    <PreHomePage
      settings={settings}
      pageProps={page}
    >
      <HtmlRenderer html={page.html_content} />
    </PreHomePage>

  )
  return notFound()
}
