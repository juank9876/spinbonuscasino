//import menu from '@/lib/menu.json'

import { Logo } from './logo'
import { RenderMenu } from './render-menu'
import { NavMobile } from './nav-mobile'
import { ClientHeaderWrapper } from './client-header-wrapper'
import { Category, NavItemType, SiteSettings, Slug } from '@/types/types'


export interface HeaderData {
  normalizedItems: NavItemType[];
  allSlugs: Slug[];
  categoriesItems: Category[];
  settings: SiteSettings;
}


export async function Header({ normalizedItems, allSlugs, categoriesItems, settings }: HeaderData) {
  const navProps = { categoriesItems, settings, normalizedItems };

  return (
    <ClientHeaderWrapper>
      <div className="w-custom mx-auto flex h-full flex-row items-center justify-between">
        <Logo {...settings} />

        <div className="hidden lg:flex">
          <RenderMenu normalizedItems={normalizedItems} allSlugs={allSlugs} />
        </div>

        {/* VERSION MOVIL */}
        <NavMobile {...navProps} />
      </div>
    </ClientHeaderWrapper>
  );
}