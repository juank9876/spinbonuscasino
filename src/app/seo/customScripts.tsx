"use client";

import { useEffect, useRef } from "react";

interface CustomHTMLProps {
    content?: string;
    isScript?: boolean;
}

export function CustomHTMLRenderer ({ content, isScript }: CustomHTMLProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!content || !containerRef.current) return;

        // Limpiar el contenedor antes de reinyectar
        containerRef.current.innerHTML = "";

        // Crear un elemento temporal para parsear el contenido
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;

        // Extraer scripts y estilos para inyectarlos correctamente
        Array.from(tempDiv.childNodes).forEach((node) => {
            if (node.nodeName === "SCRIPT" || isScript) {
                const scriptEl = document.createElement("script");
                scriptEl.text = (node as HTMLScriptElement).text;
                scriptEl.async = (node as HTMLScriptElement).async;
                document.body.appendChild(scriptEl); // O containerRef.current si prefieres

                console.log("CustomHTMLRenderer content:", scriptEl.text);
            } else if (node.nodeName === "STYLE") {
                const styleEl = document.createElement("style");
                styleEl.textContent = (node as HTMLStyleElement).textContent;
                containerRef.current?.appendChild(styleEl);
            } else {
                // Cualquier otro HTML
                containerRef.current?.appendChild(node.cloneNode(true));
            }
        });
    }, [content]);

    return <div ref={containerRef} />;
}
