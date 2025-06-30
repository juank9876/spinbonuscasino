import { SiteSettings } from "@/types/types";

export function Footer ({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="flex w-full flex-col items-center justify-center bg-gradient-to-b from-[var(--color-primary-dark)] to-[var(--color-primary-dark)] px-5 py-10">
      <div className="grid w-full grid-cols-1 gap-x-10 space-y-5 rounded-lg border-2 p-5 transition duration-300 hover:shadow-lg lg:w-[60vw] lg:grid-cols-3 lg:space-y-0">
        <div className="space-y-3">
          <h4>{settings.site_title}</h4>
          <p>{settings.site_description}</p>
        </div>

        <div className="space-y-3">
        </div>

        <div className="space-y-3">
          <h4>{settings.social_links.length !== 0 ? "Social Links" : ""}</h4>
          <p>
            {
              /*settings.social_links.map((social, idx) => {
                return (
                  <p key={idx}>{social}</p>
                )
              })*/
            }
          </p>
        </div>
      </div>

    </footer>
  )
}