import { fetchCustomScript, fetchHomePage, fetchSiteSettings } from '@/api-fetcher/fetcher'
import { createMetadata } from '@/app/seo/createMetadata'
import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PreHomePage } from '@/components/juankui/pre-rendered/pre-home'
import { Metadata } from 'next'
import { CustomHTMLRenderer } from "../../seo/customScripts";
import { handleRedirect } from '@/utils/handleRedirect'



export async function generateMetadata(): Promise<Metadata> {
  await handleRedirect('/')
  return await createMetadata('/');
}



export default async function Home() {
  await handleRedirect('/')
  const homePage = await fetchHomePage()
  const settings = await fetchSiteSettings()
  const customScripts = await fetchCustomScript()

  if (homePage) return (
    <PreHomePage
      settings={settings}
      pageProps={homePage}
    >

      <HtmlRenderer cssContent={homePage.css_content || undefined} html={homePage.html_content} />
      <CustomHTMLRenderer content={customScripts.custom_scripts} />
    </PreHomePage>

  )
  return (
    <PreHomePage
      settings={settings}
      pageProps={homePage}
    >
      <div className="text-2xl py-20 lg:py-0 font-bold">404 - No home page found</div>
    </PreHomePage>
  )
}
