import { HeroHomePage } from '@/components/juankui/hero'
import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
//import { capitalize } from '@/utils/capitalize'
import { ReactNode } from 'react'
import { Section } from '../wrappers/section'
import { isParticles } from '@/config/options'
import { ParticlesFull } from '../particles'
import { SiteSettings } from '@/types/types'

interface HomePage {
  children: ReactNode
  settings: SiteSettings
}

export function PreHomePage ({ children, settings }: HomePage) {
  return (
    <MainWrapper>
      {isParticles && <ParticlesFull />}

      <HeroHomePage {...settings} />
      <Section>
        <div className='flex max-w-[90vw] flex-col space-y-5 lg:max-w-[60vw]'>
          {children}
        </div>
      </Section>
    </MainWrapper>
  )
}