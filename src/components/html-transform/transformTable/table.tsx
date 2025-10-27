// components/HtmlTransform/transformers.ts
import { fixAttribs } from '@/lib/utils';
import { DOMNode, domToReact, Element, HTMLReactParserOptions, Text } from 'html-react-parser'

// Helper to extract text from element
function getTextContent(node: DOMNode): string {
    if (node.type === 'text') {
        return (node as Text).data
    }
    if (node.type === 'tag') {
        const el = node as Element
        return el.children.map((child) => getTextContent(child as DOMNode)).join('')
    }
    return ''
}

// Helper to extract headers from thead
function extractHeaders(el: Element): string[] {
    const headers: string[] = []

    // Find thead
    const thead = el.children.find((child): child is Element =>
        child.type === 'tag' && child.name === 'thead'
    )

    if (!thead) return headers

    // Find first tr in thead
    const headerRow = thead.children.find((child): child is Element =>
        child.type === 'tag' && child.name === 'tr'
    )

    if (!headerRow) return headers

    // Extract text from each th
    headerRow.children.forEach((child) => {
        if (child.type === 'tag' && (child.name === 'th' || child.name === 'td')) {
            headers.push(getTextContent(child).trim())
        }
    })

    return headers
}

export function transformTable(el: Element, options: HTMLReactParserOptions) {
    const attribs = fixAttribs(el.attribs)
    const headers = extractHeaders(el)

    // Store headers in a way children can access them
    if (headers.length > 0) {
        (el as any)._headers = headers
    }

    return (
        <div className={`${attribs.className || ''} w-full m-0 p-0 width-none`}>
            <table {...attribs} className={`w-full m-0 p-0 `}>
                {domToReact(el.children as DOMNode[], options)}
            </table>
        </div>
    )
}

export function transformThead(el: Element, options: HTMLReactParserOptions) {
    const attribs = fixAttribs(el.attribs)

    return (
        <thead {...attribs} className={`text-white font-bold max-md:hidden ${attribs.className || ''}`}>
            {domToReact(el.children as DOMNode[], options)}
        </thead>
    )
}

export function transformTBody(el: Element, options: HTMLReactParserOptions) {
    const attribs = fixAttribs(el.attribs)

    return (
        <tbody {...attribs} className={`${attribs.className || ''}`}>
            {domToReact(el.children as DOMNode[], options)}
        </tbody>
    )
}

export function transformTr(el: Element, options: HTMLReactParserOptions) {
    if (el.children.length === 0) {
        return null;
    }

    const attribs = fixAttribs(el.attribs)
    const isHeaderRow = el.parent && 'name' in el.parent && el.parent.name === 'thead'

    if (isHeaderRow) {
        return (
            <tr {...attribs} className={`w-full ${attribs.className || ''}`}>
                {domToReact(el.children as DOMNode[], options)}
            </tr>
        )
    }

    return (
        <tr {...attribs} className={`p-row w-full max-md:block  max-md:p-2.5 ${attribs.className || ''}`}>
            {domToReact(el.children as DOMNode[], options)}
        </tr>
    )
}

export function transformTd(el: Element, options: HTMLReactParserOptions) {
    const attribs = fixAttribs(el.attribs)

    // Get the cell index
    let cellIndex = 0
    if (el.parent && 'children' in el.parent) {
        const siblings = el.parent.children.filter((child): child is Element =>
            child.type === 'tag' && child.name === 'td'
        )
        cellIndex = siblings.indexOf(el)
    }

    // Try to get header from table
    let label = attribs['data-label'] || ''
    if (!label) {
        // Walk up to find table
        let current = el.parent
        while (current && 'name' in current) {
            if (current.name === 'table' && (current as any)._headers) {
                const headers = (current as any)._headers
                label = headers[cellIndex] || ''
                break
            }
            current = current.parent
        }
    }

    return (
        <td
            {...attribs}
            className={` max-md:block max-md:w-full max-md:p-2 max-md:border-b max-md:border-[#ddd] last:max-md:border-b-0 before:max-md:content-[attr(data-label)] before:max-md:font-bold before:max-md:uppercase before:max-md:text-[0.85em] before:max-md:block before:max-md:mb-1.5 before:max-md:text-[#171B23] ${attribs.className || ''}`}
            data-label={label}
        >
            {domToReact(el.children as DOMNode[], options)}
        </td>
    )
}

export function transformTh(el: Element, options: HTMLReactParserOptions) {
    const attribs = fixAttribs(el.attribs)

    return (
        <th {...attribs} className={`p-2.5 border border-[#ddd] text-left m-0 break-words overflow-wrap-anywhere ${attribs.className || ''}`}>
            {domToReact(el.children as DOMNode[], options)}
        </th>
    )
}
