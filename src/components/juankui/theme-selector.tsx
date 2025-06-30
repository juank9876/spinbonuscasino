// components/ThemeSelector.tsx
'use client'

import { ThemeKey, themes } from '@/config/options'
import { useTheme } from 'next-themes'

export function ThemeSelector () {
  const { theme, setTheme } = useTheme()

  return (
    <select
      className="rounded border p-2"
      value={theme}
      onChange={(e) => setTheme(e.target.value as ThemeKey)}
    >
      {Object.entries(themes).map(([key, { name }]) => (
        <option key={key} value={key}>
          {name}
        </option>
      ))}
    </select>
  )
}