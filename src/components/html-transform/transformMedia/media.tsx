import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { fixAttribs } from '@/lib/utils'

export function transformImg(el: Element) {
  const attribs = fixAttribs(el.attribs)

  return (
    <img
      {...attribs}
      alt={attribs.alt || 'sample image'}
      src={attribs.src || 'https://imgs.search.brave.com/Q3KM87IGdN-WX5xySRtFxbsjUYGEvnHmDEKXdVYkBys/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXNp/bm8tc2lnbi0zMjgy/MzU0LmpwZw'}
      className={`${attribs.className || ''}`}
    />
  )
}

export function transformSvg(el: Element, options: HTMLReactParserOptions) {
  const attribs = fixAttribs(el.attribs);

  return (
    <svg
      {...attribs}
      fill="#000"
      stroke='#fff'
      className={`relative rounded-lg ${attribs.className || ''}`}
    >
      {domToReact(el.children as DOMNode[], options)}
    </svg>
  )
}
