import { Footer } from "@/types/footer";
import { FooterLinkList, FooterSocialIcons } from "./footer";
import { SiteSettings } from "@/types/types";

export function MainFooterContent({ footer, settings }: { footer: Footer; settings: SiteSettings }) {
    return (
        <div className="py-10 w-[90vw] lg:w-[60vw] mx-auto flex flex-wrap lg:flex-row gap-5 justify-between">
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

            {/* Dynamic Footer Columns from API */}
            {footer.columns.map((column) => (
                <FooterLinkList
                    key={column.id}
                    title={column.title}
                    links={column.items.map(item => ({
                        href: item.url,
                        label: item.title
                    }))}
                />
            ))}

            {/* Legal Images Section */}
            <div className="space-x-4 flex flex-wrap flex-row pt-4">
                {footer.legal_images.map(image => (
                    <a
                        key={image.id}
                        href={image.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={image.image_url}
                            alt={image.alt_text}
                            title={image.title}
                            className="w-fit h-8"
                        />
                    </a>
                ))}
            </div>
        </div>
    );
};
