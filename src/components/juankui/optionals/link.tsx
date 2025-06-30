import NextLink from "next/link"
import { Link as ViewTLink } from "next-view-transitions"
import { isViewTransitions } from "@/config/options"
import { AnchorHTMLAttributes, ReactNode } from "react"

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: ReactNode
}

export function Link ({ href, children, ...rest }: LinkProps) {

  if (isViewTransitions) {
    return (
      <ViewTLink href={href} {...rest}>
        {children}
      </ViewTLink>
    )
  }

  return (
    <NextLink href={href} {...rest}>
      {children}
    </NextLink>
  )
}