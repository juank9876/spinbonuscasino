"use client"

import { useEffect, useState, useRef } from "react"

interface Props {
  apiKey: string
  listId: string
  boton?: string
  limit?: string
}
function removeUniversalReset (cssString: string) {
  // Regex para detectar la regla universal * con esos 3 estilos en cualquier orden y con espacios o saltos
  //const universalRuleRegex = /\*\s*\{\s*(?:box-sizing:\s*border-box;\s*)?(?:margin:\s*0;\s*)?(?:padding:\s*0;\s*)?(?:box-sizing:\s*border-box;\s*)?(?:margin:\s*0;\s*)?(?:padding:\s*0;\s*)?\}/gi

  // Alternativamente, para que se ajuste solo a la regla completa y exacta que muestras:
  const exactRuleRegex = /\*\s*\{\s*box-sizing:\s*border-box;\s*margin:\s*0;\s*padding:\s*0;\s*\}/gi

  // Usamos la exacta para evitar que borre otras reglas con *
  return cssString.replace(exactRuleRegex, '')
}

export default function BrandlistyWidget ({
  apiKey,
  listId,
  boton = "Visit now",
  limit = "10"
}: Props) {
  const [html, setHtml] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const params = new URLSearchParams({
          apikey: apiKey,
          hash: listId,
          boton,
          limit,
        })

        const url = `https://app.brandlisty.com/nowpcms.php?${params.toString()}`
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

  return (
    <div className="isolation-isolate relative flex w-full flex-col overflow-auto rounded border bg-white p-4 shadow"
      style={{ height: 600 }}>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {!error && (
        <div
          ref={ref}
          className="brandlisty-widget-container max-w-full overflow-auto break-words"
          dangerouslySetInnerHTML={{ __html: html }}
        />

      )}
      <style jsx global>{`
        .external-casino-list-container {
          width: 100%;
          overflow: hidden;
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
      `}</style>
    </div>
  )
}



/*
interface Props {
  apiKey: string
  listId: string
  boton?: string
  limit?: string
  height?: number
}

export default async function BrandlistyWidget ({
  apiKey,
  listId,
  boton = "Visit now",
  limit = "8",
  height = 800,
}: Props) {
  const src = `https://app.brandlisty.com/nowpcms.php?apikey=${encodeURIComponent(apiKey)}&hash=${encodeURIComponent(listId)}&boton=${encodeURIComponent(boton)}&limit=${encodeURIComponent(limit)}`

  return (
    <iframe
      src={src}
      loading="lazy"
      className="w-full rounded border shadow"
      style={{ height }}
      title="Brandlisty Widget"

    />
  )
}
*/