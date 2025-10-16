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

  // Verificar si al menos un componente del sidebar está habilitado
  const showSidebar = postConfig.sidebar.latest || postConfig.sidebar.author ||
    postConfig.sidebar.categories || postConfig.sidebar.tags;

  return (
    <MainWrapper>
      {isParticles && <ParticlesFull />}
      {config.template.postHeroWithNavbarTransparent && <HeroPost {...post} />}

      <Section className="w-[80vw] pt-20 flex justify-center items-center ">
        <div className='w-[25vw]' />
        <div className="w-[90vw] pt-20 flex gap-5">
          <PostBody children={children} post={post} />

          {showSidebar && (
            <div className="w-[800px] flex-col gap-5 lg:flex hidden">
              {postConfig.sidebar.latest && <LatestPosts />}
              {postConfig.sidebar.author && <AuthorPosts author={author} />}
              {postConfig.sidebar.categories && <CategoryPosts category={category} />}
              {postConfig.sidebar.tags && tag && <TagPosts tag={tag} />}
            </div>
          )}
        </div>
      </Section>
    </MainWrapper>
  )
}