import { HeroPage } from '@/components/juankui/hero/hero'
import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
import { ReactNode } from 'react'
import { Section } from '../wrappers/section'
import { Page } from '@/types/types'
import { ParticlesFull } from '../hero/particles'
import { isParticles } from '@/config/options'
import { settings as cssSettings } from "@/config/debug-log";
export function PrePage({ children, page }: { children: ReactNode, page: Page }) {
  return (
    <MainWrapper>
      {isParticles && <ParticlesFull />}

      {cssSettings.styles.applyTemplateStyles && <HeroPage {...page} />}

      <Section>
        <div className='pt-20 flex max-w-[90vw] flex-col space-y-5 lg:max-w-[60vw]'>
          {children}
        </div>
      </Section>
    </MainWrapper>
  )
}