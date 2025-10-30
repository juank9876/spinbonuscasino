import { Card, CardContent } from '@/components/ui/card'
import { ShineBorder } from '@/components/magicui/shine-border'
import Image from 'next/image'
import { formatDate, limitCharacters } from '@/lib/utils'
import { Link } from '@/components/juankui/optionals/link'
import { Post } from '@/types/types'

export function CardPostCategory({ post }: { post: Post }) {

  const categoryPath = post.category_hierarchy?.map(cat => cat.slug).join('/') || '';
  const postUrl = `/${categoryPath}/${post.slug}`;
  // Resultado: /tips/premier-league/article-slug
  return (
    <>
      {/*Card para PC*/}
      <Link
        href={postUrl}
        className="
          group relative hidden lg:flex 
          w-[300px] h-[550px] to-blue-950
           transition-all duration-500 
           p-5 flex-col
        "
      >

        {/* Imagen fija */}
        <div className="relative w-full h-[200px] min-h-[200px] overflow-hidden rounded-md shadow-md transition-transform duration-300">
          <Image
            src={
              post.featured_image ||
              "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop"
            }
            alt={post.title}
            fill
            className="object-cover object-center"
            priority
            sizes="300px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-60 group-hover:opacity-0 transition-all duration-300"></div>
        </div>

        {/* Contenido */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="space-y-1">
            <h2 className="text-start text-xl font-semibold leading-tight tracking-tight hover:underline mt-4">
              {post.title}
            </h2>

            <p className="text-sm leading-relaxed text-gray-600 padding-none">
              {limitCharacters(post.excerpt, 120)}
            </p>
          </div>

          {/* Autor */}
          <div className="mt-2 flex flex-col items-start gap-4 px-2 ">
            <div className=" bg-gray-300 w-full h-px my-4" />
            <div className="flex flex-row items-center gap-2">
              <div className="relative size-12 flex-shrink-0 overflow-hidden rounded-full  shadow-md">
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

              <div className="flex flex-col items-start gap-1">
                <span className="text-xs font-semibold text-gray-600">{post.author_name.toUpperCase()}</span>
                <span className="text-xs font-normal text-gray-600">
                  {formatDate(post.updated_at)}
                </span>
              </div>
            </div>
          </div >
        </div>
      </Link>



      {/*Card para movil*/}
      < Card className="duration-500 relative w-full overflow-hidden border-none p-0 shadow-lg transition hover:shadow-xl hover:shadow-[var(--color-accent-dark)]/20 lg:hidden" >
        <Link
          href={post.seo_url}
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
                <p className="text-sm text-white/90 font-medium">{formatDate(post.updated_at)}</p>
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
                  <span className=" text-xs text-white/70">{formatDate(post.updated_at)}</span>
                </div>
              </div>
            </CardContent>
          </div>
        </Link>
      </Card >

    </>
  )
}