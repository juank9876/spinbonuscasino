import { fixAttribs } from '@/lib/utils';
import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import BrandlistyWidget from '../../juankui/brandlisty/.legacy/brandlisty-original'

export function transformBrandlisty (el: Element) {
  const attribs = fixAttribs(el.attribs)
  const { apikey, listid, boton, limit, id } = attribs
  console.log("Brandlisty detectado")
  return (
    <div {...attribs} className={`flex h-full flex-col ${attribs.className || ''}`}>
      <BrandlistyWidget
        key={id}
        apiKey={apikey || attribs['data-apikey']}
        listId={listid || attribs['data-listid']}
        boton={boton || attribs['data-boton']}
        limit={limit || attribs['data-limit']}
      />
    </div>
  )
}

export function transformTestimonials (el: Element, options: HTMLReactParserOptions) {
  const attribs = fixAttribs(el.attribs)

  return (
    <section {...attribs} className={`testimonials py-12 px-4 flex flex-col items-center justify-center w-full ${attribs.className || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </section>
  )
}

export function transformBlockquote (el: Element, options: HTMLReactParserOptions) {
  const attribs = fixAttribs(el.attribs)
  // Busca el span (nombre usuario)
  const userSpan = (el.children as Element[]).find(child => child.name === 'span');
  const quoteText = (el.children as DOMNode[]).filter(child => child !== userSpan);
  return (
    <blockquote {...attribs} className={`relative bg-white rounded-2xl shadow-lg p-8 my-4 max-w-xl mx-auto text-slate-800 text-lg font-medium flex flex-col items-center ${attribs.className || ''}`}>
      <span className="absolute left-4 top-2 text-5xl text-blue-200 font-serif select-none">"</span>
      <span className="block text-center z-10">{domToReact(quoteText, options)}</span>
      {userSpan && (
        <span className="block mt-6 text-[var(--color-accent)] font-semibold text-base">{domToReact([userSpan], options)}</span>
      )}
    </blockquote>
  )
}

export function transformTakeaways (el: Element, options: HTMLReactParserOptions) {
  const attribs = fixAttribs(el.attribs)

  return (
    <div className='max-w-full flex justify-center items-center w-full'>
      <section {...attribs} className={`w-full ${attribs.className || ''}`}>
        {domToReact(el.children as DOMNode[], options)}
      </section>
    </div>
  )
}
