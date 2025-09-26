import { debug } from "./debug-log"

// === CONFIGURACIONES PREDEFINIDAS ===
const formatters = {
    // Espacios de 2
    standard: (html: string) => formatHtmlAdvanced(html, { indentSize: 2, useSpaces: true }),

    // Espacios de 4
    wide: (html: string) => formatHtmlAdvanced(html, { indentSize: 4, useSpaces: true }),

    // Tabs
    tabs: (html: string) => formatHtmlAdvanced(html, { indentSize: 1, useSpaces: false }),

    // Compacto (solo para debug)
    compact: (html: string) => formatHtmlWithIndentation(html, 1, true)
}

function formatHtmlWithIndentation(html: string, indentSize = 2, useSpaces = true): string {
    const indentChar = useSpaces ? ' '.repeat(indentSize) : '\t'

    // Limpiar HTML primero
    let formatted = html
        // Remover espacios extra entre tags
        .replace(/>\s+</g, '><')
        // Añadir saltos de línea después de tags de apertura y antes de cierre
        .replace(/(<\/?)([^>]+)(>)/g, '$1$2$3\n')
        // Limpiar múltiples saltos de línea
        .replace(/\n+/g, '\n')
        .trim()

    const lines = formatted.split('\n').filter(line => line.trim().length > 0)
    const result: string[] = []
    let indentLevel = 0

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()

        // Si es una línea vacía, saltarla
        if (!line) continue

        // Tags de cierre: reducir indentación antes de añadir la línea
        if (line.startsWith('</')) {
            indentLevel = Math.max(0, indentLevel - 1)
        }

        // Añadir la línea con la indentación actual
        result.push(indentChar.repeat(indentLevel) + line)

        // Tags de apertura: aumentar indentación para las siguientes líneas
        if (line.startsWith('<') &&
            !line.startsWith('</') &&
            !line.includes('/>') &&
            !isSelfClosingTag(line) &&
            !isInlineTag(line)) {
            indentLevel++
        }
    }

    return result.join('\n')
}

// === FUNCIÓN MEJORADA CON MEJOR DETECCIÓN DE TAGS ===
function formatHtmlAdvanced(html: string, options: any) {
    const {
        indentSize = 2,
        useSpaces = true,
        preserveInline = true,
        maxLineLength = 100
    } = options

    const indentChar = useSpaces ? ' '.repeat(indentSize) : '\t'

    // Tags que no necesitan salto de línea
    const inlineTags = new Set([
        'a', 'span', 'strong', 'b', 'i', 'em', 'u', 'small', 'code',
        'kbd', 'samp', 'var', 'sub', 'sup', 'mark', 'del', 'ins'
    ])

    // Tags que se cierran solos
    const voidElements = new Set([
        'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
        'link', 'meta', 'param', 'source', 'track', 'wbr'
    ])

    // Preparar HTML
    let formatted = html
        .replace(/>\s+</g, '><') // Remover espacios entre tags
        .replace(/(<[^>]+>)/g, '\n$1\n') // Añadir saltos alrededor de tags
        .replace(/\n+/g, '\n') // Limpiar saltos múltiples
        .trim()

    const lines = formatted.split('\n').filter(line => line.trim())
    const result: string[] = []
    let indentLevel = 0

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line) continue

        const isClosingTag = line.startsWith('</')
        const isOpeningTag = line.startsWith('<') && !isClosingTag
        const tagName = getTagName(line)
        const isVoidElement = voidElements.has(tagName)
        const isInlineTag = inlineTags.has(tagName)
        const isSelfClosing = line.includes('/>')

        // Reducir indentación para tags de cierre
        if (isClosingTag) {
            indentLevel = Math.max(0, indentLevel - 1)
        }

        // Añadir línea con indentación
        const indentedLine = indentChar.repeat(indentLevel) + line

        // Verificar si es contenido de texto (no tag)
        if (!line.startsWith('<')) {
            // Es contenido de texto, mantener indentación actual
            result.push(indentChar.repeat(indentLevel) + line)
        } else {
            result.push(indentedLine)

            // Aumentar indentación para próximas líneas si es tag de apertura
            if (isOpeningTag && !isSelfClosing && !isVoidElement && !isInlineTag) {
                indentLevel++
            }
        }
    }

    return result.join('\n')
}

// === FUNCIONES AUXILIARES ===
function getTagName(line: string): string {
    const match = line.match(/<\/?(\w+)/)
    return match ? match[1].toLowerCase() : ''
}

function isSelfClosingTag(line: string): boolean {
    return line.includes('/>') ||
        ['br', 'hr', 'img', 'input', 'meta', 'link'].some(tag =>
            line.toLowerCase().includes(`<${tag}`))
}

function isInlineTag(line: string): boolean {
    const inlineTags = ['a', 'span', 'strong', 'b', 'i', 'em', 'u', 'code']
    const tagName = getTagName(line)
    return inlineTags.includes(tagName)
}

// === VERSIÓN CON COLORES Y TABS ===
export function debugHtmlWithIndentation(html: string, label = 'Formatted HTML') {
    if (!debug.htmlContent) return

    const isServer = typeof window === 'undefined'

    // Formatear con indentación
    const formatted = formatHtmlAdvanced(html, {
        indentSize: 6,
        useSpaces: true,
        preserveInline: true
    })

    if (isServer) {
        // Colores ANSI para servidor
        const colors = {
            tag: '\x1b[36m',
            tagName: '\x1b[35m',
            attribute: '\x1b[33m',
            content: '\x1b[37m',
            indent: '\x1b[90m',
            reset: '\x1b[0m',
            bold: '\x1b[1m'
        }

        console.log(`${colors.bold}🎨 ${label}${colors.reset}`)
        console.log(`${colors.indent}${'═'.repeat(60)}${colors.reset}`)

        const colorized = formatted
            .split('\n')
            .map(line => {
                // Detectar nivel de indentación
                const indentMatch = line.match(/^(\s*)/)
                const indent = indentMatch ? indentMatch[1] : ''
                const content = line.substring(indent.length)

                // Colorizar contenido
                const colorizedContent = content
                    .replace(/(<\/?)(\w+)([^>]*>)/g,
                        `${colors.tag}$1${colors.tagName}$2${colors.tag}$3${colors.reset}`)
                    .replace(/(\w+)(=")([^"]*")(?=[^>]*>)/g,
                        `${colors.attribute}$1${colors.tag}$2${colors.content}$3${colors.reset}`)

                return `${colors.indent}${indent}${colors.reset}${colorizedContent}`
            })
            .join('\n')

        console.log(colorized)
        console.log(`${colors.indent}${'═'.repeat(60)}${colors.reset}`)

    } else {
        // Para navegador
        console.group(`%c🎨 ${label}`, 'color: #4ecdc4; font-weight: bold;')
        console.log('%c📏 Original length:', 'color: #95a5a6;', html.length, 'chars')
        console.log('%c🎯 Formatted HTML:', 'color: #95a5a6;')
        console.log(formatted)
        console.groupEnd()
    }

    return formatted
}
