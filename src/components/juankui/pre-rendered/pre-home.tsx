import { HeroHomePage } from '@/components/juankui/hero/hero'
import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
//import { capitalize } from '@/utils/capitalize'
import { ReactNode } from 'react'
import { Section } from '../wrappers/section'
import { isParticles } from '@/config/options'
import { ParticlesFull } from '../hero/particles'
import { Page, SiteSettings } from '@/types/types'
import { settings as cssSettings } from "@/config/debug-log";
import { config } from '@/config/config'


interface HomePage {
  children: ReactNode
  settings: SiteSettings
  pageProps: Page
}

export function PreHomePage({ children, settings, pageProps }: HomePage) {
  const props = {
    ...settings,
    ...pageProps
  }
  return (
    <MainWrapper>
      {isParticles && <ParticlesFull />}
      {config.template.homeHeroWithNavbarTransparent && <HeroHomePage {...props} />}

      <Section>
        <div className='pt-20 flex max-w-[90vw] flex-col space-y-5 lg:max-w-[60vw]'>
          {children}
        </div>
      </Section>
    </MainWrapper>
  )
}