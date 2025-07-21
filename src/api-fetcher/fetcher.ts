import { debug, debugLog } from "@/config/debug-log";
import { Author, Category, NavItemType, Page, PermalinkData, Post, PostResponse, SiteSettings } from "@/types/types";

type MethodType = "articles" | "article" | "pages" | "page" | "category" | "categories" | "menu" | "site-settings" | "authors" | "author" | "permalink";

interface FetcherParams {
  method: MethodType;
  id?: string
  type?: string
}

export interface ResponseInterface<T = unknown> {
  status: string
  message: string
  data: T // Puedes ajustar el tipo según lo que esperes
}

export async function fetcher<T>({ method, id, type }: FetcherParams): Promise<T> {
  const baseUrl = `https://intercms.dev/api/v2/data.php`
  const url = baseUrl + `?method=${method}` + `&api_key=${process.env.API_KEY}` + `&project_id=${process.env.PROJECT_ID}` + (id ? `&id=${id}` : ``) + (type ? `&type=${type}` : ``)

  debugLog(debug.fetcher, '[+] fetcher url:' + url)

  if (method === "page" && id == undefined) {
    console.log("ID is required for method 'page'");
  }
  if (method === "article" && id == undefined) {
    console.log("ID is required for method 'article'");
  }

  try {
    const res = await fetch(url, {
      next: { revalidate: 3 },
    })
    const data: ResponseInterface<T> = await res.json();

    if (data.status === "success") {
      //console.log(data)
      return data.data
    }

  } catch (error) {
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

