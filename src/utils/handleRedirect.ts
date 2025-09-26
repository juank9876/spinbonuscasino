import { redirect } from "next/navigation"
import { fetchCheckRedirect } from "@/api-fetcher/fetcher"

export async function handleRedirect(slug: string): Promise<void> {
    const redirectData = await fetchCheckRedirect(slug)
    if (redirectData.has_redirect) {
        redirect(redirectData.target_url)
    }
}