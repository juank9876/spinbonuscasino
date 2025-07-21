'use client'

import { navPosition } from '@/config/options'
import { capitalize } from '@/utils/capitalize'
import { Category, NavItemType } from '@/types/types';
import { ChevronRight, ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Link } from '@/components/juankui/optionals/link';
import { ReactNode } from 'react';
import { useState } from 'react';

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
      className={hasSubcategories ? 'relative' : ''}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={parentSlug ? `${parentSlug}${href}` : '/categories/' + href}
        className={`flex items-center px-4 py-3 text-md text-black hover:bg-[var(--color-secondary-light)] rounded-lg font-semibold transition-colors duration-150 ${isChild ? 'pl-8 text-sm' : ''}`}
      >
        {title}
        {hasSubcategories && (
          <ChevronUp className={`text-black ml-2 h-4 w-4 transition-transform duration-200 ${open ? 'rotate-90' : ''}`} />
        )}
      </Link>
      {/* Renderizar subcategorías si existen */}
      {hasSubcategories && (
        <ul className={`absolute right-full top-0 mt-0 ml-0 w-[220px] bg-white rounded-lg shadow-lg z-30 ${open ? 'block' : 'hidden'}`}>
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
export function RenderMenu({ normalizedItems, categoriesItems }: { normalizedItems: NavItemType[], categoriesItems: Category[] }) {

  return (
    <nav>
      <ul className="flex flex-row gap-2 items-center justify-center w-full  border-0 shadow-none py-0">
        {normalizedItems.map((item) => (
          <li key={item.id} className="relative group/menu">
            {item.children && item.children.length > 0 ? (
              <>
                <span className="flex text-base hover:bg-[var(--color-accent-dark)] items-center gap-1 px-4 py-2 cursor-pointer font-bold tracking-wide text-white transition-colors duration-150 rounded-lg">
                  {capitalize(item.title)}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover/menu:rotate-180" />
                </span>
                <div className="absolute left-0 top-full w-[250px] bg-white rounded-lg z-20 hidden group-hover/menu:block py-5">
                  <ul className="py-0">
                    <h4 className="text-base font-light uppercase text-[var(--color-accent-dark)] px-4">Categories</h4>
                    {item.children.map((category) => (
                      <ListItem
                        key={category.id}
                        title={capitalize(category.title)}
                        href={category.url}
                        childCategories={category.children}
                        parentSlug={'/categories'} />
                    ))}
                  </ul>
                </div>
              </>
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
      </ul>
    </nav>
  )
}// ... existing code ...
