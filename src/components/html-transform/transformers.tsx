// components/HtmlTransform/transformers.ts
import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { Button } from '../ui/button'
import Image from 'next/image'
import { CardShine } from '../juankui/legacy/card-shine'
import { ArrowRight, Star, Sparkles, Flame, Bolt, Circle, Dice1, Dice3, Dice4, Dice5, Dice2, Dice6, Dice1Icon, Dice3Icon, Dice4Icon, Dice2Icon, Dice6Icon, Dice5Icon, ShieldCheck } from 'lucide-react'
import BrandlistyWidget from '../juankui/brandlisty/brandlisty-widget'
import { MagicCard } from '../magicui/magic-card'
import { fixAttribs } from '@/lib/utils'

export function transformBrandlisty(el: Element) {
  const { apikey, listid, boton, limit, id } = el.attribs

  return (
    <div className={`flex h-full flex-col ${el.attribs?.class || ''}`}>
      <div className='flex flex-row items-center justify-center gap-8'>
        <span className='bg-gradient-to-br from-[var(--color-primary-semi-dark)] to-[var(--color-primary)]  px-2 py-1 rounded-full inline-flex items-center justify-end gap-1 text-end text-sm font-bold mb-2'>
          <ShieldCheck className='size-4 mb-0.5' /> Verified
        </span>
      </div>
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

export function transformRow(el: Element, options: HTMLReactParserOptions) {
  //console.log('Hijos de <row>:', el.children.length);
  const validChildren = el.children.filter(
    (child) => child.type === 'tag'
  ) as Element[]

  //Fix Bug de que se sale del main, ya que se aplica flex-row a todo
  if (el.children.length === 1) {
    return (
      <div className={`flex flex-col items-center justify-center ${el.attribs?.class || ''}`}>
        {domToReact(validChildren as DOMNode[], options)}
      </div>
    )
  }
  return (
    <div className={`flex flex-col lg:flex-row lg:flex-wrap ${el.attribs?.class || ''}`}>
      {domToReact(validChildren as DOMNode[], options)}
    </div>
  )
}

export function transformCol(el: Element, options: HTMLReactParserOptions) {
  const classStr = el.attribs?.class || ''

  const getTailwindWidth = (classStr: string): string | number => {
    const match = classStr.match(/col-(?:xs|sm|md|lg|xl)-(\d+)/)
    if (!match) return 'w-full'

    const value = parseInt(match[1])
    const fraction = value / 12

    if (fraction === 1) return 'w-full'
    if (fraction === 0.5) return 'w-1/2'
    if (fraction === 1 / 3) return 'w-1/3'
    if (fraction === 2 / 3) return 'w-2/3'
    if (fraction === 0.25) return 'w-1/4'
    if (fraction === 0.75) return 'w-3/4'

    const percent = +(fraction * 100).toFixed(0) // Redondeado a 2 decimales
    return percent

  }

  const widthClass = getTailwindWidth(classStr)

  return (
    <>
      <div
        style={{ width: `${widthClass}%` }}
        className={`${widthClass} max-${widthClass} lg:flex lg:flex-col justify-center items-center h-full hidden ${el.attribs?.class || ''}`}
      >
        {domToReact(el.children as DOMNode[], options)}
      </div>

      <div
        className={`h-full w-full items-center justify-center lg:hidden ${el.attribs?.class || ''}`}
      >
        {domToReact(el.children as DOMNode[], options)}
      </div>
    </>
  )
}

export function transformCard(el: Element, options: HTMLReactParserOptions) {
  // Busca si el primer hijo es un badge (por ejemplo, un número envuelto en un span o div)
  const [firstChild, ...restChildren] = el.children as Element[];
  let badgeContent = null;
  let contentChildren = el.children as DOMNode[];

  // Si el primer hijo es un número o tiene un atributo especial, lo usamos como badge
  if (
    firstChild &&
    firstChild.type === 'tag' &&
    (firstChild.name === 'span' || firstChild.name === 'div') &&
    firstChild.children &&
    firstChild.children[0] &&
    firstChild.children[0].type === 'text' &&
    /^[0-9]+$/.test((firstChild.children[0] as any).data.trim())
  ) {
    badgeContent = (firstChild.children[0] as any).data;
    contentChildren = restChildren;
  }

  return (
    <div className='relative flex flex-col w-full'>
      {badgeContent && (
        <div className="absolute -top-2 -left-2 z-50">
          <div className="size-12 bg-gradient-to-br from-green-500 to-green-600  flex items-center justify-center text-lg font-bold rounded-full shadow-lg border-2 border-white">
            {badgeContent}
          </div>
        </div>
      )}
      <div className={`bg-gradient-to-br  hover:border-amber-400/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20 ${el.attribs?.class || ''}`}>
        {domToReact(contentChildren, options)}
      </div>
    </div>
  )
}

export function transformCardBody(el: Element, options: HTMLReactParserOptions) {
  return (
    <div className={`flex flex-col space-y-3 ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </div>
  )
}


export function transformTextElement(el: Element, options: HTMLReactParserOptions) {
  return (
    <div className={`text py-3 ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </div>
  )
}

export function transformContainer(el: Element, options: HTMLReactParserOptions) {
  return (
    <div className={`container mx-auto px-6 max-w-7xl ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </div>
  )
}

export function transformSection(el: Element, options: HTMLReactParserOptions) {
  return (
    <section className={`py-12 bg-gradient-to-b from-slate-900/50 to-slate-800/50 ${el.attribs?.class || ''}`}>
      <div className="container mx-auto px-6 max-w-7xl">
        {domToReact(el.children as DOMNode[], options)}
      </div>
    </section>
  )
}

export function transformP(el: Element, options: HTMLReactParserOptions) {
  return (
    <p className={`text-base leading-relaxed mb-4 ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </p>
  )
}

export function transformButton(el: Element, options: HTMLReactParserOptions) {
  return (
    <Button variant={'accent'} asChild>
      <a
        href={el.attribs.href || '#'}
        className={`text-muted ${el.attribs?.class || ''}`}
      >
        {domToReact(el.children as DOMNode[], options)}
      </a>
    </Button>
  )
}

export function transformImg(el: Element) {
  return (
    <Image
      alt={el.attribs.alt || 'sample image'}
      src={el.attribs.src || 'https://via.placeholder.com/300'}
      width={500}
      height={300}
      className="rounded-lg h-auto w-full"
    />
  )
}

export function transformH2(el: Element, options: HTMLReactParserOptions) {
  const textContent = el.children
    .filter(child => child.type === 'text')
    .map(child => (child as any).data)
    .join('')

  const iconMap: { [key: string]: React.ComponentType<any> } = {
    'star': Star,
    'sparkles': Sparkles,
    'flame': Flame,
    'bolt': Bolt,
    'circle': Circle,
  }



  return (
    <h2 className={`flex flex-col text-3xl lg:text-4xl font-bold  mb-4   gap-3 ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </h2>
  )
}

export function transformH3(el: Element, options: HTMLReactParserOptions) {
  const icons = [ArrowRight, Star, Sparkles, Flame, Bolt]
  const RandomIcon = icons[Math.floor(Math.random() * icons.length)]

  return (
    <div className={`mt-8 flex flex-row items-center justify-start space-x-3 ${el.attribs?.class || ''}`}>
      <h3 className='text-[var(--color-accent-dark)]'>
        {domToReact(el.children as DOMNode[], options)}
      </h3>
    </div>
  )
}

export function transformLi(el: Element, options: HTMLReactParserOptions) {
  return (
    <li className={`list-inside list-disc list-item ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </li>
  )
}

export function transformCode(el: Element) {

  const getText = (nodes: DOMNode[]): string =>
    nodes
      .map((node) => {
        if ('data' in node && node.data) {
          // Reemplaza \u003C por < y \u003E por > y \r\n por salto de línea
          let text = node.data;
          text = text.replace(/\\u003C/g, '<');
          text = text.replace(/\\u003E/g, '>');
          text = text.replace(/\\r\\n/g, '\n');  // o solo \r\n según cómo venga
          return text;
        }
        if ('children' in node) return getText(node.children as DOMNode[]);
        return '';
      })
      .join('');

  const codeContent = getText(el.children as DOMNode[]).trim();

  if (!codeContent) return null; // ⛔ No renderizar si está vacío

  return (
    <code className={`block items-end justify-start whitespace-pre px-2 ${el.attribs?.class || ''}`}>
      {getText(el.children as DOMNode[])}
    </code>
  );
}

export function transformStrong(el: Element, options: HTMLReactParserOptions) {
  return (
    <strong className={`flex font-bold ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </strong>
  )
}

export function transformPre(el: Element, options: HTMLReactParserOptions) {

  return (
    <pre className={`overflow-x-auto rounded-md bg-zinc-900 p-4  ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </pre>
  );
}

export function transformForm(el: Element, options: HTMLReactParserOptions) {
  return (
    <form className={`flex flex-col border border-gray-700 rounded-lg p-5 gap-y-3 ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </form>
  )
}

export function transformInput(el: Element, options: HTMLReactParserOptions) {
  const attribs = fixAttribs(el.attribs);
  return (
    <input
      type={attribs.type || 'text'}
      placeholder={attribs.placeholder || ' '}
      {...attribs}
      className={`w-full p-2 rounded-md border border-gray-300 ${attribs.className || ''} ${el.attribs?.class || ''}`}
    />
  )
}

export function transformTextarea(el: Element, options: HTMLReactParserOptions) {
  const attribs = fixAttribs(el.attribs);

  return (
    <textarea
      {...attribs}
      className={`w-full p-2 rounded-md border border-gray-300 ${attribs.className || ''} ${el.attribs?.class || ''}`}
    />
  )
}

export function transformBtnSubmit(el: Element, options: HTMLReactParserOptions) {
  return (
    <Button variant={'accent'} className={` ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </Button>
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
      <span className="absolute left-4 top-2 text-5xl text-blue-200 font-serif select-none">“</span>
      <span className="block text-center z-10">{domToReact(quoteText, options)}</span>
      {userSpan && (
        <span className="block mt-6 text-[var(--color-accent)] font-semibold text-base">{domToReact([userSpan], options)}</span>
      )}
    </blockquote>
  )
}