import { ReactNode } from "react";
import { ParticlesFull } from "../hero/particles";
import { isParticles } from "@/config/options";

interface SectionProps {
  children: ReactNode,
  title?: string,
  description?: string,
  gradientBackground?: 'bg-gradient-middle' | 'bg-gradient-top' | 'bg-gradient-bottom' | ''
  className?: string
}

export function Section({ children, className }: SectionProps) {
  return (
    <section className={`relative flex w-full items-center justify-center `}>
      {isParticles && <ParticlesFull />}
      <div className={className}>
        {children}
      </div>
    </section>
  )
}