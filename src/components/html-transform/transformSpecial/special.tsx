import { fixAttribs } from '@/lib/utils';
import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'


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
      <span className="absolute left-4 top-2 select-none font-serif text-5xl text-blue-200">"</span>
      <span className="z-10 block text-center">{domToReact(quoteText, options)}</span>
      {userSpan && (
        <span className="mt-6 block text-base font-semibold text-[var(--color-accent)]">{domToReact([userSpan], options)}</span>
      )}
    </blockquote>
  )
}

export function transformTakeaways (el: Element, options: HTMLReactParserOptions) {
  const attribs = fixAttribs(el.attribs)

  return (
    <div className='flex w-full max-w-full items-center justify-center'>
      <section {...attribs} className={`w-full ${attribs.className || ''}`}>
        {domToReact(el.children as DOMNode[], options)}
      </section>
    </div>
  )
}
