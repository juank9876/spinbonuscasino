"use client"

import { useEffect, useState, useRef } from "react"
import { toggleMoreInfo } from "./toggleMoreInfo"
import { debug, debugLog } from "@/config/debug-log"

interface Props {
  apiKey: string
  listId: string
  boton?: string
  limit?: string
}
function removeUniversalReset(cssString: string) {
  let exactRuleRegex = cssString.replace(/\*\s*{[^}]*}/g, '');
  exactRuleRegex = exactRuleRegex.replace(/onclick="[^"]*"/g, '');

  return exactRuleRegex
}

export default function BrandlistyWidget({
  apiKey,
  listId,
  boton = "Visit now",
  limit = "10"
}: Props) {
  const [html, setHtml] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const params = new URLSearchParams({
          apikey: apiKey,
          hash: listId,
          boton,
          limit,
        })

        //const url = `https://app.brandlisty.com/nowpcms.php?${params.toString()}`
        const url = `https://pro.brandlisty.com/nowph.php?${params.toString()}&category=all`
        const res = await fetch(url)

        debugLog(debug.brandlisty.url, '[+] Brandlisty URL:' + url)
        debugLog(debug.brandlisty.response, '[+] Brandlisty Response:' + res)

        if (!res.ok) throw new Error(`Error ${res.status}`)
        const htmlString = await res.text()

        debugLog(debug.brandlisty.html, '[+] Brandlisty HTML:' + htmlString)
        const cleanedHtml = removeUniversalReset(htmlString)
        setHtml(cleanedHtml)
      } catch (err) {
        console.error("Error al cargar Brandlisty:", err)
        setError("Error al cargar contenido de Brandlisty.")
      }
    }

    fetchHtml()
  }, [apiKey, listId, boton, limit])



  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    function handleClick(e: MouseEvent) {
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

        // Determinar el índice del enlace clickeado
        // Se agrega verificación para evitar posible error si 'contenedor' es null
        const filterLinks = contenedor ? Array.from(contenedor.querySelectorAll('a.filter-btn')) : [];
        const parsedLink = new URL(filterLink.href);
        //const index = filterLinks.indexOf(filterLink);
        //console.log(parsedLink.searchParams.get('category'))

        // Asignar categoría según el índice
        /*
                let category = "all";
                if (index === 1) category = "crypto";
                else if (index === 2) category = "low-deposit";
                else if (index === 3) category = "premium";
        
                // Hacer fetch con la nueva categoría
                const params = new URLSearchParams({
                  apikey: apiKey,
                  hash: listId,
                  boton,
                  limit,
                  category,
                });
        
                const url = `https://pro.brandlisty.com/nowph.php?${params.toString()}`;
        */
        const url = `https://pro.brandlisty.com/nowph.php${parsedLink.search}`;
        //console.log(url)
        fetch(url)
          .then(res => {
            if (!res.ok) throw new Error(`Error ${res.status}`);
            return res.text();
          })
          .then(htmlString => {
            const cleanedHtml = removeUniversalReset(htmlString);
            setHtml(cleanedHtml);
          })
          .catch(err => {
            setError("Error al cargar contenido de Brandlisty.");
          });
      }
    }

    contenedor.addEventListener('click', handleClick);

    // Modificar los href de los filtros (opcional, para evitar navegación)
    /*const filterLinks = contenedor.querySelectorAll('a.filter-btn');
    filterLinks.forEach((link) => {
      link.setAttribute('href', '#');
    });
*/
    return () => {
      contenedor.removeEventListener('click', handleClick);
    };
  }, [html, apiKey, listId, boton, limit]);


  return (
    <div className=" relative flex w-full flex-col overflow-auto rounded border bg-white shadow"
    //style={{ height: 800 }}
    >

      {error && <p className="text-sm text-red-600">{error}</p>}

      {!error && (
        <div
          ref={contenedorRef}
          className="external-casino-list-container max-w-full overflow-auto break-words"
          dangerouslySetInnerHTML={{ __html: html }}
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
