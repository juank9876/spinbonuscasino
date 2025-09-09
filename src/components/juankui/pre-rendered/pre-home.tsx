import { HeroHomePage } from '@/components/juankui/hero/hero'
import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
//import { capitalize } from '@/utils/capitalize'
import { ReactNode } from 'react'
import { Section } from '../wrappers/section'
import { isParticles } from '@/config/options'
import { ParticlesFull } from '../hero/particles'
import { Page, SiteSettings } from '@/types/types'
import { settings as cssSettings } from "@/config/debug-log";

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
      {cssSettings.styles.applyTemplateStyles && <HeroHomePage {...props} />}

      <Section>
        <div className='flex max-w-[90vw] flex-col space-y-5 lg:max-w-[60vw]'>
          {children}
        </div>
      </Section>
    </MainWrapper>
  )
}