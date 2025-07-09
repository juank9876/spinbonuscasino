'use client'

import { navPosition } from '@/config/options'
//import menu from '@/lib/menu.json'
import { capitalize } from '@/utils/capitalize'
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { Link } from '../optionals/link';
import { Fragment, useState } from 'react';
import { Category, NavItemType } from '@/types/types';
import { ArrowRight } from 'lucide-react';

type ListItemProps = {
  title: string;
  href: string;
  children?: React.ReactNode;
  className?: string
  isChild?: boolean
}

function ListItem({ title, href, children, className, isChild = false }: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={href} className="group/modal block space-y-1 rounded-md border p-3 leading-none no-underline outline-none transition-colors hover:border-[var(--color-accent)] hover:text-white">
          <p className="text-lg font-medium leading-none transition-none group-hover/modal:text-white">{isChild && (<ArrowRight className='inline mr-2' />)}{title}</p>
          {children && (
            <p className={`${className} line-clamp-2 text-sm leading-snug transition-none group-hover/modal:text-white`}>
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export function RenderMenu({ normalizedItems, categoriesItems }: { normalizedItems: NavItemType[], categoriesItems: Category[] }) {
  const [isCategories, setIsCategories] = useState(false)

  return (
    <>
      <NavigationMenuList className={`${navPosition} py-3`}>
        {normalizedItems.map((item) => (
          <NavigationMenuItem key={item.id}>
            {item.children && item.children.length > 0 ? (

              // LINK CON CHILDREN
              <>
                <NavigationMenuTrigger>{capitalize(item.title)}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {item.children.map((child) => (
                      <ListItem key={child.id} title={capitalize(child.title)} href={`/${child.url}`}>
                        {child.url}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>

              // CATEGORIES
            ) : item.title == "categories" || item.title == "Categories" ? (

              (() => {
                if (!isCategories) setIsCategories(true); // Actualiza el estado si aún no estaba en true
                return (
                  <>
                    <NavigationMenuTrigger>{item.title.toUpperCase()}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-1 p-1 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                        {categoriesItems.map((category) => (
                          <ListItem key={category.id} title={capitalize(category.name)} href={`/categories/${category.slug}`}>
                            {category.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                );
              })()

              // LINK NORMAL
            ) : (
              <NavigationMenuLink asChild>
                <Link href={`${item.url}`} className="px-4 py-2 text-xl font-medium transition-colors">
                  {(item.title).toUpperCase()}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
        {
          !isCategories && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>CATEGORIES</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-1 p-1 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                  {categoriesItems.map((category) => (
                    <Fragment key={category.id}>
                      {
                        category.child_categories_count === 0 && category.parent_id == null && (
                          <ListItem title={capitalize(category.name)} href={`/categories/${category.slug}`}>
                            {category.description}
                          </ListItem>
                        )
                      }
                      {
                        category.parent_id != null && (
                          <Fragment key={category.id}>
                            <ListItem title={capitalize(category.parent_name!)} href={`/categories/${category.parent_slug}`}>

                            </ListItem>
                            <ListItem isChild title={capitalize(category.name!)} href={`/categories/${category.parent_slug}/${category.slug}`}>
                              {category.description}
                            </ListItem>
                          </Fragment>
                        )
                      }
                    </Fragment>
                  ))}

                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        }

      </NavigationMenuList>
    </>
  )
}