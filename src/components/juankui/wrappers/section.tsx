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

export function Section({ children }: SectionProps) {
  return (
    <section className={`relative flex w-[60vw] items-center justify-center overflow-hidden`}>
      {isParticles && <ParticlesFull />}
      <div className="w-[90vw] lg:w-[60vw] flex flex-col justify-center items-center relative box-border">
        {children}
      </div>
    </section>
  )
}