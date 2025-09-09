import { fetchHomePage, fetchSiteSettings } from '@/api-fetcher/fetcher'
import { createMetadata } from '@/app/seo/createMetadata'
import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PreHomePage } from '@/components/juankui/pre-rendered/pre-home'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await fetchHomePage()
  return await createMetadata(homePage, false);
}



export default async function Home() {
  const homePage = await fetchHomePage()
  const settings = await fetchSiteSettings()

  if (homePage) return (
    <PreHomePage
      settings={settings}
      pageProps={homePage}
    >
      <HtmlRenderer cssContent={homePage.css_content || undefined} html={homePage.html_content} />
    </PreHomePage>

  )
  return (
    <PreHomePage
      settings={settings}
      pageProps={homePage}
    >
      <div className="text-2xl font-bold">No home page found</div>
    </PreHomePage>
  )
}
