'use client'
import { debug, debugLog } from '@/config/debug-log';
import { useEffect } from 'react';

type DynamicStyleProps = {
    cssContent: string | undefined;
};

const DynamicStyle = ({ cssContent }: DynamicStyleProps) => {
    if (!cssContent) return undefined;

    cssContent = cssContent.replace(/\/\*.*?\*\//g, '');
    // Replace all standalone * selectors with the fixed class
    cssContent = cssContent.replace(/\*\s*{/g, '.fixed-global-styles-from-builder {');

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