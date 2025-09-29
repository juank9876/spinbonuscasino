import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PrePage } from '@/components/juankui/pre-rendered/pre-page'
import { PrePost } from '@/components/juankui/pre-rendered/pre-post'
import NotFound from '@/app/not-found'
import { createMetadata } from '@/app/seo/createMetadata'
import {
  getContentData,
  getPageFromSlug,
} from '@/lib/fetch-data/getPageOrPostData'
import { handleRedirect } from '@/utils/handleRedirect'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  await handleRedirect(slug)
  const meta = await createMetadata(slug)
  console.log(meta)
  return meta
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = await getContentData(slug)
  //por seguridad otro check, ya que el primero se ejecuta con delay
  await handleRedirect(slug)
  if (!content) {
    return <NotFound />
  }


  // Renderizar según el tipo de contenido
  if (content.type === 'page') {
    const { data: page } = content
    return (
      <PrePage page={page}>
        <HtmlRenderer
          html={page.html_content}
          cssContent={page.css_content || undefined}
        />
      </PrePage>
    )
  }

  else if (content.type === 'post') {
    const { data: post } = content
    return (
      <PrePost post={post.post}>
        <HtmlRenderer
          html={post.post.html_content}
          cssContent={post.post.css_content || undefined}
        />
      </PrePost>
    )
  }
  else return <NotFound />
}