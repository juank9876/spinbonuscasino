import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PrePage } from '@/components/juankui/pre-rendered/pre-page'
import { fetchArticleById, fetchPageById, fetchSlugToId } from '@/api-fetcher/fetcher'
import NotFound from '@/app/not-found'
import { createMetadata } from '@/app/seo/createMetadata'
import { PrePost } from '@/components/juankui/pre-rendered/pre-post'
/*
async function getHomePageFromParams() {

  const map = await getPageSlugToIdMap();
  const slug = "home";
  const id = map[slug];


  const homePage = await fetchPageById(id)
  return homePage
}
*/
async function getPageFromParams({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params
  const id = await fetchSlugToId(slug, "page")

  const page = await fetchPageById(id || "")
  return page
}

async function getPostFromParams({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const id = await fetchSlugToId(slug, "post")

  const post = await fetchArticleById(id || "")
  return post
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const page = await getPageFromParams({ params })

  return await createMetadata(page);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const page = await getPageFromParams({ params })

  if (page) return (
    <PrePage page={page}>
      <HtmlRenderer html={page.html_content} cssContent={page.css_content} />
    </PrePage>
  )

  if (!page) {
    const post = await getPostFromParams({ params })

    if (post) return (
      <PrePost post={post.post}>
        <HtmlRenderer html={post.post.html_content} cssContent={post.post.css_content} />
      </PrePost>
    )
    else return <NotFound />
  }
}
