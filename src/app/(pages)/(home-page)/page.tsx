//import data from '@/lib/data.json'

import { fetchPageById, fetchSiteSettings } from '@/api-fetcher/fetcher'
import NotFound from '@/app/not-found'
import { createMetadata } from '@/app/seo/createMetadata'
import HtmlRenderer from '@/components/html-transform/html-renderer'
import DynamicStyle from '@/components/juankui/css-content'
import { PreHomePage } from '@/components/juankui/pre-rendered/pre-home'
import { createPageTitle, getPageSlugToIdMap } from '@/lib/utils'
import { capitalize } from '@/utils/capitalize'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePageFromParams();
  return await createMetadata(page);
}

async function getHomePageFromParams() {

  const map = await getPageSlugToIdMap();

  let slug = "/";
  let id = map[slug];

  if (!id) {
    slug = "home"
    id = map[slug]
  }

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
  return <NotFound />
}
