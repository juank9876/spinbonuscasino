'use client'

import { capitalize } from '@/utils/capitalize'
import { NavItemType, Slug } from '@/types/types'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from './nav-link'
import { cn } from '@/lib/utils'
import { Link } from '../../optionals/link'

// ============================================================================
// CONSTANTES Y ESTILOS
// ============================================================================

const MENU_STYLES = {
  base: "flex items-center gap-2 px-4 py-3 text-white relative transition-all duration-200 ease-in-out rounded-lg",
  hover: "hover:text-[var(--color-accent-light)]",
  underline: "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[var(--color-accent)] after:scale-x-0 after:origin-right after:transition-transform after:duration-300",
  underlineHover: "hover:after:scale-x-100 hover:after:origin-left",
  dropdown: "absolute left-0 top-full w-[250px] hidden group-hover/menu:block bg-[var(--color-primary-dark)] backdrop-blur-sm rounded-lg shadow-lg shadow-black/5 border border-gray-600/20 transform origin-top-left transition-all duration-200 ease-out opacity-0 -translate-y-2 group-hover/menu:opacity-100 group-hover/menu:translate-y-0 z-20 py-5",
  submenu: "absolute left-full top-0 w-[220px] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg shadow-black/5 border border-gray-100/20 transition-all duration-200 ease-out transform origin-top-left z-30 ml-1"
} as const

// ============================================================================
// COMPONENTES
// ============================================================================

type ListItemProps = {
  title: string
  href: string
  isChild?: boolean
  childCategories?: NavItemType[]
  parentSlug?: string
}

type rotation = "rotate-90" | "rotate-0" | "rotate-180" | "rotate-270"

function ChevronIcon({ isSubmenu, rotation }: { isSubmenu?: boolean; rotation: rotation }) {
  const Icon = isSubmenu ? ChevronRight : ChevronUp

  return (
    <Icon
      className={cn(
        "text-current h-4 w-4 transition-transform duration-300 ease-out",
        isSubmenu ? "ml-auto" : "ml-1",
        rotation
      )}
    />
  )
}

function ListItem({ title, href, isChild = false, childCategories, parentSlug }: ListItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const hasSubcategories = childCategories && childCategories.length > 0
  const fullHref = parentSlug ? `${parentSlug}${href}` : href
  const fullParentSlug = parentSlug ? parentSlug + href : href

  return (
    <li
      className={cn("relative group/item w-full flex", hasSubcategories && "has-submenu")}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <NavLink
        href={fullHref}
        className={cn(
          "flex w-full items-center gap-2 px-4 py-3 text-white relative transition-all duration-200 ease-in-out rounded-lg",
          "hover:text-[var(--color-accent)]",
          "before:absolute before:inset-0 before:bg-[var(--color-accent-light)]/10",
          "before:scale-x-0 before:opacity-0 before:transition-all",
          "hover:before:scale-x-100 hover:before:opacity-100",
          isChild ? "pl-8 text-sm" : "text-md font-semibold"
        )}
      >
        {title}
        {hasSubcategories && <ChevronIcon rotation={isOpen ? "rotate-0" : "rotate-90"} isSubmenu />}
      </NavLink>

      {hasSubcategories && (
        <ul
          className={cn(
            MENU_STYLES.submenu,
            isOpen ? "bg-black scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
          )}
        >
          {childCategories.map((subcat) => (
            <ListItem
              key={subcat.id}
              title={capitalize(subcat.title)}
              href={subcat.url}
              childCategories={subcat.children}
              parentSlug={fullParentSlug}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function MenuItemWithDropdown({
  item,
  allSlugs
}: {
  item: NavItemType
  allSlugs: Slug[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const getCategoryPrefix = (categoryUrl: string) => {
    const foundCategory = Object.entries(allSlugs).find(
      ([slug]) => `/${slug}` === categoryUrl
    )
    return foundCategory ? '/categories' : ''
  }

  return (
    <>
      <Link
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        href={item.url}
        className={cn(
          MENU_STYLES.base,
          MENU_STYLES.hover,
          MENU_STYLES.underline,
          "text-base font-bold tracking-wide links-simple",
          "group-hover/menu:after:scale-x-100 group-hover/menu:after:origin-left"
        )}
      >
        {capitalize(item.title)}
        <ChevronIcon rotation={isOpen ? "rotate-90" : "rotate-0"} isSubmenu />
      </Link>

      <div className={MENU_STYLES.dropdown}>
        <ul className="py-0">
          {item.children?.map((category) => (
            <ListItem
              key={category.id}
              title={capitalize(category.title)}
              href={category.url}
              childCategories={category.children}
              parentSlug={getCategoryPrefix(category.url)}
            />
          ))}
        </ul>
      </div>
    </>
  )
}

function MenuItemSimple({ item }: { item: NavItemType }) {
  return (
    <NavLink
      href={item.url}
      className={cn(
        MENU_STYLES.base,
        MENU_STYLES.hover,
        MENU_STYLES.underline,
        MENU_STYLES.underlineHover,
        "text-base font-bold tracking-wide links-simple"
      )}
    >
      {item.title}
    </NavLink>
  )
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function RenderMenu({
  normalizedItems,
  allSlugs
}: {
  normalizedItems: NavItemType[]
  allSlugs: Slug[]
}) {
  return (
    <nav>
      <ul className="flex flex-row gap-2 items-center justify-center w-full border-0 shadow-none py-0">
        {normalizedItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0

          return (
            <li key={item.id} className="relative group/menu">
              {hasChildren ? (
                <MenuItemWithDropdown item={item} allSlugs={allSlugs} />
              ) : (
                <MenuItemSimple item={item} />
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}