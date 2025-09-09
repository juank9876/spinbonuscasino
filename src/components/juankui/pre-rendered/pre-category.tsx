import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
import { ReactNode } from 'react'
import { HeroCategory } from '@/components/juankui/hero/hero'
//import { capitalize } from '@/utils/capitalize'
import { Category } from '@/types/types'
import { ParticlesFull } from '../hero/particles'
import { isParticles } from '@/config/options'
import { settings as cssSettings } from "@/config/debug-log";
export function PreCategory({ children, category, className }: { children: ReactNode, className?: string, category: Category }) {
  return (
    <MainWrapper>
      {isParticles && <ParticlesFull />}

      {cssSettings.styles.applyTemplateStyles && <HeroCategory {...category} />}
      <article className={`${className}`}>
        {children}

      </article>
    </MainWrapper>
  )
}