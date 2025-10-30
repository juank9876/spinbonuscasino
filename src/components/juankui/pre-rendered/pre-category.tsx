import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
import { ReactNode } from 'react'
import { HeroCategory } from '@/components/juankui/hero/hero'
import { Category } from '@/types/types'
import { isParticles } from '@/config/options'
import { settings as cssSettings } from "@/config/debug-log";
import { ContentWithSidebar } from '../layouts/content-with-sidebar'
import { config } from '@/config/config'

export function PreCategory({ children, category, className }: { children: ReactNode, className?: string, category: Category }) {
  const categoryConfig = config.pageTypes.categories;
  const categoryData = { id: category.id, name: category.name, slug: category.slug };

  return (
    <MainWrapper>
      {cssSettings.styles.applyTemplateStyles && <HeroCategory {...category} />}

      <ContentWithSidebar
        sidebarConfig={categoryConfig.sidebar}
        sidebarData={{ category: categoryData }}
        contentMaxWidth="w-[90vw] max-w-[90vw] lg:w-[60vw] lg:max-w-[60vw]"
        className={className}
      >
        {children}
      </ContentWithSidebar>
    </MainWrapper>
  )
}