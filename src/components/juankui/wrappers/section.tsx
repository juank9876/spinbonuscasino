import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode,
  title?: string,
  description?: string,
  gradientBackground?: 'bg-gradient-middle' | 'bg-gradient-top' | 'bg-gradient-bottom' | ''
  className?: string
}

export function Section({ children, className }: SectionProps) {
  return (
    <section className={`relative h-full flex w-full flex-1 items-center justify-center `}>

      <div className={className}>
        {children}
      </div>
    </section>
  )
}