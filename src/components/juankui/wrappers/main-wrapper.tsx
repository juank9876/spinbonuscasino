import { ReactNode } from "react";

export function MainWrapper ({ children }: { children: ReactNode }) {
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-start pb-10">
      {children}
    </main>
  )
}