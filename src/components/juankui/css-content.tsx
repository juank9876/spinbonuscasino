'use client'
import { debug, debugLog } from '@/config/debug-log';
import { useEffect } from 'react';

type DynamicStyleProps = {
    cssContent: string | null;
};

const DynamicStyle = ({ cssContent }: DynamicStyleProps) => {
    if (!cssContent) return null;
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

    return null; // No renderiza nada visual
};

export default DynamicStyle;