import { fetchSiteSettings } from "@/api-fetcher/fetcher"
import { SiteSettings } from "@/types/types"

export async function contextSiteSettings() {
  const settings: SiteSettings = await fetchSiteSettings()

  return settings
}

//para trabajar
export async function contextAuthor() {
  const settings: SiteSettings = await fetchSiteSettings()

  return settings
}