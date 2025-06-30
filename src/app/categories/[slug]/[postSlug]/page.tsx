// app/[slug]/post.tsx
import { notFound } from 'next/navigation'
//import { Metadata } from 'next'
import { capitalize } from '@/utils/capitalize'
import { PrePost } from '@/components/juankui/pre-rendered/pre-post'
import HtmlRenderer from '@/components/html-transform/html-renderer'
//import { PagePostSlugProps } from '@/types/types'
import { getPostSlugToIdMap } from '@/lib/utils'
import { fetchArticleById } from '@/api-fetcher/fetcher'

async function getPostFromParams ({
  params,
}: {
  params: Promise<{ postSlug: string }>
}) {
  const map = await getPostSlugToIdMap()
  const { postSlug } = await params
  const id = map[postSlug]

  if (!id) return notFound()
  const post = await fetchArticleById(id)
  return post
}

export async function generateMetadata ({
  params,
}: {
  params: Promise<{ postSlug: string }>
}) {
  try {
    const post = (await getPostFromParams({ params })).post

    return {
      title: capitalize(post.title || ''),
      description: capitalize(post.excerpt || ''),
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    notFound()
  }
}

export default async function PostPage ({
  params,
}: {
  params: Promise<{ postSlug: string }>
}) {
  try {
    const post = (await getPostFromParams({ params })).post
    return (
      <PrePost post={post}>
        <HtmlRenderer html={post.html_content} />
      </PrePost>
    )
  } catch (error) {
    console.log('Error fetching post:', error)
    notFound()
  }
}

