import { Footer } from "@/types/footer";
import { Link } from "../../optionals/link";
import { SiteSettings } from "@/types/types";

export function CopyrightBar({ footer, settings }: { footer: Footer | undefined; settings: SiteSettings }) {
    const currentYear = new Date().getFullYear();
    return (
        <div className="border-t border-slate-300 flex flex-col items-center justify-center gap-4 py-3 text-slate-300 hover:text-slate-100 font-light">
            <span className="text-sm">
                © {footer?.copyright?.start_year || currentYear}-{footer?.copyright?.end_year || currentYear} {footer?.copyright?.company_name || settings.site_title}
                {footer?.copyright?.copyright_text ? `. ${footer.copyright.copyright_text}` : '. All rights reserved'}
            </span>
            <div className="flex justify-center flex-wrap">
                {footer?.legal_links?.map(link => (
                    <Link
                        key={link.id}
                        href={link.url}
                        target={link.target}
                        className="text-sm font-light transition-colors px-4 py-1"
                    >
                        {link.title}
                    </Link>
                ))}
            </div>
        </div>
    );
};
