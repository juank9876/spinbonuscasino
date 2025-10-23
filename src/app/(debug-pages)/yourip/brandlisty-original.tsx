"use client"

import { useEffect, useState, useRef } from "react"
import { debug, debugLog } from "@/config/debug-log"
import { transformHtmlForSidebar } from "@/components/juankui/css-content"
import { toggleMoreInfo } from "@/components/juankui/brandlisty/toggleMoreInfo"

interface Props {
    apiKey: string
    listId: string
    boton?: string
    limit?: string
    isDataWidget?: boolean
    sidebarMode?: boolean // Nuevo prop para indicar si está en sidebar
}
function removeUniversalReset (cssString: string) {
    let exactRuleRegex = cssString.replace(/\*\s*{[^}]*}/g, '');
    exactRuleRegex = exactRuleRegex.replace(/onclick="[^"]*"/g, '');

    return exactRuleRegex
}

export function BrandlistyOriginal ({
    apiKey,
    listId,
    boton = "Visit now",
    limit = "10",
    isDataWidget,
    sidebarMode
}: Props) {
    const [html, setHtml] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const contenedorRef = useRef<HTMLDivElement>(null);
    const dataWidget = isDataWidget ? "1" : "0";

    useEffect(() => {
        const fetchHtml = async () => {
            try {
                const params = new URLSearchParams({
                    apikey: apiKey,
                    hash: listId,
                    boton,
                    limit,
                    widget: dataWidget
                })

                //const url = `https://app.brandlisty.com/nowpcms.php?${params.toString()}`
                const url = `https://pro.brandlisty.com/nowph.php?${params.toString()}&category=all`
                const res = await fetch(url)

                debugLog(debug.brandlisty.url, '[+] Brandlisty URL:' + url)
                debugLog(debug.brandlisty.response, '[+] Brandlisty Response:' + res)

                if (!res.ok) throw new Error(`Error ${res.status}`)
                let htmlString = await res.text()

                debugLog(debug.brandlisty.html, '[+] Brandlisty HTML:' + htmlString)

                // Aplicar transformaciones
                let cleanedHtml = removeUniversalReset(htmlString)

                // Si está en modo sidebar, aplicar transformaciones CSS
                if (sidebarMode) {
                    console.log("[+] Aplicando transformaciones CSS para sidebar")
                    cleanedHtml = transformHtmlForSidebar(cleanedHtml)
                }

                setHtml(cleanedHtml)
            } catch (err) {
                console.error("Error al cargar Brandlisty:", err)
                setError("Error al cargar contenido de Brandlisty.")
            }
        }

        fetchHtml()
    }, [apiKey, listId, boton, limit, sidebarMode])


    //MORE INFO BUTTON
    useEffect(() => {
        const contenedor = contenedorRef.current;
        if (!contenedor) return;

        function handleClick (e: MouseEvent) {
            const target = e.target as HTMLElement;
            const button = target.closest('.more-info-toggle') as HTMLElement | null;
            if (button) {
                toggleMoreInfo(button, contenedorRef);
                return;
            }

            // --- Interceptar clicks en los filtros ---
            const filterLink = target.closest('a.filter-btn') as HTMLAnchorElement | null;
            if (filterLink) {
                e.preventDefault();

                const filterLinks = contenedor ? Array.from(contenedor.querySelectorAll('a.filter-btn')) : [];
                const parsedLink = new URL(filterLink.href);

                const url = `https://pro.brandlisty.com/nowph.php${parsedLink.search}`;
                //console.log(url)
                fetch(url)
                    .then(res => {
                        if (!res.ok) throw new Error(`Error ${res.status}`);
                        return res.text();
                    })
                    .then(htmlString => {
                        let cleanedHtml = removeUniversalReset(htmlString);

                        // Si está en modo sidebar, aplicar transformaciones CSS
                        if (sidebarMode) {
                            cleanedHtml = transformHtmlForSidebar(cleanedHtml);
                        }

                        setHtml(cleanedHtml);
                    })
                    .catch(err => {
                        setError("Error al cargar contenido de Brandlisty.");
                    });
            }
        }

        contenedor.addEventListener('click', handleClick);

        return () => {
            contenedor.removeEventListener('click', handleClick);
        };
    }, [html, apiKey, listId, boton, limit]);


    return (
        <div className="relative flex w-full flex-col overflow-auto rounded border bg-white shadow"
        //style={{ height: 800 }}
        >

            {error && <p className="text-sm text-red-600">{error}</p>}

            {!error && (
                <div
                    ref={contenedorRef}
                    className="external-casino-list-container max-w-full overflow-auto break-words"
                    dangerouslySetInnerHTML={{ __html: html }}
                    data-widget="1"
                />
            )}
            <style >{`
            body {
              padding: 0px !important
            }
            * {
            }
          `}</style>
        </div>
    )



}

