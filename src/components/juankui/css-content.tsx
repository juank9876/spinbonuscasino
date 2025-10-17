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
 * Transforma CSS para adaptarlo al sidebar (ancho reducido)
 */
export const transformCssForSidebar = (cssContent: string): string => {
    let transformed = cssContent;

    // 1. Ocultar filtros y headers (ocupan mucho espacio)
    transformed += `
        .filter-section { display: none !important; }
        .brands-header { display: none !important; }
    `;

    // 2. Ajustar contenedor principal
    transformed = transformed.replace(
        /\.brands-container\s*{[^}]*}/gi,
        ''
    );

    // 3. Forzar layout vertical en todas las tarjetas
    transformed = transformed.replace(
        /\.brand-card-content\s*{[^}]*}/gi,
        '.brand-card-content { display: flex; flex-direction: column !important; align-items: stretch; }'
    );

    // 4. Ajustar columna izquierda (logo)
    transformed = transformed.replace(
        /\.brand-left\s*{[^}]*}/gi,
        '.brand-left { flex: 0 0 auto !important; width: 100% !important; min-height: 80px !important; padding: 0.75rem !important; border-right: none !important; border-bottom: 1px solid var(--border-color) !important; }'
    );

    // 5. Ajustar columna central
    transformed = transformed.replace(
        /\.brand-center\s*{[^}]*}/gi,
        '.brand-center { padding: 0.75rem !important; width: 100%; }'
    );

    // 6. Ajustar columna derecha
    transformed = transformed.replace(
        /\.brand-right\s*{[^}]*}/gi,
        '.brand-right { flex: 0 0 auto !important; width: 100% !important; padding: 0.75rem !important; border-left: none !important; border-top: 1px solid var(--border-color) !important; }'
    );

    // 7. Reducir tamaño de logos
    transformed = transformed.replace(
        /\.brand-logo\s+img\s*{[^}]*}/gi,
        '.brand-logo img { max-width: 120px !important; max-height: 50px !important; object-fit: contain; }'
    );

    // 8. Ajustar grids a una columna
    transformed += `
        .more-info-three-columns,
        .more-info-two-columns,
        .features-grid {
            grid-template-columns: 1fr !important;
        }
    `;

    // 9. Reducir tamaños de fuente
    transformed = transformed.replace(
        /\.brands-header\s+h1\s*{[^}]*}/gi,
        '.brands-header h1 { font-size: 1.25rem !important; margin-bottom: 0.5rem; }'
    );

    // 10. Reducir gaps generales
    transformed = transformed.replace(/gap:\s*2rem/gi, 'gap: 0.75rem');
    transformed = transformed.replace(/gap:\s*1\.5rem/gi, 'gap: 0.5rem');

    // 11. Reducir paddings y margins
    transformed = transformed.replace(
        /\.brand-card\s*{[^}]*}/gi,
        (match) => match.replace(/min-height:\s*\d+px/gi, 'min-height: auto')
    );

    return transformed;
};

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
        const transformedCss = transformCssForSidebar(cssContent);

        transformedHtml = transformedHtml.replace(styleTag, `<style>${transformedCss}</style>`);
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