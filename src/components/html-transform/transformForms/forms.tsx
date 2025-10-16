import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { Button } from '../../ui/button'
import { fixAttribs } from '@/lib/utils'

export function transformForm(el: Element, options: HTMLReactParserOptions) {
  const attribs = fixAttribs(el.attribs)

  return (
    <form {...attribs} className={`flex flex-col border border-gray-700 rounded-lg p-5 gap-y-3 ${attribs.className || ''}`}>
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
      className={`w-full p-2 rounded-md border border-gray-300 ${attribs.className || ''}`}
    />
  )
}

export function transformTextarea(el: Element, options: HTMLReactParserOptions) {
  const attribs = fixAttribs(el.attribs);

  return (
    <textarea
      {...attribs}
      className={`w-full p-2 rounded-md border border-gray-300 ${attribs.className || ''}`}
    />
  )
}

export function transformBtnSubmit(el: Element, options: HTMLReactParserOptions) {
  const attribs = fixAttribs(el.attribs)

  return (
    <Button variant={'accent'} {...attribs} className={`text-white ${attribs.className || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </Button>
  )
}

export function transformButton(el: Element, options: HTMLReactParserOptions) {
  const attribs = fixAttribs(el.attribs)

  return (
    <Button variant={'accent'} asChild>
      <a
        {...attribs}
        href={attribs.href || '#'}
        className={`${attribs.className || ''}`}
      >
        {domToReact(el.children as DOMNode[], options)}
      </a>
    </Button>
  )
}
