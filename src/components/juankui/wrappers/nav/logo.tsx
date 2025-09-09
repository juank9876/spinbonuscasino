import { SiteSettings } from "@/types/types";
import Image from "next/image";
import { Link } from "@/components/juankui/optionals/link";
import { cn } from "@/lib/utils";

interface LogoProps extends Pick<SiteSettings, 'site_title' | 'site_logo'> {
  className?: string;
}

export function Logo({ site_title, site_logo, className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center justify-center",
        "relative shrink-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
        "rounded-lg",
        className
      )}
    >
      <Image
        alt={site_title || "Site logo"}
        src={site_logo || "/logo-1.png"}
        width={180}
        height={60}
        className={cn(
          "h-auto w-auto object-contain",
          "min-h-[40px] max-h-[50px]",
          "md:min-h-[45px] md:max-h-[60px]",
          "lg:min-h-[50px] lg:max-h-[65px]",
          "dark:brightness-110"
        )}
        priority
        quality={100}
      />
      <span className="sr-only">{site_title}</span>
    </Link>
  );
}