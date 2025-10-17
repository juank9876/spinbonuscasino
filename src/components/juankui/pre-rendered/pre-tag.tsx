import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
import { ReactNode } from 'react'
import { ContentWithSidebar } from '../layouts/content-with-sidebar'
import { config } from '@/config/config'
import { Tag } from '@/types/types'

export function PreTag({ children, className, tag }: { children: ReactNode, className?: string, tag?: Tag }) {
  const tagConfig = config.pageTypes.tags;
  const tagData = tag ? { id: tag.id, name: tag.name, slug: tag.slug } : undefined;

  return (
    <MainWrapper>
      <ContentWithSidebar
        sidebarConfig={tagConfig.sidebar}
        sidebarData={{ tag: tagData }}
        contentMaxWidth="max-w-[90vw] lg:max-w-[60vw]"
        className={className}
      >
        <div className='flex flex-col space-y-5 justify-center items-center'>
          {children}
        </div>
      </ContentWithSidebar>
    </MainWrapper>
  )
}