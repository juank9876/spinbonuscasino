import { DOMNode, Element, HTMLReactParserOptions } from 'html-react-parser'
// Layout components
import { transformRow, transformCol, transformContainer } from './transformLayout/layout'
// Card components
import { transformCard, transformCardBody } from './transformCards/cards'
// Text components
import { transformH2, transformH3, transformLi, transformCode, transformStrong, transformP, transformPre, transformTextElement } from './transformText/text'
// Form components
import { transformForm, transformInput, transformTextarea, transformBtnSubmit, transformButton } from './transformForms/forms'
// Media components
import { transformImg, transformSvg } from './transformMedia/media'
// Special components
import { transformBrandlisty, transformTestimonials, transformBlockquote, transformTakeaways } from './transformSpecial/special'
import type { JSX } from 'react'
import { transformAccordion, transformAccordionItem, transformAccordionHeader, transformAccordionContent, fixCollapse } from './transformAccordion/accordion'
//import { transformTable, transformTBody, transformTd, transformThead, transformTr } from './transformTable/table'

type TransformerRule = {
  className?: string
  tagName?: string
  matcher?: (el: Element) => boolean | string
  transformer: (el: Element, options: HTMLReactParserOptions) => JSX.Element | null
}

const rules: TransformerRule[] = [
  //Clases CSS
  { className: 'card', transformer: transformCard },
  { className: 'card-body', transformer: transformCardBody },
  { className: 'row', transformer: transformRow },
  {
    matcher: (el) => /col-(xs|sm|md|lg|xl)-\d+/.test(el.attribs?.class || ''),
    transformer: transformCol
  },
  {
    matcher: (el) => 'data-apikey' in el.attribs || 'apikey' in el.attribs,
    transformer: transformBrandlisty,
  },
  { className: 'text-element', transformer: transformTextElement },
  { className: 'btn', transformer: transformButton },
  { className: 'card-img-top', transformer: transformImg },
  { className: 'container', transformer: transformContainer },
  { className: 'testimonials', transformer: transformTestimonials },

  { className: 'btn-submit', transformer: transformBtnSubmit },

  { className: 'accordion', transformer: transformAccordion },
  { className: 'accordion-item', transformer: transformAccordionItem },
  { className: 'accordion-header', transformer: transformAccordionHeader },
  { className: 'accordion-body', transformer: transformAccordionContent },

  //Fixes 
  { className: 'accordion-collapse', transformer: fixCollapse },

  //Tags HTML
  { tagName: 'form', transformer: transformForm },
  { tagName: 'h2', transformer: transformH2 },
  { tagName: 'h3', transformer: transformH3 },
  { tagName: 'li', transformer: transformLi },
  { tagName: 'p', transformer: transformP },
  //{ tagName: 'img', transformer: transformImg },
  { tagName: 'code', transformer: transformCode },
  { tagName: 'pre', transformer: transformPre },
  { tagName: 'strong', transformer: transformStrong },
  { tagName: 'blockquote', transformer: transformBlockquote },
  { tagName: 'input', transformer: transformInput },
  { tagName: 'textarea', transformer: transformTextarea },

  //Table fix
  /*
  { tagName: 'table', transformer: transformTable },
  { tagName: 'thead', transformer: transformThead },
  { tagName: 'tr', transformer: transformTr },
  { tagName: 'td', transformer: transformTd },
  { tagName: 'tbody', transformer: transformTBody },
   */
  //{ tagName: 'button', transformer: transformButton },
  //{ tagName: 'svg', transformer: transformSvg },

  {
    matcher: (el) => el.attribs?.['data-type'] === 'key-takeaways',
    transformer: transformTakeaways,
  },
]

export function getTransformer(el: Element, options: HTMLReactParserOptions) {
  const classList = el.attribs?.class?.split(' ') ?? []
  const tagName = el.name

  for (const rule of rules) {
    if (
      (rule.className && classList.includes(rule.className)) ||
      (rule.tagName && rule.tagName === tagName) ||
      (rule.matcher && rule.matcher(el))
    ) {
      return rule.transformer(el, options)
    }
  }

  return null
}

export const options: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (domNode.type === 'tag') {
      return getTransformer(domNode as Element, options)
    }
    return undefined
  },
}