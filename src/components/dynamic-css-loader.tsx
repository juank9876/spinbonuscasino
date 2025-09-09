'use client'

import { useEffect } from 'react'
import { settings } from '@/config/debug-log'

export function DynamicCSSLoader() {
  useEffect(() => {
    // Remover cualquier CSS dinámico previo
    const existingLink = document.querySelector('#dynamic-globals-css')
    if (existingLink) {
      existingLink.remove()
    }

    // Crear y agregar el nuevo link CSS
    const link = document.createElement('link')
    link.id = 'dynamic-globals-css'
    link.rel = 'stylesheet'
    link.href = settings.styles.applyStylesheet ? '/globals-on.css' : '/globals.css'
    
    document.head.appendChild(link)
  }, [])

  return null
}
