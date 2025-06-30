import { Category, NavItemType, Page, Post, PostResponse, SiteSettings } from "@/types/types";

type MethodType = "articles" | "article" | "pages" | "page" | "category" | "categories" | "menu" | "site-settings";

interface FetcherParams {
  method: MethodType;
  id?: string
}

export interface ResponseInterface<T = unknown> {
  status: string
  message: string
  data: T // Puedes ajustar el tipo según lo que esperes
}

export async function fetcher<T>({ method, id }: FetcherParams): Promise<T> {
  const baseUrl = `https://intercms.dev/api/v1/data.php`
  const url = baseUrl + `?method=${method}` + `&api_key=${process.env.API_KEY}` + `&project_id=${process.env.PROJECT_ID}` + (id ? `&id=${id}` : ``)
  
  if (method === "page" && id == undefined) {
    console.log("ID is required for method 'page'");
  }
  if (method === "article" && id == undefined) {
    console.log("ID is required for method 'article'");
  }

  try {
    const res = await fetch(url)
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
