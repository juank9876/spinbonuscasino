import { Card, CardContent } from '@/components/ui/card'
import { ShineBorder } from '@/components/magicui/shine-border'
import Image from 'next/image'
import { formatDate, limitCharacters } from '@/lib/utils'
import { Link } from '@/components/juankui/optionals/link'
import { Post } from '@/types/types'

export function CardPostCategory({ post }: { post: Post }) {
  //const categoryUrl = category.parent_id ? category.parent_slug + "/" + category.slug : category.slug
  //const categoryUrl = category.slug
  return (
    <>
      {/*Card para PC*/}
      <Link
        //editado 30.09
        //href={`${categoryUrl}/${post.slug}`}
        href={post.seo_url}
        className="
          group relative hidden lg:flex 
          w-[300px] h-[500px] overflow-hidden rounded-2xl border border-[var(--color-accent-light)]
          bg-gradient-to-b from-[var(--color-primary-dark)] to-blue-950
          shadow-xl transition-all duration-500 
          hover:shadow-2xl hover:shadow-[var(--color-accent-dark)]/30 hover:bg-[var(--color-accent-dark)]
        "
      >
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

        <div className="flex flex-col w-full h-full p-4 gap-4">

          {/* Imagen fija */}
          <div className="relative w-full h-[200px] flex items-center justify-center overflow-hidden rounded-xl shadow-md transition-transform duration-300 group-hover:scale-[1.03]">
            <Image
              src={
                post.featured_image ||
                "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop"
              }
              alt={post.title}
              fill
              className="object-cover object-center"
              priority
            />
            <p className="absolute top-0 right-0 bg-[var(--color-secondary-dark)] rounded-lg  px-2 py-1 text-slate-200 text-xs font-bold border border-[var(--color-secondary)]">
              {formatDate(post.published_at)}
            </p>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
          </div>

          {/* Contenido */}
          <div className="flex flex-1 flex-col justify-between">
            <div className="space-y-2">
              <h2 className="text-start text-lg font-bold text-white leading-tight tracking-tight">
                {post.title}
              </h2>

              <p className="text-slate-200 text-sm leading-relaxed">
                {limitCharacters(post.excerpt, 120)}
              </p>
            </div>

            {/* Autor */}
            <div className="mt-4 flex items-center gap-4 rounded-lg border border-[var(--color-accent-light)] bg-[var(--color-accent-dark)] py-1 px-2 shadow-inner">
              <div className="relative size-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-[var(--color-accent-light)] shadow-md">
                <Image
                  src={
                    post.author_avatar ||
                    `https://api.dicebear.com/7.x/lorelei/svg?seed=${post.author_name || "default"}`
                  }
                  alt={post.author_name || "Author"}
                  fill
                  className="object-cover"
                />
              </div >
              <div className="flex flex-wrap items-center gap-2 text-white text-sm">
                <span className="text-xs font-medium">{formatDate(post.published_at)}</span>
                <span className="text-[var(--color-accent-light)]">·</span>
                <span className="text-xs font-semibold">{post.author_name.toUpperCase()}</span>
              </div>
            </div >
          </div>
        </div >
      </Link >



      {/*Card para movil*/}
      < Card className="duration-500 relative w-full overflow-hidden border-none p-0 shadow-lg transition hover:shadow-xl hover:shadow-[var(--color-accent-dark)]/20 lg:hidden" >
        <Link
          href={`/categories${post.seo_url}`}
          className="block w-full">
          <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

          {/* Imagen como background con altura fija para mejor proporción */}
          <div className="relative h-[420px] w-full">
            <Image
              src={post.featured_image || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop"}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />

            {/* Overlay con gradiente para mejor legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

            {/* Contenido centrado */}
            <CardContent className="absolute inset-0 z-10 flex h-full flex-col justify-between p-6 text-white">
              <div className="mt-4 space-y-3 max-w-[90%]">
                <div className="inline-block rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-medium text-white shadow-md">
                  {post.category_name}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight">{post.title}</h2>
                <p className="text-sm text-white/90 font-medium">{formatDate(post.published_at)}</p>
                <p className="text-base text-white/80 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Autor con mejor diseño */}
              <div className="w-fit flex flex-row items-center space-x-3 bg-black/40 backdrop-blur-sm p-3 rounded-lg border border-white/10 shadow-lg">
                <div className="size-12 relative overflow-hidden rounded-full border-2 border-[var(--color-accent-light)] shadow-md">
                  <Image
                    src={
                      post.author_avatar ||
                      `https://api.dicebear.com/7.x/lorelei/svg?seed=${post.author_name || "default"}`
                    }
                    alt={post.author_name || "Author"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">{post.author_name}</span>
                  <span className=" text-xs text-white/70">{formatDate(post.published_at)}</span>
                </div>
              </div>
            </CardContent>
          </div>
        </Link>
      </Card >

    </>
  )
}