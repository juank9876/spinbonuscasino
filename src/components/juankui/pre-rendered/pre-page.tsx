import { HeroPage } from '@/components/juankui/hero/hero'
import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
import { ReactNode } from 'react'
import { Page } from '@/types/types'
import { ParticlesFull } from '../hero/particles'
import { isParticles } from '@/config/options'
import { settings as cssSettings } from "@/config/debug-log";
import { ContentWithSidebar } from '../layouts/content-with-sidebar'
import { config } from '@/config/config'
export function PrePage({ children, page }: { children: ReactNode, page: Page }) {
  const pageConfig = config.pageTypes.pages;

  return (
    <MainWrapper>
      {isParticles && <ParticlesFull />}

      {config.template.pageHeroWithNavbarTransparent && <HeroPage {...page} />}

      <ContentWithSidebar
        sidebarConfig={pageConfig.sidebar}
        contentMaxWidth="max-w-[90vw] lg:max-w-[60vw]"
      >
        <div className='flex flex-col space-y-5'>
          {children}
        </div>
      </ContentWithSidebar>
    </MainWrapper>
  )
}