import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from 'lucide-react'
import { Fragment } from 'react'
import { capitalize } from '@/utils/capitalize'
import { Link } from "@/components/juankui/optionals/link";
import { Category, NavItemType, SiteSettings } from "@/types/types";

interface NavProps {
    settings: SiteSettings
    normalizedItems: NavItemType[]
    categoriesItems: Category[]
}

export function NavMobile(navProps: NavProps) {
    const { settings, normalizedItems, categoriesItems } = navProps
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                    <MenuIcon className="size-7 text-[var(--color-accent-light)]" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-auto py-5 pl-2">
                <SheetTitle>{settings.site_title}</SheetTitle>
                <div className="border bg-[var(--color-accent)]" />

                <div className="grid gap-6 px-5">
                    {normalizedItems.map((item, index) => (
                        <Fragment key={index}>
                            {item.title == "categories" || item.title == "Categories" ? (
                                <>
                                    <Link
                                        href={item.url}
                                        className="mb-0 pb-0 text-sm font-bold"
                                    >
                                        {item.title}
                                    </Link >

                                    <ul className="space-y-3">
                                        {categoriesItems.map((category) => (
                                            <li key={category.id}>
                                                <a key={category.id} title={capitalize(category.name)} href={`/categories/${category.slug}`}>
                                                    • {category.description}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={item.url}
                                        className="text-sm font-bold"
                                    >
                                        {item.title}
                                    </Link >

                                    {
                                        item.children?.map((child, index) => (
                                            <div key={index} className="flex flex-col space-y-2">
                                                <Link href={child.url}>
                                                    • {child.title}
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </>
                            )}
                        </Fragment>
                    ))}
                    <div className='flex flex-col space-y-3'>
                        <Link
                            href={'/categories'}
                            className="text-sm font-bold"
                        >
                            Categories
                        </Link>
                        <ul className="space-y-3">
                            {categoriesItems.map((category) => {
                                const url = category.parent_slug != null ? `/categories/${category.parent_slug}/${category.slug}` : `/categories/${category.slug}`
                                return (
                                    <li key={category.id}>
                                        <a key={category.id} title={capitalize(category.name)} href={url}>
                                            • {category.name}
                                        </a>
                                    </li>
                                )
                            })}

                        </ul>
                    </div>
                </div>
            </SheetContent>

        </Sheet>
    );
};
