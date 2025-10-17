import { HeroPost } from '@/components/juankui/hero/hero'
import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
import { Post } from '@/types/types'
import { ReactNode } from 'react'
import { ParticlesFull } from '../hero/particles'
import { isParticles } from '@/config/options'
import { AuthorCard } from '../author-card'
import { TagsList } from '../tags-list'
import { ContentWithSidebar } from '../layouts/content-with-sidebar'
import { config } from '@/config/config'

function PostBody({ children, post }: { children: ReactNode, post: Post }) {
  const postConfig = config.pageTypes.posts;

  return (
    <div className='flex flex-col'>
      {children}
      {/* Card de autor */}
      {postConfig.author && post.author_name && (
        <AuthorCard
          author_id={post.author_id}
          name={post.author_name}
          avatar={post.author_avatar}
          bio={post.author_bio}
        />
      )}
      {postConfig.tags && post.tags && (
        <TagsList tags={post.tags} />
      )}
    </div>
  )
}

export function PrePost({ children, post }: { children: ReactNode, post: Post }) {
  const postConfig = config.pageTypes.posts;
  const author = { id: post.author_id, name: post.author_name, avatar: post.author_avatar, bio: post.author_bio }
  const category = { id: post.category_id, name: post.category_name, slug: post.category_slug }
  const tag = { id: post.tags[0]?.id, name: post.tags[0]?.name, slug: post.tags[0]?.slug }

  return (
    <MainWrapper>
      {isParticles && <ParticlesFull />}
      {config.template.postHeroWithNavbarTransparent && <HeroPost {...post} />}

      <ContentWithSidebar
        sidebarConfig={postConfig.sidebar}
        sidebarData={{
          author,
          category,
          tag,
          postId: post.id
        }}
      >
        <PostBody children={children} post={post} />
      </ContentWithSidebar>
    </MainWrapper>
  )
}