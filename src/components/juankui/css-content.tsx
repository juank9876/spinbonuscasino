'use client'
import { debug, debugLog } from '@/config/debug-log';
import { useEffect } from 'react';

type DynamicStyleProps = {
    cssContent: string | undefined;
};

/**
 * Elimina la propiedad max-width de una clase CSS específica
 */
const removeMaxWidthFromClass = (cssContent: string, className: string): string => {
    // Buscar la clase específica con su bloque de estilos
    const classRegex = new RegExp(`\\.${className}\\s*\\{([^}]*)\\}`, 'g');

    return cssContent.replace(classRegex, (match, styles) => {
        // Eliminar todas las variantes de max-width
        const cleanedStyles = styles
            .replace(/max-width\s*:\s*[^;]*;?/gi, '')  // max-width: valor;
            .replace(/\s+/g, ' ')  // Limpiar espacios múltiples
            .trim();

        return `.${className} { ${cleanedStyles} }`;
    });
};

/**

/**
 * Transforma HTML y CSS del API para adaptarlo al sidebar
 */
export const transformHtmlForSidebar = (htmlContent: string): string => {
    // 1. Extraer el CSS del HTML
    const styleMatch = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);

    if (!styleMatch) return htmlContent;

    let transformedHtml = htmlContent;

    styleMatch.forEach((styleTag) => {
        const cssContent = styleTag.replace(/<\/?style[^>]*>/gi, '');

        transformedHtml = transformedHtml.replace(styleTag, `<style>${cssContent}</style>`);
    });

    return transformedHtml;
};




const DynamicStyle = ({ cssContent }: DynamicStyleProps) => {
    if (!cssContent) return undefined;

    cssContent = cssContent.replace(/\/\*.*?\*\//g, '');
    // Replace all standalone * selectors with the fixed class
    cssContent = cssContent.replace(/\*\s*{/g, '.fixed-global-styles-from-builder {');

    // Eliminar max-width de .info-cards-container
    cssContent = removeMaxWidthFromClass(cssContent, 'info-cards-container');


    debugLog(debug.cssContent, '[+] CSS Content:' + cssContent)
    useEffect(() => {

        const styleTag = document.createElement('style');
        styleTag.setAttribute('id', 'dynamic-style');
        styleTag.innerHTML = cssContent;
        document.head.appendChild(styleTag);

        return () => {
            const existing = document.getElementById('dynamic-style');
            if (existing) existing.remove();
        };
    }, [cssContent]);

    return undefined; // No renderiza nada visual
};

export default DynamicStyle;