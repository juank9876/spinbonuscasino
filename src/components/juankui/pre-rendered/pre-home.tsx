import { HeroHomePage } from '@/components/juankui/hero/hero'
import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
//import { capitalize } from '@/utils/capitalize'
import { ReactNode } from 'react'
import { Section } from '../wrappers/section'
import { Page, SiteSettings } from '@/types/types'
import { config } from '@/config/config'
import { ImportantCategories } from '../important-categories'


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
  const homeHero = process.env.HOME_HERO === 'true' || false
  return (
    <MainWrapper>

      {homeHero && <HeroHomePage {...props} />}

      <Section>
        <div className='flex max-w-[90vw] flex-col space-y-5 lg:max-w-[60vw] pt-8'>
          {children}
          <ImportantCategories />
        </div>
      </Section>
    </MainWrapper>
  )
}