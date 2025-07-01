// components/HtmlTransform/transformers.ts
import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { Button } from '../ui/button'
import Image from 'next/image'
import { CardShine } from '../juankui/legacy/card-shine'
import { ArrowRight, Star, Sparkles, Flame, Bolt, Circle } from 'lucide-react'
import BrandlistyWidget from '../juankui/brandlisty-widget'

export function transformBrandlisty (el: Element) {
  const { apikey, listid, boton, limit, id } = el.attribs

  return (
    <div className="flex h-full">
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

//Version upgraded chatgp
export function transformRow (el: Element, options: HTMLReactParserOptions) {
  const validChildren = el.children.filter(
    (child) => child.type === 'tag'
  ) as Element[]

  return (

    <div className="flex w-full flex-col lg:flex-row lg:flex-wrap">
      {domToReact(validChildren as DOMNode[], options)}
    </div>

  )
}

export function transformCol (el: Element, options: HTMLReactParserOptions) {
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
    //return `w-[${percent}%]`
    return percent

  }

  const widthClass = getTailwindWidth(classStr)

  return (
    <>
      <div
        style={{ width: `${widthClass}%` }}
        className={`${widthClass} max-${widthClass} lg:flex lg:flex-col justify-center items-center h-full hidden`}
      >
        {domToReact(el.children as DOMNode[], options)}
      </div>

      <div
        className={`h-full w-full items-center justify-center lg:hidden`}
      >
        {domToReact(el.children as DOMNode[], options)}
      </div>
    </>
  )
}


//Version Bootstrap

export function transformCard (el: Element, options: HTMLReactParserOptions) {
  return (
    <CardShine className='relative mx-auto my-5 flex w-full max-w-[350px] overflow-hidden transition duration-500 hover:scale-105 hover:bg-[var(--color-primary-light)]'>
      {domToReact(el.children as DOMNode[], options)}
    </CardShine>
  )
}
export function transformCardBody (el: Element, options: HTMLReactParserOptions) {
  return (
    <div className='flex flex-col space-y-3'>
      {domToReact(el.children as DOMNode[], options)}
    </div>
  )
}

export function transformTextElement (el: Element, options: HTMLReactParserOptions) {
  return (
    <div className="text-element py-3">
      {domToReact(el.children as DOMNode[], options)}
    </div>
  )
}

export function transformContainer (el: Element, options: HTMLReactParserOptions) {
  return (
    <div className="border-primary container rounded-lg">
      {domToReact(el.children as DOMNode[], options)}
    </div>
  )
}

//Elementos HTML
export function transformButton (el: Element, options: HTMLReactParserOptions) {
  return (
    <Button variant={'accent'} asChild>
      <a
        href={el.attribs.href || '#'}
        className="text-muted"
      >
        {domToReact(el.children as DOMNode[], options)}
      </a>
    </Button>
  )
}

export function transformImg (el: Element) {
  return (
    <div className='relative h-[300px] w-full'>
      <Image
        alt={el.attribs.alt}
        //src={'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTKbWAJHSZvmB6idZtJ6VtB1O6pvq2K7UVgIzsSxcpyxmu2GOqZwBlgV-NJm1kSNLJl7fnqNRG4ep75DRePRSgWM_v99GQISy6BUURYHYHnOg'}
        src={el.attribs.src || 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTKbWAJHSZvmB6idZtJ6VtB1O6pvq2K7UVgIzsSxcpyxmu2GOqZwBlgV-NJm1kSNLJl7fnqNRG4ep75DRePRSgWM_v99GQISy6BUURYHYHnOg'}
        fill
        className="rounded-lg object-contain"
      />

    </div>
  )
}

export function transformH2 (el: Element, options: HTMLReactParserOptions) {
  return (
    <div className='flex flex-col space-y-5 pb-5 pt-10'>
      <h2>
        {domToReact(el.children as DOMNode[], options)}
      </h2>
      <span className="bg-accent h-1 w-24 rounded lg:mx-auto" />
    </div>
  )
}

export function transformH3 (el: Element, options: HTMLReactParserOptions) {
  const icons = [ArrowRight, Star, Sparkles, Flame, Bolt]
  const RandomIcon = icons[Math.floor(Math.random() * icons.length)]

  return (
    <div className='mt-8 flex flex-row items-center justify-start space-x-3'>
      <RandomIcon className='text-accent mb-0 pb-0' />
      <h3 className='text-accent'>
        {domToReact(el.children as DOMNode[], options)}
      </h3>
    </div>
  )
}

export function transformLi (el: Element, options: HTMLReactParserOptions) {
  return (
    <li className="text-p-custom text-muted-foreground relative mt-4 pl-6 leading-relaxed">
      <span className="absolute left-0 top-1.5">
        <Circle className="size-3 text-[var(--color-primary)]" />
      </span>

      <div className="prose prose-zinc dark:prose-invert max-w-none [&>*]:inline [&>code]:inline [&>strong]:inline [&>strong]:font-bold">
        {domToReact(el.children as DOMNode[], options)}
      </div>
    </li>
  )
}

export function transformCode (el: Element) {

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
    <code className="mx-2 block items-end justify-start whitespace-pre px-2">
      {getText(el.children as DOMNode[])}
    </code>
  );
}

export function transformStrong (el: Element, options: HTMLReactParserOptions) {
  return (
    <strong className="mx-2 flex font-bold">
      {domToReact(el.children as DOMNode[], options)}
    </strong>
  )
}

export function transformP (el: Element, options: HTMLReactParserOptions) {
  return (

    <p className="[&>*]:inline [&>code]:inline [&>strong]:inline [&>strong]:font-bold">
      {domToReact(el.children as DOMNode[], options)}
    </p>
  )
}

export function transformPre (el: Element, options: HTMLReactParserOptions) {

  return (
    <pre className="overflow-x-auto rounded-md bg-zinc-900 p-4 text-white">
      {domToReact(el.children as DOMNode[], options)}
    </pre>
  );
}

export function transformForm (el: Element, options: HTMLReactParserOptions) {
  return (
    <form className="flex flex-row border border-gray-700">
      {domToReact(el.children as DOMNode[], options)}
    </form>
  )
}