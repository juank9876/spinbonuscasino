import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { ArrowRight, Star, Sparkles, Flame, Bolt, Dice1Icon, Dice3Icon, Dice4Icon, Dice2Icon, Dice6Icon, Dice5Icon } from 'lucide-react'

export function transformH2(el: Element, options: HTMLReactParserOptions) {
  // Check if element has any text content
  const hasContent = el.children.some(child =>
    (child.type === 'text' && child.data.trim() !== '') ||
    (child.type === 'tag' && child.children?.length > 0)
  );

  // Return null if no content
  if (!hasContent) return null;

  const icons = [ArrowRight, Star, Sparkles, Flame, Bolt, Dice1Icon, Dice2Icon, Dice3Icon, Dice4Icon, Dice5Icon, Dice6Icon]
  const RandomIcon = icons[Math.floor(Math.random() * icons.length)]

  return (

    <h2 id={el.attribs?.id} className={`${el.attribs?.class || ''} font-bold text-3xl`}>
      {domToReact(el.children as DOMNode[], options)}
    </h2>


  )
}

export function transformH3(el: Element, options: HTMLReactParserOptions) {
  const icons = [ArrowRight, Star, Sparkles, Flame, Bolt]
  const RandomIcon = icons[Math.floor(Math.random() * icons.length)]

  return (
    <h3 id={el.attribs?.id} className={`${el.attribs?.class || ''} font-bold text-2xl`}>
      {domToReact(el.children as DOMNode[], options)}
    </h3>
  )
}

export function transformLi(el: Element, options: HTMLReactParserOptions) {
  return (
    <li id={el.attribs?.id} className={`[&>*]:inline [&>code]:inline [&>strong]:inline [&>strong]:font-bold list-inside list-disc relative w-fit ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </li>
  )
}

export function transformCode(el: Element) {

  const getText = (nodes: DOMNode[]): string =>
    nodes
      .map((node) => {
        if ('data' in node && node.data) {
          // Reemplaza \u003C por < y \u003E por > y \r\n por salto de línea
          let text = node.data;
          text = text.replace(/\\u003C/g, '<');
          text = text.replace(/\\u003E/g, '>');
          text = text.replace(/\\r\\n/g, '\n');  // o solo \r\n según cómo venga
          return text;
        }
        if ('children' in node) return getText(node.children as DOMNode[]);
        return '';
      })
      .join('');

  const codeContent = getText(el.children as DOMNode[]).trim();

  if (!codeContent) return null; // ⛔ No renderizar si está vacío

  return (
    <code className={`block items-end justify-start whitespace-pre px-2 ${el.attribs?.class || ''}`}>
      {getText(el.children as DOMNode[])}
    </code>
  );
}

export function transformStrong(el: Element, options: HTMLReactParserOptions) {
  return (
    <strong className={`flex font-bold ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </strong>
  )
}

export function transformP(el: Element, options: HTMLReactParserOptions) {
  if (el.children.length === 0) return null;
  return (

    <p className={`[&>*]:inline [&>code]:inline [&>strong]:inline [&>strong]:font-bold ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </p>
  )
}

export function transformPre(el: Element, options: HTMLReactParserOptions) {

  return (
    <pre className={`overflow-x-auto rounded-md bg-zinc-900 p-4 text-white ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </pre>
  );
}

export function transformTextElement(el: Element, options: HTMLReactParserOptions) {
  return (
    <div className={`text py-2 ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </div>
  )
}
