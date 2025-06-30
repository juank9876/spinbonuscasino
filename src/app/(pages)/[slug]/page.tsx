// app/[slug]/page.tsx
import { notFound } from 'next/navigation'
//import { Metadata } from 'next'
import { capitalize } from '@/utils/capitalize'
import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PrePage } from '@/components/juankui/pre-rendered/pre-page'
//import { PageSlugProps } from '@/types/types'
import { fetchPageById } from '@/api-fetcher/fetcher'
import { getPageSlugToIdMap } from '@/lib/utils'
//import { Metadata } from 'next'

async function getPageFromParams ({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const map = await getPageSlugToIdMap()
  const { slug } = await params
  const id = map[slug]

  if (!id) return notFound()

  const category = await fetchPageById(id)
  return category
}

export async function generateMetadata ({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    const page = await getPageFromParams({ params })

    return {
      title: capitalize(page.title || ''),
      description: capitalize(page.meta_description || ''),
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    notFound()
  }
}

export default async function Page ({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    const page = await getPageFromParams({ params })

    if (!page || page.status !== 'published') return notFound()

    return (
      <PrePage page={page}>
        <HtmlRenderer html={page.html_content} />
      </PrePage>
    )
  } catch (error) {
    console.log('Error generating metadata:', error)
    notFound()
  }
}
