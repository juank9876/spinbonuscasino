import { Calendar1, Dice6, Gift, Star } from "lucide-react"
import { BoxReveal } from "../magicui/box-reveal"
import { ButtonRipple, LinkRipple } from "./legacy/ripple-components"
import { VideoHero } from "./optionals/video-hero"
import Image from "next/image"
import { Post, Page, SiteSettings, Category } from '@/types/types'
import { formatDate } from "@/lib/utils"
import { BorderBeam } from "../magicui/border-beam"
import { Card, CardContent } from "../ui/card"
import { MagicCard } from "../magicui/magic-card"
import { Breadcrumbs } from "./breadcrumbs"
import { ParticlesFull } from "./particles"



export function HeroHomePage({ meta_title, meta_description, site_title, site_description }: SiteSettings) {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <ParticlesFull />
      <VideoHero />
      <div className="w-full flex h-full flex-col items-center justify-center bg-gradient-to-b from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary)] ">
        <div className="m-0 w-full flex items-center justify-center gap-5 p-4 py-9 md:gap-9 md:px-8 lg:px-12 lg:py-20">

          <div className="flex flex-col w-full items-center justify-center space-y-5">
            <div
              className=" group/badge duration-400 w-1/7 flex flex-row items-center justify-center rounded-full bg-gradient-to-t from-[var(--color-accent)] to-[var(--color-accent)] px-5 opacity-90 transition hover:to-[var(--color-primary)]"
            >
              <Star size={18} className="mr-2 inline text-[var(--color-accent-light)]" />
              <p className="text-lg text-muted font-bold group-hover/badge:text-white">{site_title}</p>
            </div>
            <BoxReveal duration={0.5}>
              <h1 className="text-white text-center md:text-[64px] font-inter md:leading-[72px] font-bold mb-4 md:mt-0 mt-2 text-[34px] leading-[44px] mx-auto flex w-full max-w-[873px] flex-col items-center">
                {site_title || meta_title}
              </h1>
            </BoxReveal>

            <BoxReveal duration={0.6}>
              <p className=" line-clamp-2 text-white text-center md:text-[20px] md:leading-[28px] font-normal md:px-[86px]">{site_description || meta_description}</p>
            </BoxReveal>

            <div className="flex flex-row items-center justify-center space-x-5 lg:py-5">
              <ButtonRipple>
                New Casinos <Dice6 size={20} className="ml-2 inline" />
              </ButtonRipple>
              <LinkRipple href="#">
                Bonus <Gift size={20} className="ml-2 inline" />
              </LinkRipple>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HeroPage({ title, meta_description, breadcrumbs }: Page) {
  return (
    <section className="itju-center mb-20 mt-5 flex w-full overflow-hidden bg-transparent">
      <div className="w-custom flex w-full items-start justify-start">
        <Breadcrumbs className="flex" breadcrumbs={breadcrumbs} />
      </div>
      <div className="h-20" />


      <div className="w-custom relative flex h-full flex-col items-center justify-center space-y-5">
        <h1 className="text-5xl">{title}</h1>
        <p className="text-2xl">{meta_description}</p>
      </div>
    </section>
  )
}

export function HeroPost({ title, excerpt, author_avatar, author_name, created_at, breadcrumbs }: Post) {
  return (
    <>
      <section className="itju-center mb-20 mt-5 flex w-full overflow-hidden bg-transparent">
        <div className="w-custom mb-10 flex w-full items-start justify-start">
          <Breadcrumbs className="flex" breadcrumbs={breadcrumbs} />
        </div>

        <Card className="w-custom relative flex h-fit flex-row items-center justify-center p-0">
          <MagicCard className="m-0 w-full p-0">
            <CardContent className="flex flex-col items-center justify-center space-y-5 p-10">
              <BoxReveal duration={0.5}>
                <h1 className="z-10 h-full whitespace-pre-wrap  text-center leading-normal tracking-tighter text-white dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                  {title}
                </h1>
              </BoxReveal>
              <BoxReveal duration={0.7}>
                <p className="text-muted">{excerpt}</p>
              </BoxReveal>

              <div className="flex flex-col items-center justify-center gap-3 lg:flex-row">

                <div className="group-badge group mb-0 flex w-max flex-row items-center justify-between space-x-2 rounded-full border border-[var(--color-primary-light)] bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] pl-2 pr-3 transition duration-500 hover:border-[var(--color-primary)] hover:to-[var(--color-primary-semi-dark)] lg:space-x-3">
                  <div className="size-7 lg:size-10 relative mb-0 overflow-hidden rounded-full">
                    <Image
                      src={
                        author_avatar ||
                        `https://api.dicebear.com/7.x/lorelei/svg?seed=${author_name || "default"}`
                      }
                      alt={`Image of ${author_name}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-gray-200 [.group-badge:hover_&]:text-white">{author_name}</p>
                </div>

                <div className="flex w-max flex-row items-center justify-between space-x-3 rounded-full border border-[var(--color-primary-light)] bg-gradient-to-bl from-[var(--color-accent)] to-[var(--color-primary)] px-3 pr-3 transition duration-500 hover:border-[var(--color-primary)] hover:to-[var(--color-primary-semi-dark)]">
                  <Calendar1 className="text-white" />
                  <p className="text-gray-200 hover:text-white">{formatDate(created_at)}</p>
                </div>
              </div>

            </CardContent>
            <BorderBeam duration={12} size={200} />
          </MagicCard>
        </Card>
      </section>
    </>
  )
}

export function HeroCategory({ name, description, breadcrumbs }: Category) {
  return (
    <>
      <section className="itju-center mb-20 mt-5 flex w-full overflow-hidden bg-transparent">
        <div className="w-custom flex w-full items-start justify-start">
          <Breadcrumbs className="flex" breadcrumbs={breadcrumbs} />
        </div>
        <Card className="w-custom relative flex h-fit flex-col items-center justify-center p-0">
          <MagicCard className="m-0 w-full p-0">
            <CardContent className="flex flex-col items-center justify-center space-y-2 p-10">
              <BoxReveal duration={0.5}>
                <h1 className="z-10 h-full text-center font-bold leading-normal text-white dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                  {name}
                </h1>
              </BoxReveal>
              <BoxReveal duration={0.7}>
                <p className="text-muted text-center text-xl">{description}</p>
              </BoxReveal>
            </CardContent>
          </MagicCard>
        </Card>
      </section>
    </>
  )
}