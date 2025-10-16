import { debug, debugLog } from "@/config/debug-log";
import { ContentType } from "@/lib/fetch-data/getPageOrPostData";
import { Footer } from "@/types/footer";
import { AgeVerification, Author, Category, NavItemType, Page, PermalinkData, Post, PostResponse, SiteSettings, Tag } from "@/types/types";

export type MethodType =
  "category-posts" | "articles" | "article" | "pages" | "page" | "category" | "categories" | "menu" | "site-settings" | "authors" |
  "author" | "permalink" | "all-slugs" | "slug-to-id" | "homepage" | "tags" | "footer" | "cookies" | "age-verification" | "check-redirect" | "robots" | "sitemap" |
  "custom-scripts" | "tag"

export const methods: MethodType[] = [
  "category-posts",
  "articles",
  "article",
  "pages",
  "page",
  "category",
  "categories",
  "menu",
  "site-settings",
  "authors",
  "author",
  "permalink",
  "all-slugs",
  "slug-to-id",
  "homepage",
  "tags",
  "footer",
  "cookies",
  "age-verification",
  "check-redirect",
  "robots",
  "sitemap",
  "custom-scripts",
  "tag"
]

interface FetcherParams {
  method: MethodType;
  id?: string
  type?: string
  slug?: string
  category_id?: string
  path?: string
  pagination?: number
  per_page?: number
  with_meta?: boolean
  tag_id?: string
  author_id?: string
  silent?: boolean
}

export interface ResponseInterface<T = unknown> {
  status: string
  message: string
  data: T // Puedes ajustar el tipo según lo que esperesa
  meta: MetaArticle;
}

export interface MetaArticle {
  total: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
  next_page: number;
  prev_page: number;
}
export type PaginatedResponse<T> = {
  data: T;
  meta: MetaArticle;
};

// Sobrecargas
export async function fetcher<T>(params: FetcherParams & { with_meta: true }): Promise<PaginatedResponse<T>>;
export async function fetcher<T>(params: FetcherParams & { with_meta?: false }): Promise<T>;

export async function fetcher<T>(params: FetcherParams): Promise<T | PaginatedResponse<T> | null> {
  const { method, id, type, slug, category_id, path, pagination, per_page, with_meta, tag_id, author_id, silent = false } = params
  const baseUrl = `https://intercms.dev/api/v2/data.php`

  const url = baseUrl +
    `?method=${method}` +
    `&api_key=${process.env.API_KEY}` +
    `&project_id=${process.env.PROJECT_ID}` +
    (id ? `&id=${id}` : ``) +
    (type ? `&type=${type}` : ``) +
    (slug ? `&slug=${slug}` : ``) +
    (category_id ? `&category_id=${category_id}` : ``) +
    (path ? `&path=${path}` : ``) +
    (pagination ? `&page=${pagination}` : ``) +
    (per_page ? `&per_page=${per_page}` : ``) +
    (tag_id ? `&tag_id=${tag_id}` : ``) +
    (author_id ? `&author_id=${author_id}` : ``)

  debugLog(debug.fetcher, `[+] fetcher url: ` + method.toUpperCase() + " " + url)
  { method === "articles" && console.log("fetchArticles", url) }
  try {
    const res = await fetch(url, {
      next: { revalidate: 0 },

    })
    const data: ResponseInterface<T> = await res.json();

    if (data.status === "success") {
      if (with_meta && data.meta) {
        return {
          data: data.data,
          meta: data.meta
        } as PaginatedResponse<T>;
      }
      return data.data as T;
    } else if (data.status === "error") {
      if (!silent) {
        console.error("Resource not found:", method, url, data.message);
      }
      return null
    }

  } catch (error) {
    console.error(url, method)
    console.error("Api not working:", error);
    throw error;
  }
  return null // Retorna undefined si hay un error
}

export async function fetchPages() {
  return fetcher<Page[]>({ method: "pages" });
}
export async function fetchPageById(id: string): Promise<Page> {
  return fetcher<Page>({ method: "page", id });
}
// Helper functions con tipado correcto para POSTS
export async function fetchArticles(params: { pagination?: number; per_page?: number; with_meta: true; category_id?: string; tag_id?: string; author_id?: string }): Promise<PaginatedResponse<Post[]>>;
export async function fetchArticles(params: { pagination?: number; per_page?: number; with_meta?: false; category_id?: string; tag_id?: string; author_id?: string }): Promise<Post[]>;
export async function fetchArticles({ pagination, per_page, with_meta, category_id, tag_id, author_id }: { pagination?: number, per_page?: number, with_meta?: boolean, category_id?: string, tag_id?: string, author_id?: string }): Promise<Post[] | PaginatedResponse<Post[]>> {
  if (with_meta) {
    return fetcher<Post[]>({ method: "articles", pagination, per_page, with_meta: true, category_id, tag_id, author_id });
  }
  return fetcher<Post[]>({ method: "articles", pagination, per_page, category_id, tag_id });
}

export async function fetchArticlesByAuthorId(author_id: string) {
  return fetcher<Post[]>({ method: "articles", author_id, per_page: 5 });
}
export async function fetchArticlesByCategoryId(category_id: string) {
  return fetcher<Post[]>({ method: "articles", category_id, per_page: 5 });
}
export async function fetchArticlesByTagId(tag_id: string) {
  return fetcher<Post[]>({ method: "articles", tag_id, per_page: 5 });
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

export type PermalinkType = "category" | "post" | "page"
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

export interface Slug {
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
export async function fetchSlugToId(slug: string, type: ContentType, silent = false): Promise<string | null> {
  const slugRes = await fetcher<SlugToId>({ method: "slug-to-id", slug, type, silent });
  if (!slugRes) {
    return null
  }
  debugLog(debug.fetchSlugToId, "fetchSlugToId", slugRes)

  return slugRes.id
}

export async function fetchHomePage() {
  return fetcher<Page>({ method: "homepage" });
}

export interface TagFromTags {
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
  post_count?: string
}
export async function fetchTags() {
  return fetcher<TagFromTags[]>({ method: "tags" });
}

export async function fetchFooter(): Promise<Footer> {
  return fetcher<Footer>({ method: "footer" });
}

export interface Cookies {
  cookies_enabled: 0 | 1;
  cookies_text: string;
  cookies_reject_text: string;
  cookies_only_necessary_text: string;
  cookies_configure_text: string;
  cookies_accept_all_text: string;
}

export async function fetchCookies(): Promise<Cookies> {
  return fetcher<Cookies>({ method: "cookies" });
}

export async function fetchAgeVerification(): Promise<AgeVerification> {
  return fetcher<AgeVerification>({ method: "age-verification" });
}

export interface CheckRedirect {
  has_redirect: boolean,
  redirect_type: string,
  target_url: string,
  reason: string,
  is_gone: boolean,
  status_code: number
}
export async function fetchCheckRedirect(path: string): Promise<CheckRedirect> {
  return fetcher<CheckRedirect>({ method: "check-redirect", path });
}

export interface Robots {
  content: string
  content_type: string
  raw_content: string
}

export async function fetchRobots() {
  return fetcher<Robots>({ method: "robots" });
}
export type SitemapUrl = {
  loc: string
  lastmod: string
  changefreq:
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never"
  priority: string // viene como "0.8" en string
}

export type SitemapResponse = {
  xml_content: string
  content_type: "application/xml"
  urls_count: number
  generated_at: string
  urls: SitemapUrl[]
}
export async function fetchSitemap() {
  return fetcher<SitemapResponse>({ method: "sitemap" });
}

export type CustomScript = {
  custom_scripts: string
  content_type: string
  raw_content: string

}
export async function fetchCustomScript() {
  return fetcher<CustomScript>({ method: "custom-scripts" });
}

export async function fetchTagById(id: string): Promise<Tag> {
  return fetcher<Tag>({ method: "tag", id });
}

// Example URL:
// "https://intercms.dev/api/v2/data.php?
// method=slug-to-id
// &api_key=web_1475846333cdb47427ee61484f182c3f82bcc30965ca2b42e277811fb1bb
// &project_id=7
// &type=page
// &slug=bonos"