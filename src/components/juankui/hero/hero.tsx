import { Calendar1, Dice6, Gift, Star, Zap, Trophy, Crown, Sparkles } from "lucide-react"
import { ButtonRipple, LinkRipple } from "../legacy/ripple-components"
import { VideoHero } from "../optionals/video-hero"
import Image from "next/image"
import { Post, Page, SiteSettings, Category } from '@/types/types'
import { cn, formatDate } from "@/lib/utils"
import { Breadcrumbs } from "./breadcrumbs"
import { ParticlesFull } from "./particles"
import { Particles } from "@/components/magicui/particles"
import { Highlighter } from "@/components/magicui/highlighter"

type HomeProps = SiteSettings & Page

export function HeroHomePage({ title, meta_title, meta_description, site_title, site_description }: HomeProps) {
  function CasinoBadge() {
    return (
      <div className="flex flex-col items-center space-y-3 ">
        <div className="hidden group/badge duration-400 w-fit lg:flex flex-row items-center justify-center rounded-full  transition-all hover:shadow-yellow-500/40 hover:scale-105">
          <Crown size={20} className="mr-2 inline text-amber-300 animate-pulse" />
          <p className="text-lg text-amber-300 font-bold group-hover/badge:text-yellow-800">Guia de Casinos PREMIUM en Españita</p>
        </div>

      </div>
    )
  }



  return (
    <section className="relative flex min-h-[60vh] lg:h-full w-full flex-col items-center justify-end overflow-hidden mb-10 bg-gradient-to-b from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary)]">


      <div className=" py-20 w-full flex h-full flex-col items-center justify-center ">
        <div className="flex flex-col w-full items-center justify-center space-y-5">
          <CasinoBadge />

          <Highlighter action="highlight" color="#8200db" animationDuration={3000} >
            <h1 className="text-center md:text-[64px] font-inter md:leading-[72px] font-bold  text-[34px] leading-[44px] mx-auto flex w-full max-w-[873px] flex-col items-center bg-gradient-to-r from-slate-200 via-slate-4300 to-white bg-clip-text text-transparent animate-pulse">
              {meta_title}
            </h1>
          </Highlighter>
          <p className="text-white max-w-4xl text-center md:text-[20px] md:leading-[28px] font-normal md:px-[86px] ">
            {meta_description}
          </p>


          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-5">
            <ButtonRipple className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-500/25 transform hover:scale-105 transition-all">
              <span className="text-xs md:text-sm font-bold">🎰 JUGAR AHORA</span>
              <Dice6 className="ml-2 inline w-4 h-4 md:w-5 md:h-5 animate-spin" />
            </ButtonRipple>

            <LinkRipple href="#" className=" shadow-lg shadow-green-500/25 transform hover:scale-105 transition-all">
              <span className="text-xs md:text-sm font-bold">🎁 RECLAMAR BONO</span>
              <Gift className="ml-2 inline w-4 h-4 md:w-5 md:h-5 animate-bounce" />
            </LinkRipple>
          </div>

          {/* Responsible Gaming Notice */}
          <div className=" text-center">
            <p className="text-white/60 text-xs md:text-sm">
              🔞 Solo para mayores de 18 años | Juega con responsabilidad
            </p>
          </div>

          <p className="text-white/60 text-xs md:text-sm italic">Visto en</p>

          <Image
            src="/inter-logo.webp"
            alt="hero"
            width={120}
            height={120}
            className=" opacity-60"
          />
        </div>


        <div
          className="h-[15px] w-full overflow-hidden rotate-180 absolute bottom-0 z-10 bg-transparent"
          style={{
            backgroundImage:
              'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTQ0IiBoZWlnaHQ9IjE3IiB2aWV3Qm94PSIwIDAgNTQ0IDE3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik01NDMuNSAyLjM3MjA0TDUyOS42NjEgMTEuODYwNEw1MjIuMTQ4IDIuMzcyMDRMNDg4LjE0NCA1LjkzMDJMNDgyLjIxMyA4LjY5NzY1TDQ0OC42MDQgOC42OTc2NUw0NDIuNjczIDUuOTMwMkw0MjYuNDYxIDguNjk3NjZMNDA0LjcxNCAyLjM3MjA1TDM1NC40OTggMTEuODYwNUwzMzUuNTE5IDIuMzcyMDZMMzIyLjg2NiA1LjkzMDIxTDMxMy43NzIgMi4zNzIwNkwzMDIuMzA1IDE3TDI4MC41NTggNS45MzAyMkwyNDAuNjIzIC0zLjQ1NTY4ZS0wNUwxNzQuNTkxIDExLjg2MDVMMTU0LjQyNSAyLjM3MjA3TDg5LjU3OTcgMTQuMjMyNkw4NC44MzQ4IDUuOTMwMjNMNDcuNjY3MSAxNC4yMzI2TC03LjI5MzU4IC0xLjI4ODMzZS0wNUwtNTQuNzQxNyAxNC4yMzI2TC03Ni44ODQyIDIuMzcyMDlMLTg1Ljk3ODQgMTEuODYwNUwtMTAyLjE5IC00LjU4NzE2ZS0wNkwtMTIyLjM1NSAxNy4wMDAxTC0xMzIuMjQgNS45MzAyNUwtMTYxLjUgNS45NzkwMWUtMDdMLTEwMi4xOSAtNC41ODcxNmUtMDZMLTcuMjkzNTggLTEuMjg4MzNlLTA1TDI0MC42MjMgLTMuNDU1NjhlLTA1TDU0My41IC02LjEwMzUyZS0wNUw1NDMuNSAyLjM3MjA0WiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==")',
            backgroundColor: "transparent",
          }}
        ></div>
      </div>
    </section>
  )
}

export function HeroPage({ title, meta_description, breadcrumbs, featured_image }: Page) {
  return (
    <section className="relative  pt-14 w-full overflow-hidden bg-[var(--color-primary-dark)] min-h-[40vh] flex justify-center items-center">
      {/* Background con efecto parallax */}
      <div className="absolute inset-0 z-0 h-full">
        {featured_image ? (
          <>
            <Image
              src={featured_image}
              alt={title}
              fill
              className="object-cover "
              quality={100}
            />
            <div className="h-full top-0 absolute inset-0 bg-gradient-to-b from-[var(--color-primary-dark)]/50 via-[var(--color-primary-dark)] to-[var(--color-primary)]" />
          </>
        ) : (
          <div className="h-full absolute inset-0 bg-gradient-to-b from-[var(--color-primary-dark)]/20 via-[var(--color-primary-dark)] to-[var(--color-primary)]" />
        )}
      </div>

      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-4 lg:py-0">
        <div className="flex flex-col items-center justify-center py-10">
          {/* Breadcrumbs */}
          {breadcrumbs && (
            <div className="w-full max-w-xl">
              <Breadcrumbs className="flex lg:justify-center justify-start items-center lg:ml-0 ml-2"
                breadcrumbs={breadcrumbs}
              />
            </div>
          )}

          {/* Contenido principal */}
          <div className="w-full max-w-4xl mx-auto text-center space-y-6">
            <h1 className={cn(
              "font-bold text-4xl md:text-5xl lg:text-6xl",
              "text-transparent bg-clip-text",
              "bg-gradient-to-r from-white via-[var(--color-secondary)] to-white",
              "leading-tight",
              "animate-text-shine"
            )}>
              {title}
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto text-left md:text-center leading-relaxed">
              {meta_description}
            </p>

            {/* Elementos decorativos */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="size-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />
              <Dice6 className="size-6 text-[var(--color-accent)] animate-spin-slow" />
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />
              <div className="size-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HeroPost({ title, excerpt, author_avatar, author_name, created_at, breadcrumbs }: Post) {
  return (
    <section className="relative flex min-h-[40vh] w-full flex-col items-center justify-center overflow-hidden  bg-gradient-to-b from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary)]">
      <ParticlesFull />

      {/* Main content container */}
      <article className="relative z-10 w-[90vw] max-w-4xl mx-auto text-center ">
        {/* Breadcrumbs */}
        {breadcrumbs && (

          <Breadcrumbs className="flex justify-center items-center pt-25" breadcrumbs={breadcrumbs} />
        )}


        {/* Title */}
        <h1 className="text-white text-center text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight max-w-2xl mx-auto">
          {title}
        </h1>

        {/* Excerpt */}
        <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-lg leading-relaxed px-5 max-w-2xl mx-auto">
          {excerpt}
        </p>

        <div className="flex items-center justify-center space-x-2 sm:space-x-3 pb-20 pt-5">
          {/* Author badge */}
          <header className="group inline-flex items-center justify-center h-10 space-x-2 sm:space-x-3 rounded-full border border-[var(--color-primary-light)] bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] pl-2 pr-3 transition duration-500 hover:border-[var(--color-primary)] hover:to-[var(--color-primary-semi-dark)]">
            <Image
              src={author_avatar || `https://api.dicebear.com/7.x/lorelei/svg?seed=${author_name || "default"}`}
              alt={`Image of ${author_name}`}
              width={28}
              height={28}
              className="size-7 sm:size-8 lg:size-10 rounded-full object-cover"
            />
            <span className="text-sm sm:text-base text-gray-200 group-hover:text-white">{author_name}</span>
          </header>
          {/* Date badge - hidden on mobile, visible on larger screens */}
          <time className="group inline-flex items-center justify-center h-10 space-x-2 sm:space-x-3 rounded-full border border-[var(--color-primary-light)] bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] pl-2 pr-3 transition duration-500 hover:border-[var(--color-primary)] hover:to-[var(--color-primary-semi-dark)]">
            <Calendar1 className="text-white size-4" />
            <span className="text-gray-200 hover:text-white text-sm">{formatDate(created_at)}</span>
          </time>
        </div>

      </article>
    </section >
  )
}

export function HeroCategory({ name, description, breadcrumbs }: Category) {
  return (
    <section className="relative flex h-[60vh] lg:h-[60vh] w-full flex-col items-center justify-center overflow-hidden mb-10">
      <ParticlesFull />
      <div className="w-full flex h-full flex-col items-center justify-center bg-gradient-to-b from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary)] ">
        <div className="m-0 w-full lg:w-[60vw] flex flex-col items-center justify-center  p-4 py-9 md:gap-9 md:px-8 lg:px-12 lg:py-20">

          <h1 className="text-white text-center md:text-[64px] font-inter md:leading-[72px] font-bold mb-4 md:mt-0 mt-2 text-[34px] leading-[44px] mx-auto flex w-full max-w-[873px] flex-col items-center">
            {name}
          </h1>
          <p className=" text-white text-center md:text-[20px] md:leading-[28px] font-normal md:px-[86px]">{description}</p>
          {breadcrumbs && <Breadcrumbs className="flex justify-center" breadcrumbs={breadcrumbs} />}
        </div>
      </div>
    </section>
  )
}