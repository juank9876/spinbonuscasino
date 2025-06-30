import { HeroPage } from '@/components/juankui/hero'
import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
import { ReactNode } from 'react'
import { Section } from '../wrappers/section'
import { Page } from '@/types/types'
import { ParticlesFull } from '../particles'
import { isParticles } from '@/config/options'

export function PrePage ({ children, page }: { children: ReactNode, page: Page }) {
  return (
    <MainWrapper>
      {isParticles && <ParticlesFull />}

      <HeroPage {...page} />
      <Section>
        <div className='flex w-full flex-col space-y-5 lg:max-w-[60vw]'>
          {children}
        </div>
      </Section>
    </MainWrapper>
  )
}