import { Category, NavItemType, SiteSettings } from "@/types/types";
import { FooterLinkList, FooterSocialIcons } from "./footer";
import { Link } from "../../optionals/link";

const SUPPORT_LINKS = [
    { href: "/privacy", label: "Privacidad" },
    { href: "/terms", label: "Términos" },
    { href: "/cookies", label: "Cookies" },
    { href: "/help", label: "Ayuda" },
];

const LEGAL_LINKS = [
    { href: "/privacy", label: "Política de Privacidad" },
    { href: "/terms", label: "Términos de Uso" },
    { href: "/sitemap", label: "Mapa del Sitio" },
];

const RESPONSIBLE_GAMING_LINKS = [
    { href: "/iconos-footer/auto-prohibicion.png", label: "Juego Responsable" },
    { href: "/iconos-footer/juego-seguro.png", label: "Juego Responsable" },
    { href: "/iconos-footer/jugar-bien.png", label: "Juego Responsable" },
    { href: "/iconos-footer/logo.png", label: "Juego Responsable" },
    { href: "/iconos-footer/mayor-edad.png", label: "Juego Responsable" },
];

export function DefaultFooter({
    settings,
    menuItems,
    categoriesItems
}: {
    settings: SiteSettings;
    menuItems: NavItemType[];
    categoriesItems: Category[];
}) {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="w-full bg-[var(--color-primary-dark)]">
            {/* Main Footer Content */}
            <div className="py-10 w-[90vw] lg:w-[60vw] mx-auto flex flex-wrap  lg:flex-row gap-5 justify-between">

                {/* Brand Section */}
                <div className="flex flex-col">
                    {settings.site_logo && (
                        <img
                            src={settings.site_logo}
                            alt={settings.site_title}
                            className="h-8 w-auto"
                        />
                    )}
                    <h4 className="text-xl font-bold text-white">
                        {settings.site_title}
                    </h4>

                    <p className="text-sm text-slate-300 leading-relaxed">
                        {settings.site_description}
                    </p>

                    <FooterSocialIcons />


                </div>

                {/* Navigation Links dinámicos */}

                <FooterLinkList
                    title="Navegación"
                    links={menuItems.filter(item => item.status === 'active').map(item => ({
                        href: item.url,
                        label: item.title
                    }))}
                />


                {/* Categorías dinámicas 
        <FooterLinkList
          title="Categorías"
          links={categoriesItems.map(cat => ({
            href: `/categories/${cat.slug}`,
            label: cat.name
          }))}
        />
*/}

                {/* Legal & Support */}
                <div className="flex flex-col">
                    <FooterLinkList title="Soporte" links={SUPPORT_LINKS} />
                </div>

                <div className="">
                    <h4 className="text-slate-200 uppercase ">Juego Responsable</h4>
                    <div className="space-x-4 flex flex-wrap flex-row pt-4">
                        {RESPONSIBLE_GAMING_LINKS.map(link => (
                            <img
                                key={link.href}
                                src={link.href}
                                alt={link.label}
                                className="w-fit h-8"
                            />
                        ))}
                    </div>
                </div>


            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-300 flex flex-col items-center justify-center  gap-4 py-3 text-slate-300 hover:text-slate-100 font-light">
                <span className=" text-sm  ">
                    © {currentYear} {settings.site_title}. Todos los derechos
                    reservados.
                </span>
                <div className="flex justify-center flex-wrap">
                    {LEGAL_LINKS.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-light transition-colors px-4 py-1 "
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}