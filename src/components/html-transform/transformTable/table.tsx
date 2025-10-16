// components/HtmlTransform/transformers.ts
import { fixAttribs } from '@/lib/utils';
import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'

export function transformTable(el: Element, options: HTMLReactParserOptions) {
    const attribs = fixAttribs(el.attribs)

    return (
        <table {...attribs} className={`w-full border-collapse bg-transparent ${attribs.className || ''}`}>
            {domToReact(el.children as DOMNode[], options)}
        </table>
    )
}

export function transformThead(el: Element, options: HTMLReactParserOptions) {
    const attribs = fixAttribs(el.attribs)

    return (
        <thead {...attribs} className={`hidden md:table-header-group ${attribs.className || ''}`}>
            {domToReact(el.children as DOMNode[], options)}
        </thead>
    )
}

export function transformTBody(el: Element, options: HTMLReactParserOptions) {
    const attribs = fixAttribs(el.attribs)

    return (
        <tbody {...attribs} className={`bg-transparent ${attribs.className || ''}`}>
            {domToReact(el.children as DOMNode[], options)}
        </tbody>
    )
}

export function transformTr(el: Element, options: HTMLReactParserOptions) {
    if (el.children.length === 0) {
        return null;
    }

    const attribs = fixAttribs(el.attribs)

    return (
        <tr {...attribs} className={`flex flex-col mb-4 md:table-row md:mb-0 md:border-none md:shadow-none ${attribs.className || ''}`}>
            {domToReact(el.children as DOMNode[], options)}
        </tr>
    )
}

export function transformTd(el: Element, options: HTMLReactParserOptions) {
    const attribs = fixAttribs(el.attribs)

    return (
        <td {...attribs} className={`flex flex-col p-3 border-b md:table-cell md:border-b last:border-b-0 ${attribs.className || ''}`}>
            <span className="font-bold md:hidden mb-1">{attribs['data-label']}</span>
            {domToReact(el.children as DOMNode[], options)}
        </td>
    )
}