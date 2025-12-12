import { fetchAuthors } from "@/api-fetcher/fetcher"
import { Link } from "@/components/juankui/optionals/link"
import { createPageWithDescription } from "@/utils/metadata-generator";

export async function generateMetadata() {
  return createPageWithDescription("Authors", "Authors")
}

export default async function AuthorsPage() {
  const authors = await fetchAuthors()
  return (
    <div className="flex w-full flex-1 flex-wrap items-center justify-center">

      <div className="flex max-w-lg flex-wrap gap-5">
        {authors.map((author) => {
          return (
            <Link href={`authors/` + author.slug} className="max-w-[200px] gap-5 rounded-xl bg-slate-800 p-4 text-white">
              <span>{author.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}