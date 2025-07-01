//import data from '@/lib/data.json'

import { fetchPageById, fetchSiteSettings } from '@/api-fetcher/fetcher'
import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PreHomePage } from '@/components/juankui/pre-rendered/pre-home'
import { getPageSlugToIdMap } from '@/lib/utils'
import { notFound } from 'next/navigation'
//parse, 


async function getHomePageFromParams () {

  const map = await getPageSlugToIdMap();
  const slug = "";
  const id = map[slug];

  if (!id) throw notFound();

  const homePage = await fetchPageById(id)
  return homePage
}

export default async function Home () {
  /*
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode.type === 'tag') {
        const el = domNode as Element

        // Modificar "div"
        if (el.attribs?.class === 'card') {
          return (
            <div className="rounded-lg border border-yellow-400 px-3 py-5">
              {domToReact(el.children as DOMNode[], options)}
            </div>
          )
        }

        if (el.attribs?.class?.includes('text-element')) {
          return (
            <div className="py-5">
              {domToReact(el.children as DOMNode[], options)}
            </div>
          )
        }

        // Reemplazar "row"
        if (el.attribs?.class?.includes('row')) {
          return (
            <div className="flex flex-1 items-center justify-between gap-4">
              {domToReact(el.children as DOMNode[], options)}
            </div>
          )
        }

        // Reemplazar botón Bootstrap
        if (el.attribs?.class?.includes('btn')) {
          return (
            <a
              href={el.attribs.href || '#'}
              className="flex w-fit rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              {domToReact(el.children as DOMNode[], options)}
            </a>
          )
        }
      }

      return undefined
    },
  }
*/

  const page = await getHomePageFromParams()
  const settings = await fetchSiteSettings()
  //console.log(settings)
  if (page) return (

    <PreHomePage
      settings={settings}
    >
      <HtmlRenderer html={page.html_content} />
    </PreHomePage>

  )
  return notFound()
}
