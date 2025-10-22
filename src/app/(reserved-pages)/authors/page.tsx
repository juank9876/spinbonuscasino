import { fetchAuthors } from "@/api-fetcher/fetcher"

export default async function AuthorsPage () {
  const authors = await fetchAuthors()
  return (
    <div className="flex w-full flex-1 flex-wrap items-center justify-center">

      <div className="flex max-w-lg flex-wrap gap-5">
        {authors.map((author) => {
          return (
            <a href={`authors/` + author.slug} className="max-w-[200px] gap-5 rounded-xl bg-slate-800 p-4 text-white">
              <span>{author.name}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}