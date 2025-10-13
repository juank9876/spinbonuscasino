import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
import { ReactNode } from 'react'
import { Section } from '../wrappers/section'

export function PreTag({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <MainWrapper>

      <Section>
        <div className={`pt-20 flex max-w-[90vw] flex-col space-y-5 lg:max-w-[60vw] justify-center items-center ${className}`}>
          {children}
        </div>
      </Section>
    </MainWrapper>
  )
}