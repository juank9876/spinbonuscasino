'use client'
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, MenuIcon } from 'lucide-react'
import { Fragment } from 'react'
import { capitalize } from '@/utils/capitalize'
import { Link } from "@/components/juankui/optionals/link";
import { Category, NavItemType, SiteSettings } from "@/types/types";
import { cn } from "@/lib/utils";

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
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden hover:bg-[var(--color-accent)]/10 transition-colors"
                >
                    <MenuIcon className="size-7 text-[var(--color-burger-menu-bg)]" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side="left"
                className="w-[300px] sm:w-[380px] overflow-y-auto border-r border-[var(--color-accent)]/20 bg-[var(--color-burger-menu-bg)] p-0"
            >
                <SheetHeader className="p-6 border-b border-[var(--color-accent)]/10">
                    <SheetTitle className="text-xl font-bold text-[var(--color-primary)]">
                        {settings.site_title}
                    </SheetTitle>
                </SheetHeader>

                <nav className="px-2">
                    {/* Main Navigation */}
                    <div className=" px-3">
                        {normalizedItems.map((item, index) => (
                            <Fragment key={index}>
                                <Link
                                    href={item.url}
                                    className={cn(
                                        "flex items-center justify-between w-full p-3 rounded-lg",
                                        "text-sm font-medium transition-colors",
                                        "hover:bg-[var(--color-accent)]/10 text-[var(--color-burger-menu-font)]",
                                        item.title.toLowerCase() === "categories"
                                    )}
                                >
                                    {item.title}
                                    {item.children && item.children?.length > 0 && (
                                        <ChevronRight className="size-4 text-muted-foreground" />
                                    )}
                                </Link>

                                {item.children && item.children?.length > 0 && (
                                    <div className="ml-4 pl-4 border-l border-[var(--color-accent)]/10">
                                        {item.children.map((child, idx) => (
                                            <Link
                                                key={idx}
                                                href={child.url}
                                                className="flex items-center p-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {child.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </Fragment>
                        ))}
                    </div>

                    {/* Categories Section */}
                    <div className="mt-2 pb-6 px-3">
                        <h3 className="py-3 px-4 text-sm font-medium text-[var(--color-accent)]">
                            Browse Categories
                        </h3>
                        <div className="space-y-1">
                            {categoriesItems.map((category) => {
                                const url = category.parent_slug
                                    ? `/categories/${category.parent_slug}/${category.slug}`
                                    : `/categories/${category.slug}`
                                return (
                                    <Link
                                        key={category.id}
                                        href={url}
                                        className={cn(
                                            "flex items-center justify-between w-full p-3 rounded-lg",
                                            "text-sm transition-colors",
                                            "hover:bg-[var(--color-accent)]/10  text-[var(--color-burger-menu-font)]",
                                            !category.parent_slug && "font-medium"
                                        )}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="text-[var(--color-accent)]/60">•</span>
                                            {capitalize(category.name)}
                                        </span>
                                        <span className="text-xs text-[var(--color-burger-menu-font)]">
                                            {category.post_count}
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    );
};
