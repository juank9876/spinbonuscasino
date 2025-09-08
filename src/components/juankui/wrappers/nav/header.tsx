//import menu from '@/lib/menu.json'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { fetchAllSlugs, fetchCategories, fetchMenu } from '@/api-fetcher/fetcher'
import { normalizeUrl } from '@/lib/utils'
import { contextSiteSettings } from '@/app/context/getSiteSettings'
import { Logo } from './logo'
import { RenderMenu } from './render-menu'
import { NavMobile } from './nav-mobile'


export async function Header() {
  const rawNavItems = await fetchMenu()
  const navItems = rawNavItems.filter(item => item.status === 'active')
  const sortedItems = navItems.sort((a, b) => Number(a.sort_order) - Number(b.sort_order))
  const allSlugs = await fetchAllSlugs("category")

  const normalizedItems = sortedItems.map(item => ({
    ...item,
    url: normalizeUrl(item.url)
  }))

  const categoriesItems = await fetchCategories()
  const settings = await contextSiteSettings()

  const navProps = { categoriesItems, settings, normalizedItems }
  return (
    <>
      <header className="sticky top-0 z-50 flex w-full flex-row items-center justify-center bg-[var(--color-primary-dark)] px-5 py-3">
        <div className="w-custom mx-auto flex h-full flex-row items-center justify-between">
          <Logo
            {...settings}
          />

          <div className='hidden lg:flex'>
            <RenderMenu
              normalizedItems={normalizedItems}
              allSlugs={allSlugs}
            />
          </div>
        </div>

        {/* VERSION MOVIL */}
        <NavMobile {...navProps} />
      </header>
    </>
  )
}
