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
import { LatestPosts } from '../sidebar-with-posts/latest-posts'
import { AuthorPosts } from '../sidebar-with-posts/author-posts'
import { CategoryPosts } from '../sidebar-with-posts/category-posts'
import { TagPosts } from '../sidebar-with-posts/tag-posts'

function PostBody({ children, post }: { children: ReactNode, post: Post }) {
  return (
    <div className='flex flex-col'>
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
  )
}

export function PrePost({ children, post }: { children: ReactNode, post: Post }) {
  const author = { id: post.author_id, name: post.author_name, avatar: post.author_avatar, bio: post.author_bio }
  const category = { id: post.category_id, name: post.category_name, slug: post.category_slug }
  const tag = { id: post.tags[0]?.id, name: post.tags[0]?.name, slug: post.tags[0]?.slug }

  return (
    <MainWrapper>
      {isParticles && <ParticlesFull />}
      {cssSettings.styles.applyTemplateStyles && <HeroPost {...post} />}

      <Section className="w-[80vw] pt-20  flex justify-center items-center ">
        <div className='w-[25vw]' />
        <div className="w-[90vw] pt-20 flex gap-5">
          <PostBody children={children} post={post} />

          {cssSettings.styles.applySidebarNews && (
            <div className="w-[800px] flex-col gap-5 lg:flex hidden">
              <LatestPosts />
              <AuthorPosts author={author} />
              <CategoryPosts category={category} />
              {tag && <TagPosts tag={tag} />}
            </div>
          )}
        </div>
      </Section>
    </MainWrapper>
  )
}