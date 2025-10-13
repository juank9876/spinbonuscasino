'use client'

import { useEffect, useState, createContext, useContext } from 'react'

interface ClientHeaderWrapperProps {
  children: React.ReactNode
}

const ScrollContext = createContext(false)

export const useScrolled = () => useContext(ScrollContext)

export function ClientHeaderWrapper({ children }: ClientHeaderWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ScrollContext.Provider value={isScrolled}>
      <header className={`fixed top-0 z-50 w-full transition-all duration-300  ${isScrolled
        ? 'bg-[var(--color-primary-dark)] backdrop-blur-md border-b border-gray-200/50 shadow-2xl'
        : 'bg-transparent links-primary '
        }`}>
        {children}
      </header>
    </ScrollContext.Provider>
  )
}
