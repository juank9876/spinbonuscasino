import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
import { ReactNode } from 'react'
import { HeroCategory } from '../hero'
import { Section } from '../wrappers/section'
//import { capitalize } from '@/utils/capitalize'
import { Category } from '@/types/types'
import { cn } from '@/lib/utils'
import { ParticlesFull } from '../particles'
import { isParticles } from '@/config/options'

export function PreCategory ({ children, category, className }: { children: ReactNode, className?: string, category: Category }) {
  return (
    <MainWrapper>
      {isParticles && <ParticlesFull />}
      <HeroCategory {...category} />
      <Section>
        <div className={cn('flex flex-col max-w-full lg:max-w-[60vw]', className)}>
          {children}
        </div>
      </Section>
    </MainWrapper>
  )
}