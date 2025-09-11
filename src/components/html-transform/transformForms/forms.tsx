import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { Button } from '../../ui/button'
import { fixAttribs } from '@/lib/utils'

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
    <Button variant={'accent'} className={`text-white ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </Button>
  )
}

export function transformButton(el: Element, options: HTMLReactParserOptions) {
  return (
    <Button variant={'accent'} asChild>
      <a
        href={el.attribs.href || '#'}
        className={`${el.attribs?.class || ''}`}
      >
        {domToReact(el.children as DOMNode[], options)}
      </a>
    </Button>
  )
}
