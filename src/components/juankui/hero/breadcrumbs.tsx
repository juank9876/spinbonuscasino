'use client'

import {
  Breadcrumb,
  //BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Breadcrumb as BreadcrumbType } from "@/types/types"
import { Fragment, useMemo } from "react";
import { Link } from "../optionals/link";

type BreadcrumbsProps = {
  breadcrumbs: BreadcrumbType[];
  className?: string
};

export function Breadcrumbs({ breadcrumbs, className }: BreadcrumbsProps) {

  const { nonCurrentBreadcrumbs, currentBreadcrumb } = useMemo(() => {
    // 1. Normaliza el array: solo el último es "current"
    const normalized = breadcrumbs.map((b, i) => ({
      ...b,
      current: i === breadcrumbs.length - 1,
    }))


    // 2. Inserta "Categories" si el último breadcrumb es de tipo "category"
    const enhanced = [...normalized];
    const last = enhanced.at(-1);

    if (last?.type === "category" || last?.type === "post") {
      enhanced.splice(1, 0, {
        title: "Categories",
        url: "/categories",
        type: "system",
        current: false,
      });
    }

    if (last?.type === "post") {
      const categoryBreadcrumb = enhanced[enhanced.length - 2];

      if (categoryBreadcrumb) {
        const rawUrl = categoryBreadcrumb.url.replace(/^\/+/, ""); // quitar /

        const cleanUrl = rawUrl.startsWith("categories/")
          ? rawUrl
          : `categories/${rawUrl}`;

        enhanced[enhanced.length - 2] = {
          ...categoryBreadcrumb,
          url: `/${cleanUrl}`, // asegurar slash inicial
        };

      }
    }

    // 3. Separar current vs. no current
    const currentBreadcrumb = enhanced.find((b) => b.current);
    const nonCurrentBreadcrumbs = enhanced.filter((b) => !b.current);

    return { nonCurrentBreadcrumbs, currentBreadcrumb };
  }, [breadcrumbs]);

  return (
    <Breadcrumb className={`${className}`}>
      <BreadcrumbList>

        {nonCurrentBreadcrumbs.map((bread) => (

          <Fragment key={bread.url}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={bread.url}>{bread.title}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>

        ))}

        {currentBreadcrumb && (
          <BreadcrumbItem>
            <BreadcrumbPage>{currentBreadcrumb.title}</BreadcrumbPage>
          </BreadcrumbItem>
        )}

      </BreadcrumbList>
    </Breadcrumb>
  )
}
