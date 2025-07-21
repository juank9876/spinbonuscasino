import { Card, CardContent } from '@/components/ui/card'
import { ShineBorder } from '@/components/magicui/shine-border'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { Link } from '@/components/juankui/optionals/link'
import { Category, Post } from '@/types/types'

export function CardPostCategory({ post, category }: { post: Post, category: Category }) {
  //const categoryUrl = category.parent_id ? category.parent_slug + "/" + category.slug : category.slug
  const categoryUrl = category.slug
  return (
    <>
      {/*Card para PC*/}
      <Card className="duration-400 hover:to-[var(--color-primary-semi-dark)] relative hidden h-full overflow-hidden border-none p-0 shadow-none transition bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] hover:bg-[var(--color-primary-light)] lg:flex">
        <Link href={`${categoryUrl}/${post.slug}`} className="h-full w-full">
          <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
          <CardContent className="p-5 h-full">
            <div className="itju-center flex h-full flex-row overflow-hidden rounded">
              {/* Imagen izquierda con altura completa */}
              <div className="relative mb-0 h-[200px] w-[200px] overflow-hidden rounded-lg">
                <Image
                  src={
                    post.featured_image ||
                    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop"
                  }
                  alt={post.title}
                  fill
                  className="aspect-square object-cover"
                />
              </div>

              {/* Contenido derecho con altura igual */}
              <div className="flex flex-1 flex-col justify-between px-6 py-3 h-full">
                <h2 className="mb-0 text-start text-3xl font-bold text-white">{post.title}</h2>
                <p className="text-slate-200 mb-0 pb-0 text-sm">{formatDate(post.published_at)}</p>
                <p className="text-slate-200 text-base">{post.excerpt.length > 200 ? post.excerpt.slice(0, 200) + "..." : post.excerpt}</p>

                <div className=" px-5 flex flex-row items-center justify-start space-x-3  py-3 bg-[var(--color-accent-dark)] border border-[var(--color-accent-light)] rounded-lg">
                  <div className=" size-10 relative overflow-hidden rounded-full">
                    <Image
                      src={
                        post.author_avatar ||
                        `https://api.dicebear.com/7.x/lorelei/svg?seed=${post.author_name || "default"}`
                      }
                      alt={post.id}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-row items-center gap-2 text-xs text-white">
                    <span className='text-sm'>{formatDate(post.published_at)}</span>
                    <span>·</span>
                    <span className='text-sm'>{post.author_name.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>

      {/*Card para movil*/}
      <Card className="duration-400 scale-custom relative w-full overflow-hidden border-none p-0 shadow-none transition hover:bg-[var(--color-primary-dark)] lg:hidden">
        <Link href={`/categories/${category.slug}/${post.slug}`} className="block w-full">
          <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

          {/* Imagen como background */}
          <div
            className="h-ful relative w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${post.featured_image || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop"})`,
            }}
          >
            {/* Overlay oscuro con filtro */}
            <div className="backdrop-blur-xs absolute inset-0 h-full bg-black/70"></div>

            {/* Contenido centrado */}
            <CardContent className="relative z-10 flex h-full flex-col justify-between p-5 text-white">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">{post.title}</h2>
                <p className="text-sm text-white opacity-80">{formatDate(post.published_at)}</p>
                <p className="text-base text-white opacity-90">{post.excerpt}</p>
              </div>

              {/* Autor */}
              <div className="flex flex-row items-center space-x-3">
                <div className="size-10 relative mb-0 overflow-hidden rounded-full">
                  <Image
                    src={
                      post.author_avatar ||
                      `https://api.dicebear.com/7.x/lorelei/svg?seed=${post.author_name || "default"}`
                    }
                    alt={post.id}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-muted text-sm">{post.author_name}</p>
              </div>
            </CardContent>
          </div>
        </Link>
      </Card>

    </>
  )
}