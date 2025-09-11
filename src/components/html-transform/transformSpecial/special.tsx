import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import BrandlistyWidget from '../../juankui/brandlisty/brandlisty-widget'

export function transformBrandlisty(el: Element) {
  const { apikey, listid, boton, limit, id } = el.attribs

  return (
    <div id={el.attribs?.id} className={`flex h-full flex-col ${el.attribs?.class || ''}`}>
      <BrandlistyWidget
        key={id}
        apiKey={apikey || el.attribs['data-apikey']}
        listId={listid || el.attribs['data-listid']}
        boton={boton || el.attribs['data-boton']}
        limit={limit || el.attribs['data-limit']}
      />
    </div>
  )
}

export function transformTestimonials(el: Element, options: HTMLReactParserOptions) {
  return (
    <section className={`testimonials py-12 px-4  flex flex-col items-center justify-center w-full ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </section>
  )
}

export function transformBlockquote(el: Element, options: HTMLReactParserOptions) {
  // Busca el span (nombre usuario)
  const userSpan = (el.children as Element[]).find(child => child.name === 'span');
  const quoteText = (el.children as DOMNode[]).filter(child => child !== userSpan);
  return (
    <blockquote className={`relative bg-white rounded-2xl shadow-lg p-8 my-4 max-w-xl mx-auto text-slate-800 text-lg font-medium flex flex-col items-center ${el.attribs?.class || ''}`}>
      <span className="absolute left-4 top-2 text-5xl text-blue-200 font-serif select-none">"</span>
      <span className="block text-center z-10">{domToReact(quoteText, options)}</span>
      {userSpan && (
        <span className="block mt-6 text-[var(--color-accent)] font-semibold text-base">{domToReact([userSpan], options)}</span>
      )}
    </blockquote>
  )
}

export function transformTakeaways(el: Element, options: HTMLReactParserOptions) {
  return (
    <div className='max-w-full flex justify-center items-center w-full'>
      <section {...el.attribs} className={`${el.attribs?.class || ''} w-full`}>
        {domToReact(el.children as DOMNode[], options)}
      </section>
    </div>
  )
}
