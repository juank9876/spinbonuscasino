

import { fixAttribs } from '@/lib/utils';
import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'

//class="info-cards-container"
export function transformInfoCardsContainer(el: Element, options: HTMLReactParserOptions) {

    const attribs = fixAttribs(el.attribs)
    console.log(attribs.className)
    return (
        <div {...attribs} className={`${attribs.className || ''}`}>
            {domToReact(el.children as DOMNode[], options)}
        </div>
    )
}