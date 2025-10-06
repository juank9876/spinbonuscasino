
import { fixAttribs } from "@/lib/utils";
import { DOMNode, domToReact } from "html-react-parser";
import { Element, HTMLReactParserOptions } from "html-react-parser";

export function transformTermContentH3(el: Element, options: HTMLReactParserOptions) {
    const attribs = fixAttribs(el.attribs)
    return (
        <h3
            {...attribs}
            className={`padding-none ${attribs.className || ''}`}
        >
            {domToReact(el.children as DOMNode[], options)}
        </h3>
    )
}