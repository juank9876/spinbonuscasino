import { debug, debugLog } from "@/config/debug-log";
import { Author, Category, NavItemType, Page, PermalinkData, Post, PostResponse, SiteSettings } from "@/types/types";

type MethodType =
  "category-posts" | "articles" | "article" | "pages" | "page" | "category" | "categories" | "menu" | "site-settings" | "authors" |
  "author" | "permalink" | "all-slugs" | "slug-to-id" | "homepage" | "tags";

interface FetcherParams {
  method: MethodType;
  id?: string
  type?: string
  slug?: string
  category_id?: string
}

export interface ResponseInterface<T = unknown> {
  status: string
  message: string
  data: T // Puedes ajustar el tipo según lo que esperes
}

export async function fetcher<T>({ method, id, type, slug, category_id }: FetcherParams): Promise<T> {
  const baseUrl = `https://intercms.dev/api/v2/data.php`
  const url = baseUrl +
    `?method=${method}` +
    `&api_key=${process.env.API_KEY}` +
    `&project_id=${process.env.PROJECT_ID}` +
    (id ? `&id=${id}` : ``) +
    (type ? `&type=${type}` : ``) +
    (slug ? `&slug=${slug}` : ``) +
    (category_id ? `&category_id=${category_id}` : ``)

  debugLog(debug.fetcher, `[+] fetcher url: ` + method.toUpperCase() + " " + url)

  try {
    const res = await fetch(url, {
      next: { revalidate: 3 },
      //cache: 'no-store'
    })
    const data: ResponseInterface<T> = await res.json();

    if (data.status === "success") {
      return data.data
    }

  } catch (error) {
    console.error(url, method)
    console.error("Error fetching data:", error);
    return undefined as T;
  }

  return undefined as T; // Retorna undefined si hay un error
}

export async function fetchPages() {
  return fetcher<Page[]>({ method: "pages" });
}
export async function fetchPageById(id: string): Promise<Page> {
  return fetcher<Page>({ method: "page", id });
}
export async function fetchArticles() {
  return fetcher<Post[]>({ method: "articles" });
}
export async function fetchArticleById(id: string) {
  return fetcher<PostResponse>({ method: "article", id });
}
export async function fetchCategories() {
  return fetcher<Category[]>({ method: "categories" });
}
export async function fetchCategoryById(id: string): Promise<Category> {
  return fetcher<Category>({ method: "category", id });
}
export async function fetchMenu(): Promise<NavItemType[]> {
  return fetcher<NavItemType[]>({ method: "menu" });
}
export async function fetchSiteSettings() {
  return fetcher<SiteSettings>({ method: "site-settings" });
}
export async function fetchAuthors() {
  return fetcher<Author[]>({ method: "authors" });
}

export async function fetchAuthorById(id: string): Promise<Author> {
  return fetcher<Author>({ method: "author", id });
}

type PermalinkType = "category" | "post"
export async function fetchPermalink(id: string, type: PermalinkType): Promise<PermalinkData> {
  return fetcher<PermalinkData>({ method: "permalink", id, type });
}

interface CategoryPosts {
  category: Category
  posts: Post[]
}
export async function fetchCategoryPosts(id: string): Promise<CategoryPosts> {
  return fetcher<CategoryPosts>({ method: "category-posts", category_id: id });
}

interface Slug {
  slug: {
    id: string,
    title: string,
    type: string
  }
}
export async function fetchAllSlugs(type: "page" | "post" | "category"): Promise<Slug[]> {
  const slugs = await fetcher<Slug[]>({ method: "all-slugs", type });
  debugLog(debug.fetchAllSlugs, "fetchAllSlugs", slugs)
  return slugs
}

interface SlugToId {
  id: string,
  title: string,
  type: string
  slug: string
}
export async function fetchSlugToId(slug: string, type: "page" | "post" | "category"): Promise<string | null> {
  const slugRes = await fetcher<SlugToId>({ method: "slug-to-id", slug, type });
  if (!slugRes) {
    return null
  }
  debugLog(debug.fetchSlugToId, "fetchSlugToId", slugRes)

  return slugRes.id
}

export async function fetchHomePage() {
  return fetcher<Page>({ method: "homepage" });
}

export interface Tag {
  id: string
  project_id: string
  name: string
  slug: string
  description: string
  meta_title: string | undefined
  meta_description: string | undefined
  schema_data: unknown | undefined
  created_at: string
  updated_at: string
  post_count: string
}
export async function fetchTags() {
  return fetcher<Tag[]>({ method: "tags" });
}
