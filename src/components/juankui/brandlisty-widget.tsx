"use client"

import { useEffect, useState, useRef } from "react"

interface Props {
  apiKey: string
  listId: string
  boton?: string
  limit?: string
}
function removeUniversalReset(cssString: string) {
  const exactRuleRegex = cssString.replace(/\*\s*{[^}]*}/g, '');

  return exactRuleRegex.replace(/onclick="[^"]*"/g, '');
}

export default function BrandlistyWidget({
  apiKey,
  listId,
  boton = "Visit now",
  limit = "10"
}: Props) {
  const [html, setHtml] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
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
        const url = `https://pro.brandlisty.com/nowph.php?${params.toString()}`

        const res = await fetch(url)

        if (!res.ok) throw new Error(`Error ${res.status}`)
        const htmlString = await res.text()

        const cleanedHtml = removeUniversalReset(htmlString)
        setHtml(cleanedHtml)
      } catch (err) {
        console.error("Error al cargar Brandlisty:", err)
        setError("Error al cargar contenido de Brandlisty.")
      }
    }

    fetchHtml()
  }, [apiKey, listId, boton, limit])

  function toggleMoreInfo(button: HTMLElement) {
    const card = button.closest('.brand-card');
    if (!card) return;
    const content = card.querySelector('.more-info-content') as HTMLElement | null;
    const icon = button.querySelector('i');
    const span = button.querySelector('span');
    if (!content || !icon || !span) return;

    const isExpanded = content.classList.contains('show');

    // Cerrar otros abiertos
    if (!isExpanded) {
      const contenedor = contenedorRef.current;
      if (contenedor) {
        contenedor.querySelectorAll('.more-info-content.show').forEach((otherContent) => {
          const otherCard = otherContent.closest('.brand-card');
          if (!otherCard) return;
          const otherButton = otherCard.querySelector('.more-info-toggle');
          const otherIcon = otherButton?.querySelector('i');
          const otherSpan = otherButton?.querySelector('span');

          otherContent.classList.remove('show');
          if (otherButton) otherButton.classList.remove('active');
          if (otherSpan) otherSpan.textContent = 'More information';
          if (otherIcon) otherIcon.className = 'bi bi-chevron-down';
        });
      }
    }

    if (isExpanded) {
      content.classList.remove('show');
      button.classList.remove('active');
      span.textContent = 'More information';
      icon.className = 'bi bi-chevron-down';
    } else {
      content.classList.add('show');
      button.classList.add('active');
      span.textContent = 'Less information';
      icon.className = 'bi bi-chevron-up';

      setTimeout(() => {
        content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }

  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    // Delegación de eventos (ya implementado)
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const button = target.closest('.more-info-toggle') as HTMLElement | null;
      if (button) {
        toggleMoreInfo(button);
      }
    }

    contenedor.addEventListener('click', handleClick);

    // --- NUEVO: Modificar los href de los filtros ---
    const filterLinks = contenedor.querySelectorAll('a.filter-btn');
    filterLinks.forEach((link) => {
      const a = link as HTMLAnchorElement;
      // Solo modificar si el href no empieza ya por https://pro.brandlisty.com/nowph.php?
      if (!a.href.startsWith('https://pro.brandlisty.com/nowph.php?')) {
        // Si el href es relativo (empieza por ?), lo concatenamos
        if (a.getAttribute('href')?.startsWith('?')) {
          a.href = 'https://pro.brandlisty.com/nowph.php' + a.getAttribute('href');
        }
      }
    });
    // --- FIN NUEVO ---

    return () => {
      contenedor.removeEventListener('click', handleClick);
    };
  }, [html]);


  return (
    <div className=" relative flex w-full flex-col overflow-auto rounded border bg-white p-4 shadow"
      style={{ height: 800 }}>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {!error && (
        <div
          ref={contenedorRef}
          className="external-casino-list-container max-w-full overflow-auto break-words"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
      <style >{`
        .external-casino-list-container {
          width: 100%;
          
          border-radius: 0.75rem;
        }
        
        .external-casino-list-container a {
          text-decoration: none;
        }
        
        .external-casino-list-container img {
          max-width: 100%;
          height: auto;
        }
        body {
          padding: 0px !important
        }
          * {

}

      `}</style>
    </div>
  )
}
