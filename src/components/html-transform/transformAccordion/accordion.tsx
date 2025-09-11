import { fixAttribs } from '@/lib/utils';
import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'


export function transformAccordion(el: Element, options: HTMLReactParserOptions) {
    const attribs = fixAttribs(el.attribs)
    return (
        <Accordion type="single" collapsible className={`${attribs.className || ''} w-full`}>
            {domToReact(el.children as DOMNode[], options)}
        </Accordion>
    )
}
export function transformAccordionItem(el: Element, options: HTMLReactParserOptions) {
    const attribs = fixAttribs(el.attribs)
    const header = el.children.find(
        (child) =>
            child.type === "tag" &&
            (child as Element).attribs?.class?.includes("accordion-header")
    ) as Element | undefined;

    const headerId = header?.attribs?.id ?? "99";

    return (
        <AccordionItem {...attribs} value={headerId} className="w-full">
            {domToReact(el.children as DOMNode[], options)}
        </AccordionItem>
    );
}
export function transformAccordionHeader(el: Element, options: HTMLReactParserOptions) {
    const attribs = fixAttribs(el.attribs)
    const newOptions: HTMLReactParserOptions = {
        ...options,
        replace: (...args) => {
            const [domNode] = args;
            if (domNode instanceof Element && domNode.name === 'button') {
                // Convert button to div, keeping attributes and children
                return (
                    <div {...attribs}>
                        {domToReact(domNode.children as DOMNode[], options)}
                    </div>
                );
            }
            // Return the original options.replace if it exists, for other nodes
            if (options.replace) {
                // @ts-ignore
                return options.replace(...args);
            }
        },
    };

    return (
        <AccordionTrigger role="div" className="w-full cursor-pointer">
            {domToReact(el.children as DOMNode[], newOptions)}
        </AccordionTrigger>
    );
}
export function transformAccordionContent(el: Element, options: HTMLReactParserOptions) {
    const attribs = fixAttribs(el.attribs)
    return (
        <AccordionContent {...attribs} className="w-full">
            {domToReact(el.children as DOMNode[], options)}
        </AccordionContent>
    )
}

export function fixCollapse(el: Element, options: HTMLReactParserOptions) {
    const attribs = fixAttribs(el.attribs)
    if (attribs.className?.includes(' collapse')) {
        attribs.className = attribs.className.replace(' collapse', '')
    }
    return (
        <div {...attribs}>
            {domToReact(el.children as DOMNode[], options)}
        </div>
    )
}