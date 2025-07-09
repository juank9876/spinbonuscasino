import { HeroPost } from '@/components/juankui/hero'
import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
import { Post } from '@/types/types'
import { ReactNode } from 'react'
import { Section } from '../wrappers/section'
import { ParticlesFull } from '../particles'
import { isParticles } from '@/config/options'

export function PrePost({ children, post }: { children: ReactNode, post: Post }) {
  return (
    <MainWrapper>
      {isParticles && <ParticlesFull />}
      <HeroPost {...post} />

      <Section>
        <div className='flex w-full flex-col lg:max-w-[60vw]'>
          {children}
        </div>
      </Section>
    </MainWrapper>
  )
}