import { fetchCustomScript, fetchHomePage, fetchSiteSettings } from '@/api-fetcher/fetcher'
import { createMetadata } from '@/app/seo/createMetadata'
import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PreHomePage } from '@/components/juankui/pre-rendered/pre-home'
import { Metadata } from 'next'
import { CustomHTMLRenderer } from "../../seo/customScripts";
import { handleRedirect } from '@/utils/handleRedirect'
import { ArrowRight, Construction, HomeIcon } from 'lucide-react'
import { Link } from '@/components/juankui/optionals/link'



export async function generateMetadata(): Promise<Metadata> {
  await handleRedirect('/')
  return await createMetadata('/');
}



export default async function Home() {
  await handleRedirect('/')
  const homePage = await fetchHomePage()
  const settings = await fetchSiteSettings()
  const customScripts = await fetchCustomScript()

  function UnderConstruction() {
    return (
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full"></div>
              <Construction className="w-24 h-24 text-yellow-700 animate-pulse relative" strokeWidth={1.5} />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold ">
              Under Construction
            </h1>
            <p className="text-xl text-gray-700">
              We're working on something amazing
            </p>
          </div>

          {/* Description */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-4">
            <p className="text-gray-700 text-lg leading-relaxed">
              Our team is working hard to bring you an exceptional experience.
              Soon you'll be able to enjoy new and exciting content.
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-500">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-sm text-gray-400 pt-8">
            Have any questions? Contact us and we'll be happy to help.
          </p>
        </div>
      </div>
    )
  }

  if (homePage) return (
    <PreHomePage
      settings={settings}
      pageProps={homePage}
    >

      <HtmlRenderer cssContent={homePage.css_content || undefined} html={homePage.html_content} />
      <CustomHTMLRenderer content={customScripts.custom_scripts} />
    </PreHomePage>

  )
  return <UnderConstruction />
}
