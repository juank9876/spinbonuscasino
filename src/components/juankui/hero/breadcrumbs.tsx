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

    // 3. Construir URLs acumuladas correctamente (solo sumar el último segmento de cada url)
    let accumulated = "";
    const breadcrumbsWithFullUrl = enhanced.map((b, i) => {
      if (i === 0) {
        accumulated = "/";
        return { ...b, fullUrl: accumulated };
      }
      if (i === 1) {
        // El segundo breadcrumb suele ser '/categories' o similar
        accumulated = b.url.startsWith("/") ? b.url : `/${b.url}`;
        return { ...b, fullUrl: accumulated };
      }
      // Para los siguientes, sumar solo el último segmento
      const cleanSlug = b.url.replace(/^\/+|\/+$/g, "");
      const lastSegment = cleanSlug.split("/").pop();
      if (lastSegment && lastSegment.length > 0) {
        accumulated = `${accumulated}/${lastSegment}`;
      }
      return { ...b, fullUrl: accumulated };
    });

    // 4. Separar current vs. no current
    const currentBreadcrumb = breadcrumbsWithFullUrl.find((b) => b.current);
    const nonCurrentBreadcrumbs = breadcrumbsWithFullUrl.filter((b) => !b.current);

    return { nonCurrentBreadcrumbs, currentBreadcrumb };
  }, [breadcrumbs]);

  // console.log(nonCurrentBreadcrumbs)
  return (
    <Breadcrumb className={`${className}`}>
      <BreadcrumbList>

        {nonCurrentBreadcrumbs.map((bread) => (

          <Fragment key={bread.fullUrl}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link className="text-slate-300" href={bread.fullUrl}>{bread.title}</Link>
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

