import { fetchCheckRedirect, fetchHomePage, fetchSiteSettings } from '@/api-fetcher/fetcher'
import { createMetadata } from '@/app/seo/createMetadata'
import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PreHomePage } from '@/components/juankui/pre-rendered/pre-home'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

async function getRedirectFromParams({ slug }: { slug: string }) {
  const redirectData = await fetchCheckRedirect(slug)
  console.log("redirectData", redirectData)
  console.log("slug", slug)
  if (redirectData.has_redirect) {
    redirect(redirectData.target_url) // ⚡ detiene la renderización y redirige
  }
}

export async function generateMetadata(): Promise<Metadata> {

  const homePage = await fetchHomePage()
  return await createMetadata(homePage, false);
}



export default async function Home() {
  await getRedirectFromParams({ slug: '/' })
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
      <div className="text-2xl py-20 lg:py-0 font-bold">404 - No home page found</div>
    </PreHomePage>
  )
}
