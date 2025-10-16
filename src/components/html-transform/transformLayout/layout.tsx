import { fixAttribs } from '@/lib/utils';
import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'

export function transformRow(el: Element, options: HTMLReactParserOptions) {
  //console.log('Hijos de <row>:', el.children.length);
  const validChildren = el.children.filter(
    (child) => child.type === 'tag'
  ) as Element[]

  const attribs = fixAttribs(el.attribs)

  //Fix Bug de que se sale del main, ya que se aplica flex-row a todo
  if (el.children.length === 1) {
    return (
      <div {...attribs} className={`flex flex-col items-center justify-center ${attribs.className || ''}`}>
        {domToReact(validChildren as DOMNode[], options)}
      </div>
    )
  }
  return (
    <div {...attribs} className={`flex flex-col lg:flex-row lg:flex-wrap ${attribs.className || ''}`}>
      {domToReact(validChildren as DOMNode[], options)}
    </div>
  )
}

export function transformCol(el: Element, options: HTMLReactParserOptions) {
  const attribs = fixAttribs(el.attribs)
  const classStr = attribs?.className || ''

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
        {...attribs}
        style={{ width: `${widthClass}%` }}
        className={`${widthClass} max-${widthClass} lg:flex lg:flex-col justify-center items-center h-full hidden ${attribs.className || ''}`}
      >
        {domToReact(el.children as DOMNode[], options)}
      </div>

      <div
        {...attribs}
        className={`h-full w-full items-center justify-center lg:hidden ${attribs.className || ''}`}
      >
        {domToReact(el.children as DOMNode[], options)}
      </div>
    </>
  )
}

export function transformContainer(el: Element, options: HTMLReactParserOptions) {
  const attribs = fixAttribs(el.attribs)

  return (
    <div {...attribs} className={`flex flex-col ${attribs.className || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </div>
  )
}

export function transformDiv(el: Element, options: HTMLReactParserOptions) {
  const attribs = fixAttribs(el.attribs)

  return (
    <div {...attribs} className={`${attribs.className || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </div>
  )
}

export function transformSection(el: Element, options: HTMLReactParserOptions) {
  const attribs = fixAttribs(el.attribs)

  return (
    <section {...attribs} className={`rounded-lg px-5 py-5 ${attribs.className || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </section>
  )
}
