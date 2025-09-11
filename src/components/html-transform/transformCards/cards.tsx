import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { CardShine } from '../../juankui/legacy/card-shine'

export function transformCard(el: Element, options: HTMLReactParserOptions) {
  // Busca si el primer hijo es un badge (por ejemplo, un número envuelto en un span o div)
  const [firstChild, ...restChildren] = el.children as Element[];
  let badgeContent = null;
  let contentChildren = el.children as DOMNode[];

  // Si el primer hijo es un número o tiene un atributo especial, lo usamos como badge
  if (
    firstChild &&
    firstChild.type === 'tag' &&
    (firstChild.name === 'span' || firstChild.name === 'div') &&
    firstChild.children &&
    firstChild.children[0] &&
    firstChild.children[0].type === 'text' &&
    /^[0-9]+$/.test((firstChild.children[0] as any).data.trim())
  ) {
    badgeContent = (firstChild.children[0] as any).data;
    contentChildren = restChildren;
  }

  return (
    <div id={el.attribs?.id} className='relative flex flex-col mx-auto'>
      {badgeContent &&
        <div className="absolute top-0 left-0 z-50">
          <div className="size-16 flex items-center justify-center text-3xl font-bold rounded-full shadow-lg">
            {badgeContent}
          </div>
        </div>
      }
      <CardShine className={`mx-5 relative text-white my-5 flex w-full max-w-[350px] overflow-hidden transition duration-500 bg-[#171717] ${el.attribs?.class || ''}`}>
        {domToReact(contentChildren, options)}
      </CardShine>
    </div>
  )
}

export function transformCardBody(el: Element, options: HTMLReactParserOptions) {
  const children = el.children as Element[];

  const hasH5 = children.some(child => child.type === 'tag' && child.name === 'h5');
  const hasImg = children.some(child => child.type === 'tag' && child.name === 'img');

  if (hasImg) {
    // Renderiza algo especial si hay img
    return (
      <div id={el.attribs?.id} className={`flex flex-col space-y-3 border-2 border-green-500 ${el.attribs?.class || ''}`}>
        <span className="text-green-600 font-bold">Contiene Imagen</span>
        {domToReact(el.children as DOMNode[], options)}
      </div>
    );
  }

  return (
    <div id={el.attribs?.id} className={`flex flex-col space-y-3 ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </div>
  )
}

export function transformFeatureItem(el: Element, options: HTMLReactParserOptions) {
  // Extrae el badge si existe
  const badge = el.attribs?.badge || '1';
  // Busca la imagen y el resto del contenido
  const imageElement = (el.children as Element[]).find(child => child.name === 'img');
  const otherChildren = (el.children as Element[]).filter(child => child !== imageElement);
  // El primer hijo no imagen es el título, el resto es el texto
  const [titleNode, ...rest] = otherChildren;

  return (
    <div id={el.attribs?.id} className={`relative flex flex-col w-full max-w-[370px] h-[430px] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:to-[var(--color-primary-semi-dark)] rounded-2xl shadow-2xl shadow-blue-200 overflow-hidden items-center justify-center mx-auto my-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl ${el.attribs?.class || ''}`}>
      {/* Badge/Número o Imagen */}
      <div className=" z-10 flex items-center justify-center py-5">
        {imageElement ? (
          <div className="bg-gradient-to-b from-[#6a5cff] to-[#3b82f6] p-2 rounded-full shadow-lg ring-4 ring-white ring-offset-2 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-white">
              {domToReact([imageElement], options)}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-b from-[#6a5cff] to-[#3b82f6] text-white text-4xl font-bold rounded-full shadow-lg ring-4 ring-white ring-offset-2 px-8 py-6">
            {badge}
          </div>
        )}
      </div>
      {/* Contenido */}
      <div className="flex flex-col flex-1 justify-start items-center text-center pt-10 px-5">
        <div className="text-2xl font-semibold tracking-wide mb-2 text-white">
          {domToReact([titleNode], options)}
        </div>
        <div className="w-12 h-1 bg-gradient-to-r from-[#6a5cff] to-[#3b82f6] rounded-full mb-4" />
        <div className="text-base text-white font-normal">
          {domToReact(rest as DOMNode[], options)}
        </div>
      </div>
      {/* Onda inferior más notoria */}

    </div>
  )
}

export function transformFeatureList(el: Element, options: HTMLReactParserOptions) {
  return (
    <div id={el.attribs?.id} className={`flex flex-wrap items-center justify-center gap-4 ${el.attribs?.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </div>
  )
}
