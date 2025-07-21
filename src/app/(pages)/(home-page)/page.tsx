//import data from '@/lib/data.json'

import { fetchPageById, fetchSiteSettings } from '@/api-fetcher/fetcher'
import NotFound from '@/app/not-found'
import HtmlRenderer from '@/components/html-transform/html-renderer'
import DynamicStyle from '@/components/juankui/css-content'
import { PreHomePage } from '@/components/juankui/pre-rendered/pre-home'
import { getPageSlugToIdMap } from '@/lib/utils'
import { notFound } from 'next/navigation'
//parse, 


async function getHomePageFromParams() {

  const map = await getPageSlugToIdMap();
  console.log(map)
  let slug = "/";
  let id = map[slug];


  if (!id) {
    slug = "home"
    id = map[slug]
  }
  console.log(id)

  const homePage = await fetchPageById(id)

  /*
  if (homePage.is_home === "1") {
    return homePage
  }
*/
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

      <HtmlRenderer html={page.html_content} cssContent={page.css_content} />
    </PreHomePage>

  )
  return notFound()
}
