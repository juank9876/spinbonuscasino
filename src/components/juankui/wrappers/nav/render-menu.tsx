'use client'

import { navPosition } from '@/config/options'
import { capitalize } from '@/utils/capitalize'
import { Category, NavItemType, Slug } from '@/types/types';
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from './nav-link';
import { cn } from '@/lib/utils';

type ListItemProps = {
  title: string;
  href: string;
  children?: React.ReactNode;
  className?: string
  isChild?: boolean
  childCategories?: NavItemType[]
  parentSlug?: string
}

function ListItem({ title, href, className, isChild = false, childCategories, parentSlug }: ListItemProps) {
  const hasSubcategories = childCategories && childCategories.length > 0;
  const [open, setOpen] = useState(false);
  const parentSlugFull = parentSlug + href;

  return (
    <li
      className={cn(
        "relative group/item",
        hasSubcategories && "has-submenu"
      )}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        href={parentSlug ? `${parentSlug}${href}` : href}
        className={cn(
          "flex items-center gap-2 px-4 py-3",
          "text-black relative",
          "transition-all duration-200 ease-in-out",
          "hover:text-[var(--color-accent)] text-white",
          "before:absolute before:inset-0 before:bg-[var(--color-accent-light)]/10",
          "before:scale-x-0 before:opacity-0 before:transition-all",
          "hover:before:scale-x-100 hover:before:opacity-100",
          "rounded-lg",
          isChild ? "pl-8 text-sm" : "text-md font-semibold",
        )}
      >
        {title}
        {hasSubcategories && (
          <ChevronUp
            className={cn(
              "text-current ml-auto h-4 w-4",
              "transition-transform duration-300 ease-out",
              open ? "rotate-90" : "rotate-0"
            )}
          />
        )}
      </NavLink>

      {/* Renderizar subcategorías si existen */}
      {hasSubcategories && (
        <ul className={cn(
          "absolute right-full top-0 w-[220px]",
          "bg-white/95 backdrop-blur-sm",
          "rounded-lg shadow-lg shadow-black/5",
          "border border-gray-100/20",
          "transition-all duration-200 ease-out",
          "transform origin-top-right",
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none",
          "z-30"
        )}>
          {childCategories!.map((subcat) => (
            <ListItem
              key={subcat.id}
              title={capitalize(subcat.title)}
              href={subcat.url}
              childCategories={subcat.children}
              parentSlug={parentSlugFull || undefined}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

// ... existing code ...
export function RenderMenu({ normalizedItems, allSlugs }: { normalizedItems: NavItemType[], allSlugs: Slug[] }) {

  return (
    <nav>
      <ul className="flex flex-row gap-2 items-center justify-center w-full  border-0 shadow-none py-0">
        {normalizedItems.map((item) => (
          <li key={item.id} className="relative group/menu">
            {item.children && item.children.length > 0 ? (
              <>
                <span className={cn(
                  "flex items-center gap-2 px-4 py-3",
                  "text-base font-bold tracking-wide text-white",
                  "cursor-pointer relative",
                  "transition-all duration-200 ease-in-out",
                  "hover:text-[var(--color-accent-light)]",
                  "after:absolute after:bottom-0 after:left-0",
                  "after:h-[2px] after:w-full",
                  "after:bg-[var(--color-accent)]",
                  "after:scale-x-0 after:origin-right",
                  "after:transition-transform after:duration-300",
                  "group-hover/menu:after:scale-x-100 group-hover/menu:after:origin-left",
                  "rounded-lg"
                )}>
                  {capitalize(item.title)}
                  <ChevronDown className={cn(
                    "ml-1 h-4 w-4",
                    "transition-transform duration-300 ease-out",
                    "group-hover/menu:rotate-180"
                  )} />
                </span>

                <div className={cn(
                  "absolute left-0 top-full w-[250px] hidden group-hover/menu:block",
                  "bg-[var(--color-primary-dark)] backdrop-blur-sm",
                  "rounded-lg shadow-lg shadow-black/5",
                  "border border-gray-600/20",
                  "transform origin-top-left",
                  "transition-all duration-200 ease-out",
                  "opacity-0 -translate-y-2",
                  "group-hover/menu:opacity-100 group-hover/menu:translate-y-0",
                  "z-20",
                  "py-5"
                )}>
                  <ul className="py-0">
                    {item.children.map((category) => {

                      const foundCategory = Object.entries(allSlugs).find(([slug, data]) => {
                        return '/' + slug === category.url;
                      });
                      // Construir href
                      const isCategory = foundCategory ? `/categories` : "";

                      return (
                        <ListItem
                          key={category.id}
                          title={capitalize(category.title)}
                          href={category.url}
                          childCategories={category.children}
                          parentSlug={isCategory} />
                      )
                    })}
                  </ul>
                </div>
              </>
            ) : (
              <NavLink
                href={`${item.url}`}
                className={cn(
                  "px-4 py-3 text-base font-bold",
                  "tracking-wide text-white",
                  "transition-all duration-200 ease-in-out",
                  "hover:text-[var(--color-accent-light)]",
                  "relative",
                  "after:absolute after:bottom-0 after:left-0",
                  "after:h-[2px] after:w-full",
                  "after:bg-[var(--color-accent)]",
                  "after:scale-x-0 after:origin-right",
                  "after:transition-transform after:duration-300",
                  "hover:after:scale-x-100 hover:after:origin-left",
                  "rounded-lg"
                )}
              >
                {item.title}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}// ... existing code ...
