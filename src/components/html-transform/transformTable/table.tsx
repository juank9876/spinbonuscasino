// components/HtmlTransform/transformers.ts
import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'


export function transformTable(el: Element, options: HTMLReactParserOptions) {
    return (
        <table className='w-full border-collapse bg-transparent'>
            {domToReact(el.children as DOMNode[], options)}
        </table>
    )
}

export function transformThead(el: Element, options: HTMLReactParserOptions) {
    return (
        <thead className=' hidden md:table-header-group'>
            {domToReact(el.children as DOMNode[], options)}
        </thead>
    )
}

export function transformTBody(el: Element, options: HTMLReactParserOptions) {
    return (
        <tbody className='bg-transparent'>
            {domToReact(el.children as DOMNode[], options)}
        </tbody>
    )
}

export function transformTr(el: Element, options: HTMLReactParserOptions) {
    if (el.children.length === 0) {
        return null;
    }
    return (

        <tr className='flex flex-col mb-4 md:table-row md:mb-0 md:border-none md:shadow-none'>
            {domToReact(el.children as DOMNode[], options)}
        </tr>

    )
}

export function transformTd(el: Element, options: HTMLReactParserOptions) {
    return (
        <td className='flex flex-col p-3 border-b md:table-cell md:border-b last:border-b-0'>
            <span className="font-bold md:hidden mb-1">{el.attribs['data-label']}</span>
            {domToReact(el.children as DOMNode[], options)}
        </td>
    )
}