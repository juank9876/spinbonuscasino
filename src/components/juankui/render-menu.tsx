'use client'

import { navPosition } from '@/config/options'
//import menu from '@/lib/menu.json'
import { capitalize } from '@/utils/capitalize'
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'

import { Fragment, useState } from 'react';
import { Category, NavItemType } from '@/types/types';
import { ArrowRight } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Link } from './optionals/link';

type ListItemProps = {
  title: string;
  href: string;
  children?: React.ReactNode;
  className?: string
  isChild?: boolean
  childCategories?: Category[]
  parentSlug?: string
}

function ListItem({ title, href, children, className, isChild = false, childCategories, parentSlug }: ListItemProps) {
  const hasSubcategories = childCategories && childCategories.length > 0;
  console.log(parentSlug, href)
  return (
    <li className={hasSubcategories ? 'group relative' : ''}>

      <Link
        href={parentSlug ? `${parentSlug}/${href}` : '/categories/' + href}
        className={`flex items-start px-4 py-3 text-md text-black hover:bg-[var(--color-secondary-light)] rounded-lg font-semibold transition-colors duration-150 ${isChild ? 'pl-8 text-sm' : ''}`}
      >
        {title}
        {hasSubcategories && (
          <ChevronRight className="text-white ml-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
        )}
      </Link>

      {/* Aquí podrías renderizar el submenú lateral si lo deseas */}
    </li>
  )
}

// ... existing code ...
export function RenderMenu({ normalizedItems, categoriesItems }: { normalizedItems: NavItemType[], categoriesItems: Category[] }) {
  const [isCategories, setIsCategories] = useState(false)

  return (
    <nav>
      <ul className="flex flex-row gap-2 items-center justify-center w-full  border-0 shadow-none py-0">
        {normalizedItems.map((item) => (
          <li key={item.id} className="relative group">
            {item.children && item.children.length > 0 ? (
              <>
                <span className="flex items-center gap-1 px-4 py-2 text-lg font-bold cursor-pointer">
                  {capitalize(item.title)}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </span>
                <div className="absolute left-0 px-3 top-full w-[250px] bg-white rounded-lg z-20 hidden group-hover:block py-5">
                  <ul className="py-0">
                    <h4 className="text-base font-light uppercase text-[var(--color-accent-dark)] px-4">Categories</h4>
                    {categoriesItems.map((category) => (
                      <ListItem key={category.id} title={capitalize(category.name)} href={`/categories/${category.slug}`} />
                    ))}
                  </ul>
                </div>
              </>
            ) : item.title == "categories" || item.title == "Categories" ? (
              (() => {
                if (!isCategories) setIsCategories(true);
                return (
                  <>
                    <span className="flex items-center gap-1 px-4 py-2 text-base font-bold uppercase tracking-wide text-slate-900  hover:underline hover:underline-offset-8 cursor-pointer">
                      {item.title.toUpperCase()}
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    </span>
                    <div className="absolute left-0 px-3 top-full w-[250px] bg-white rounded-lg z-20 hidden group-hover:block py-5">
                      <ul className="py-0">
                        <h4 className="text-base font-light uppercase text-[var(--color-accent-dark)] px-4">Categories</h4>
                        {categoriesItems.map((category) => (
                          <ListItem key={category.id} title={capitalize(category.name)} href={`/categories/${category.slug}`} />
                        ))}
                      </ul>
                    </div>
                  </>
                );
              })()
            ) : (
              <Link
                href={`${item.url}`}
                className="px-4 py-2 text-base font-bold tracking-wide text-white transition-colors duration-150 hover:bg-[var(--color-accent-dark)] rounded-lg"
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
        {
          !isCategories && (
            <li className="relative group">
              <span className="flex items-center gap-1 px-4 py-2 text-base font-bold tracking-wide text-white cursor-pointer duration-150 hover:bg-[var(--color-accent-dark)] rounded-lg">
                Categories
                <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </span>
              <div className="absolute left-0 px-3 top-full w-[250px] bg-white rounded-lg z-20 hidden group-hover:block py-5">
                <ul className="py-0">
                  <h4 className="text-sm font-light uppercase text-[var(--color-accent-dark)] px-4">Categories</h4>
                  {categoriesItems.map((category) => (
                    <ListItem
                      key={category.id}
                      title={capitalize(category.name)}
                      href={`${category.slug}`}
                      parentSlug={category.parent_slug!}
                    />
                  ))}
                </ul>
              </div>
            </li>
          )
        }
      </ul>
    </nav>
  )
}
// ... existing code ...