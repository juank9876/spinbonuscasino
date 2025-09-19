import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PrePage } from '@/components/juankui/pre-rendered/pre-page'
import { fetchArticleById, fetchCheckRedirect, fetchPageById, fetchSlugToId } from '@/api-fetcher/fetcher'
import NotFound from '@/app/not-found'
import { createMetadata } from '@/app/seo/createMetadata'
import { PrePost } from '@/components/juankui/pre-rendered/pre-post'
import { redirect } from 'next/navigation'

async function getRedirectFromParams({ slug }: { slug: string }) {
  const redirectData = await fetchCheckRedirect(slug)
  console.log("redirectData", redirectData)
  console.log("slug", slug)
  if (redirectData.has_redirect) {
    redirect(redirectData.target_url) // ⚡ detiene la renderización y redirige
  }
}

async function getPageFromSlug(slug: string) {
  const id = await fetchSlugToId(slug, "page")
  const page = await fetchPageById(id || "")
  return page
}

async function getPostFromSlug(slug: string) {
  const id = await fetchSlugToId(slug, "post")
  const post = await fetchArticleById(id || "")
  return post
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  // Check for redirects FIRST, before any data fetching
  await getRedirectFromParams({ slug })
  
  // Only fetch data after redirect check passes
  const page = await getPageFromSlug(slug)

  return await createMetadata(page);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  // Check for redirects FIRST, before any data fetching
  await getRedirectFromParams({ slug })
  
  // Only fetch data after redirect check passes
  const page = await getPageFromSlug(slug)

  if (page) return (
    <PrePage page={page}>
      <HtmlRenderer html={page.html_content} cssContent={page.css_content || undefined} />
    </PrePage>
  )

  if (!page) {
    const post = await getPostFromSlug(slug)

    if (post) return (
      <PrePost post={post.post}>
        <HtmlRenderer html={post.post.html_content} cssContent={post.post.css_content || undefined} />
      </PrePost>
    )
    else return <NotFound />
  }
}
