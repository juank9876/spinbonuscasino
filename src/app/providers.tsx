// app/providers.tsx (ejemplo común)
"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function Providers ({ children }: { children: ReactNode }) {


  return (

    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme='dark'
      value={{
        dark: 'theme-dark',
        newspaper: 'theme-newspaper',
      }}
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>

  )
}