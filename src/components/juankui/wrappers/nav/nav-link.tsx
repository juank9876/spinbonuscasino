import { ReactNode, useEffect, useState } from 'react';
import { Link } from '../../optionals/link';

type NavLinkProps = {
    href: string;
    children: ReactNode;
    className?: string;
};

export function NavLink({ href, children, className }: NavLinkProps) {
    const [baseUrl, setBaseUrl] = useState<string | null>(null);

    // Solo se ejecuta en cliente después del primer render
    useEffect(() => {
        setBaseUrl(window.location.origin);
    }, []);

    if (!baseUrl) {
        // Mientras no tenemos baseUrl, renderiza un Link simple (o un fallback)
        return (
            <Link className={className} href={href}>
                {children}
            </Link>
        );
    }

    let parsedHref: string | URL = href;

    if (href.startsWith('/https://') || href.startsWith('/http://')) {
        parsedHref = new URL(href.slice(1));
        const baseParsedUrl = new URL(baseUrl);

        const isLocalDomain = parsedHref.origin === baseParsedUrl.origin;
        const isExternalDomain =
            !isLocalDomain &&
            (baseParsedUrl.origin?.startsWith('http://') || baseParsedUrl.origin?.startsWith('https://'));

        if (isExternalDomain) {
            console.log('External link detected:', parsedHref.toString());
            return (
                <a className={className} href={parsedHref.toString()} target="_blank" rel="noopener noreferrer">
                    {children}
                </a>
            );
        } else if (isLocalDomain) {
            console.log('Internal link detected:', parsedHref.pathname.toString());
            return (
                <Link className={className} href={parsedHref.pathname}>
                    {children}
                </Link>
            );
        }
    }

    else {
        console.log('Normal link detected:', href);
        return (
            <Link className={className} href={href}>
                {children}
            </Link>

        )
    };
}