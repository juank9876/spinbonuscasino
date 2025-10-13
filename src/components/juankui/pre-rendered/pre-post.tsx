import { HeroPost } from '@/components/juankui/hero/hero'
import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
import { Post } from '@/types/types'
import { ReactNode } from 'react'
import { ParticlesFull } from '../hero/particles'
import { isParticles } from '@/config/options'
import { Section } from '../wrappers/section'
import { settings as cssSettings } from "@/config/debug-log";
import { AuthorCard } from '../author-card'
import { TagsList } from '../tags-list'



export async function PrePost({ children, post }: { children: ReactNode, post: Post }) {
  return (
    <MainWrapper>
      {isParticles && <ParticlesFull />}
      {cssSettings.styles.applyTemplateStyles && <HeroPost {...post} />}

      <Section >
        <div className="w-[90vw] pt-20 lg:w-[60vw] ">
          {children}
          {/* Card de autor MeriStation */}
          {post.author_name && (
            <AuthorCard
              author_id={post.author_id}
              name={post.author_name}
              avatar={post.author_avatar}
              bio={post.author_bio}
            />
          )}
          {post.tags && (
            <TagsList tags={post.tags} />
          )}
        </div>
      </Section>
    </MainWrapper>
  )
}