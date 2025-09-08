import { fetchCategories, fetchFooter, fetchMenu, fetchSiteSettings } from "@/api-fetcher/fetcher";
import { contextSiteSettings } from "@/app/context/getSiteSettings";
import { SiteSettings } from "@/types/types";
import Link from "next/link";
import { DefaultFooter } from "./default-footer";
import { debug, debugLog } from "@/config/debug-log";
import { type Footer as FooterType } from "@/types/footer";
import { MainFooterContent } from "./main-footer-content";
import { CopyrightBar } from "./copyright-bar";

const exampleFooter = {
  "status": "success",
  "message": "Loaded successfully",
  "data": {
    "columns": [
      {
        "id": 1,
        "project_id": 1,
        "title": "Navigation",
        "sort_order": 1,
        "status": "active",
        "created_at": "2024-01-15 10:00:00",
        "updated_at": "2024-01-15 10:00:00",
        "items": [
          {
            "id": 1,
            "column_id": 1,
            "title": "Home",
            "url": "/",
            "target": "_self",
            "sort_order": 1,
            "status": "active",
            "created_at": "2024-01-15 10:00:00",
            "updated_at": "2024-01-15 10:00:00"
          },
          {
            "id": 2,
            "column_id": 1,
            "title": "About Us",
            "url": "/about",
            "target": "_self",
            "sort_order": 2,
            "status": "active",
            "created_at": "2024-01-15 10:00:00",
            "updated_at": "2024-01-15 10:00:00"
          }
        ]
      },
      {
        "id": 2,
        "project_id": 1,
        "title": "Support",
        "sort_order": 2,
        "status": "active",
        "created_at": "2024-01-15 10:00:00",
        "updated_at": "2024-01-15 10:00:00",
        "items": [
          {
            "id": 3,
            "column_id": 2,
            "title": "Help Center",
            "url": "/help",
            "target": "_self",
            "sort_order": 1,
            "status": "active",
            "created_at": "2024-01-15 10:00:00",
            "updated_at": "2024-01-15 10:00:00"
          },
          {
            "id": 4,
            "column_id": 2,
            "title": "Contact",
            "url": "/contact",
            "target": "_blank",
            "sort_order": 2,
            "status": "active",
            "created_at": "2024-01-15 10:00:00",
            "updated_at": "2024-01-15 10:00:00"
          }
        ]
      }
    ],
    "legal_images": [
      {
        "id": 1,
        "project_id": 1,
        "image_url": "https://cdn.example.com/begambleaware.png",
        "link_url": "https://begambleaware.org",
        "alt_text": "BeGambleAware",
        "title": "Responsible Gaming",
        "sort_order": 1,
        "status": "active",
        "created_at": "2024-01-15 10:00:00",
        "updated_at": "2024-01-15 10:00:00"
      },
      {
        "id": 2,
        "project_id": 1,
        "image_url": "https://cdn.example.com/gambling-commission.png",
        "link_url": "https://gamblingcommission.gov.uk",
        "alt_text": "UK Gambling Commission",
        "title": "Licensed by UKGC",
        "sort_order": 2,
        "status": "active",
        "created_at": "2024-01-15 10:00:00",
        "updated_at": "2024-01-15 10:00:00"
      }
    ],
    "legal_links": [
      {
        "id": 1,
        "project_id": 1,
        "link_type": "privacy_policy",
        "title": "Privacy Policy",
        "url": "/privacy-policy",
        "target": "_self",
        "status": "active",
        "created_at": "2024-01-15 10:00:00",
        "updated_at": "2024-01-15 10:00:00"
      },
      {
        "id": 2,
        "project_id": 1,
        "link_type": "terms_of_service",
        "title": "Terms of Service",
        "url": "/terms-of-service",
        "target": "_self",
        "status": "active",
        "created_at": "2024-01-15 10:00:00",
        "updated_at": "2024-01-15 10:00:00"
      },
      {
        "id": 3,
        "project_id": 1,
        "link_type": "sitemap",
        "title": "Sitemap",
        "url": "/sitemap.xml",
        "target": "_self",
        "status": "active",
        "created_at": "2024-01-15 10:00:00",
        "updated_at": "2024-01-15 10:00:00"
      }
    ],
    "copyright": {
      "id": 1,
      "project_id": 1,
      "start_year": 2020,
      "end_year": 2024,
      "company_name": "Your Company Name",
      "copyright_text": "All rights reserved",
      "status": "active",
      "created_at": "2024-01-15 10:00:00",
      "updated_at": "2024-01-15 10:00:00"
    }
  },
  "response_time": 45
}

export function FooterLinkList({ title, links }: { title: string, links: { href: string, label: string }[] }) {
  // Si hay más de 5, dividir en columnas
  const maxPerCol = 6;
  const numCols = links.length > maxPerCol ? Math.ceil(links.length / maxPerCol) : 1;
  const columns = Array.from({ length: numCols }, (_, i) =>
    links.slice(i * maxPerCol, (i + 1) * maxPerCol)
  );
  return (
    <div>
      <h4 className=" text-slate-200 uppercase  tracking-wide mb-1">{title}</h4>
      <div className={`grid gap-x-6 ${numCols > 1 ? `grid-cols-${numCols}` : ''}`}>
        {columns.map((col, idx) => (
          <ul className="space-y-2" key={idx}>
            {col.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-300 hover:text-slate-100 transition-colors font-semibold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export async function FooterSocialIcons() {
  const settings = await contextSiteSettings()
  const socialLinks = settings.social_links

  const SOCIAL_LINKS = [
    {
      href: socialLinks.facebook,
      label: "Facebook",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
      )
    },
    {
      href: socialLinks.twitter,
      label: "Twitter",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
      )
    },
    {
      href: socialLinks.instagram,
      label: "Instagram",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M16.5 7.5v.01" /></svg>
      )
    },
    {
      href: socialLinks.youtube,
      label: "YouTube",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
      )
    },
  ]

  return (
    <div className="flex space-x-4 justify-start items-center">
      {SOCIAL_LINKS.map(social => (
        <a
          key={social.label}
          href={social.href}
          className="text-slate-400 hover:text-slate-100 transition-colors"
          aria-label={social.label}
        >
          {social.icon}
        </a>
      ))}
    </div>
  )
}
/*
function FooterNewsletter() {
  return (
    <div className="mt-6 flex flex-col">
      <p className="text-sm text-slate-100 mb-2">
        Suscríbete a nuestro boletín
      </p>
      <div className="flex">
        <input
          id="email"
          autoComplete="email"
          type="email"
          placeholder="tu@email.com"
          name="email"
          className="flex-1 py-2 text-sm border border-slate-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-accent)] cursor-pointer rounded-r-md focus:ring-offset-2 transition-colors">
          Suscribir
        </button>
      </div>
    </div>
  )
}
*/

export async function Footer() {

  let isFooter = false
  //exampleFooter.data;

  const [menuItems, categoriesItems, settings, footer] = await Promise.all([
    fetchMenu(),
    fetchCategories(),
    fetchSiteSettings(),
    fetchFooter()
  ]);

  // Check if footer data is empty
  if (footer !== undefined &&
    footer.columns.length === 0 &&
    footer.legal_images.length === 0 &&
    footer.legal_links.length === 0 &&
    footer.copyright === null) {
    isFooter = false;
  } else isFooter = true;

  debugLog(debug.apiFooter, `[+] Footer data: ` + JSON.stringify(footer, null, 2))

  if (isFooter == false || footer === undefined) {
    return (
      <DefaultFooter
        settings={settings}
        menuItems={menuItems}
        categoriesItems={categoriesItems}
      />
    )
  }


  else return (
    <footer className="w-full bg-[var(--color-primary-dark)]">
      <MainFooterContent footer={footer} settings={settings} />
      <CopyrightBar footer={footer} settings={settings} />
    </footer>
  );
}
