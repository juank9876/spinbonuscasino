import { Calendar1, Dice6, Gift, Star } from "lucide-react"
import { ButtonRipple, LinkRipple } from "../legacy/ripple-components"
import { VideoHero } from "../optionals/video-hero"
import Image from "next/image"
import { Post, Page, SiteSettings, Category } from '@/types/types'
import { formatDate } from "@/lib/utils"
import { Breadcrumbs } from "./breadcrumbs"
import { ParticlesFull } from "./particles"

type HomeProps = SiteSettings & Page

export function HeroHomePage({ title, meta_title, meta_description, site_title, site_description }: HomeProps) {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden pb-10">
      <ParticlesFull />
      <VideoHero />
      <div className="w-full flex h-full flex-col items-center justify-center bg-gradient-to-b from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary)] ">
        <div className="m-0 w-full flex items-center justify-center  p-4 py-9 md:gap-9 md:px-8 lg:px-12 lg:py-20">

          <div className="flex flex-col w-full items-center justify-center space-y-2">
            <div
              className=" group/badge duration-400 w-fit flex flex-row items-center justify-center rounded-full bg-gradient-to-t from-[var(--color-accent)] to-[var(--color-accent)] px-5 opacity-90 transition hover:to-[var(--color-primary)]"
            >
              <Star size={18} className="mr-2 inline text-[var(--color-accent-light)]" />
              <p className="text-lg text-muted font-bold group-hover/badge:text-white">{site_title}</p>
            </div>
            <h1 className="text-white text-center md:text-[64px] font-inter md:leading-[72px] font-bold mb-4 md:mt-0 mt-2 text-[34px] leading-[44px] mx-auto flex w-full max-w-[873px] flex-col items-center">
              {site_title}
            </h1>
            <p className="  text-white text-center md:text-[20px] md:leading-[28px] font-normal md:px-[86px]">{site_description || meta_description}</p>

            <div className="flex flex-row items-center justify-center space-x-5 lg:py-5">
              <ButtonRipple>
                New Casinos <Dice6 size={20} className="ml-2 inline" />
              </ButtonRipple>
              <LinkRipple href="#">
                Bonus <Gift size={20} className="ml-2 inline" />
              </LinkRipple>
            </div>
          </div>

          <div
            className="h-[17px] w-full overflow-hidden rotate-180 absolute bottom-0 z-10 bg-transparent"
            style={{
              backgroundImage:
                'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTQ0IiBoZWlnaHQ9IjE3IiB2aWV3Qm94PSIwIDAgNTQ0IDE3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik01NDMuNSAyLjM3MjA0TDUyOS42NjEgMTEuODYwNEw1MjIuMTQ4IDIuMzcyMDRMNDg4LjE0NCA1LjkzMDJMNDgyLjIxMyA4LjY5NzY1TDQ0OC42MDQgOC42OTc2NUw0NDIuNjczIDUuOTMwMkw0MjYuNDYxIDguNjk3NjZMNDA0LjcxNCAyLjM3MjA1TDM1NC40OTggMTEuODYwNUwzMzUuNTE5IDIuMzcyMDZMMzIyLjg2NiA1LjkzMDIxTDMxMy43NzIgMi4zNzIwNkwzMDIuMzA1IDE3TDI4MC41NTggNS45MzAyMkwyNDAuNjIzIC0zLjQ1NTY4ZS0wNUwxNzQuNTkxIDExLjg2MDVMMTU0LjQyNSAyLjM3MjA3TDg5LjU3OTcgMTQuMjMyNkw4NC44MzQ4IDUuOTMwMjNMNDcuNjY3MSAxNC4yMzI2TC03LjI5MzU4IC0xLjI4ODMzZS0wNUwtNTQuNzQxNyAxNC4yMzI2TC03Ni44ODQyIDIuMzcyMDlMLTg1Ljk3ODQgMTEuODYwNUwtMTAyLjE5IC00LjU4NzE2ZS0wNkwtMTIyLjM1NSAxNy4wMDAxTC0xMzIuMjQgNS45MzAyNUwtMTYxLjUgNS45NzkwMWUtMDdMLTEwMi4xOSAtNC41ODcxNmUtMDZMLTcuMjkzNTggLTEuMjg4MzNlLTA1TDI0MC42MjMgLTMuNDU1NjhlLTA1TDU0My41IC02LjEwMzUyZS0wNUw1NDMuNSAyLjM3MjA0WiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==")',
              backgroundColor: "transparent",
            }}
          ></div>
        </div>
      </div>
    </section>
  )
}

export function HeroPage({ title, meta_description, breadcrumbs }: Page) {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden pb-10">
      <ParticlesFull />
      <div className="w-full flex h-full flex-col items-center justify-center bg-gradient-to-b from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary)] ">
        <div className="m-0 w-full flex items-center justify-center gap-5 p-4 py-9 md:gap-9 md:px-8 lg:px-12 lg:py-20">
          <div className="flex flex-col w-[70vw] items-center justify-center space-y-2">
            <h1 className="text-white text-center md:text-[64px] font-inter md:leading-[72px] font-bold mb-4 md:mt-0 mt-2 text-[34px] leading-[44px] mx-auto flex w-full max-w-[873px] flex-col items-center">
              {title}
            </h1>
            <p className=" text-white text-center md:text-[20px] md:leading-[28px] font-normal md:px-[86px]">{meta_description}</p>
            {breadcrumbs && <Breadcrumbs className="flex justify-center" breadcrumbs={breadcrumbs} />}
          </div>
        </div>
      </div>
    </section>
  )
}

export function HeroPost({ title, excerpt, author_avatar, author_name, created_at, breadcrumbs }: Post) {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden pb-10">
      <ParticlesFull />
      <div className="w-full flex h-full flex-col items-center justify-center bg-gradient-to-b from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary)] ">
        <div className="m-0 w-full flex items-center justify-center gap-5 p-4 py-9 md:gap-9 md:px-8 lg:px-12 lg:py-20">
          <div className="flex flex-col w-[70vw] items-center justify-center space-y-2">
            <div className="group-badge group mb-0 flex w-max flex-row items-center justify-between space-x-2 rounded-full border border-[var(--color-primary-light)] bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] pl-2 pr-3 transition duration-500 hover:border-[var(--color-primary)] hover:to-[var(--color-primary-semi-dark)] lg:space-x-3">
              <div className="size-7 lg:size-10 relative mb-0 overflow-hidden rounded-full">
                <Image
                  src={author_avatar || `https://api.dicebear.com/7.x/lorelei/svg?seed=${author_name || "default"}`}
                  alt={`Image of ${author_name}`}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-gray-200 [.group-badge:hover_&]:text-white">{author_name}</p>
            </div>
            <h1 className="text-white text-center md:text-[64px] font-inter md:leading-[72px] font-bold mb-4 md:mt-0 mt-2 text-[34px] leading-[44px] mx-auto flex w-full max-w-[873px] flex-col items-center">
              {title}
            </h1>
            <p className=" text-white text-center md:text-[20px] md:leading-[28px] font-normal md:px-[86px]">{excerpt}</p>
            <div className="flex w-max flex-row items-center justify-between space-x-3 rounded-full border border-[var(--color-primary-light)] bg-gradient-to-bl from-[var(--color-accent)] to-[var(--color-primary)] px-3 pr-3 transition duration-500 hover:border-[var(--color-primary)] hover:to-[var(--color-primary-semi-dark)]">
              <Calendar1 className="text-white" />
              <p className="text-gray-200 hover:text-white">{formatDate(created_at)}</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-3 mt-8">
              {breadcrumbs && <Breadcrumbs className="flex justify-center" breadcrumbs={breadcrumbs} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HeroCategory({ name, description, breadcrumbs }: Category) {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden pb-10">
      <ParticlesFull />
      <div className="w-full flex h-full flex-col items-center justify-center bg-gradient-to-b from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary)] ">
        <div className="m-0 w-full flex items-center justify-center gap-5 p-4 py-9 md:gap-9 md:px-8 lg:px-12 lg:py-20">
          <div className="flex flex-col w-[50vw] items-center justify-center space-y-2">
            <h1 className="text-white text-center md:text-[64px] font-inter md:leading-[72px] font-bold mb-4 md:mt-0 mt-2 text-[34px] leading-[44px] mx-auto flex w-full max-w-[873px] flex-col items-center">
              {name}
            </h1>
            <p className=" text-white text-center md:text-[20px] md:leading-[28px] font-normal md:px-[86px]">{description}</p>
            {breadcrumbs && <Breadcrumbs className="flex justify-center" breadcrumbs={breadcrumbs} />}
          </div>
        </div>
      </div>
    </section>
  )
}