import { fetchArticles, fetchCategories, fetchPages } from "@/api-fetcher/fetcher"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeUrl(url: string): string {
  return '/' + url.replace(/^\/+/, '')
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

type PageMeta = {
  id: string
  slug: string
  // puedes añadir más campos si los necesitas
}

type SlugToIdMap = Record<string, string>

export async function getPageSlugToIdMap(): Promise<SlugToIdMap> {
  const pages = await fetchPages()
  //console.log(pages)
  const slugIds: PageMeta[] = pages

  const map: SlugToIdMap = {}
  for (const slugId of slugIds) {
    map[slugId.slug] = slugId.id
  }

  return map
}

export async function getCategorySlugToIdMap(): Promise<SlugToIdMap> {
  const categories = await fetchCategories()
  //console.log(categories)
  const slugIds: PageMeta[] = categories

  const map: SlugToIdMap = {}
  for (const slugId of slugIds) {
    map[slugId.slug] = slugId.id
  }

  return map
}

export async function getPostSlugToIdMap(): Promise<SlugToIdMap> {
  const posts = await fetchArticles()
  //console.log(categories)
  const slugIds: PageMeta[] = posts

  const map: SlugToIdMap = {}
  for (const slugId of slugIds) {
    map[slugId.slug] = slugId.id
  }

  return map
}