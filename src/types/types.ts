import { TagFromTags } from "@/api-fetcher/fetcher"

export interface Page {
  id: string
  title: string
  slug: string
  excerpt: string
  html_content: string
  css_content: string | null
  featured_image: string
  meta_title: string
  meta_description: string
  meta_keywords: string
  canonical_url?: string
  robots_index?: string
  robots_follow?: string
  robots_noarchive?: number
  robots_nosnippet?: number
  robots_noimageindex?: number
  og_title?: string
  og_description?: string
  og_image?: string
  og_url?: string
  twitter_card?: string
  twitter_title?: string
  twitter_description?: string
  twitter_image?: string
  schema_data: SchemaData | SchemaData[]
  custom_fields: Record<string, unknown>
  view_count: number | string
  published_at: string
  created_at: string
  updated_at: string
  type: string
  status: string
  template: string
  is_home: number | string
  show_in_menu: number | string
  parent_id: string | null
  parent_title: string | null
  parent_slug: string | null
  child_pages: ChildPages[]
  seo_url: string
  breadcrumbs: Breadcrumb[]
  has_custom_css?: boolean
  css_url?: string
}

//POST -> ARTICLE EN LA API
export interface PostResponse {
  post: Post
  sidebar: Sidebar
}

export interface Sidebar {
  recent_posts?: RecentPost[]
  popular_categories?: CategoryArticle[]
  tags?: any[]
}
export interface RecentPost {
  id: string
  title: string
  slug: string
  featured_image: string
  published_at: string
}
export interface SidebarCategory {
  id: string
  project_id: string
  name: string
  slug: string
  description: string
  parent_id: string | null
  sort_order: string
  level: string
  path: string
  meta_title: string | null
  meta_description: string | null
  schema_data: unknown // poné un tipo más específico si sabés qué estructura tiene
  status: string
  created_at: string
  updated_at: string
  post_count: string
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  html_content: string
  css_content: string | null
  featured_image: string
  meta_title?: string
  meta_description?: string
  meta_keywords: string
  canonical_url?: string
  robots_index?: string
  robots_follow?: string
  robots_noarchive?: number
  robots_nosnippet?: number
  robots_noimageindex?: number
  og_title?: string
  og_description?: string
  og_image?: string
  og_url?: string
  twitter_card?: string
  twitter_title?: string
  twitter_description?: string
  twitter_image?: string
  schema_data: SchemaData
  custom_fields: Record<string, unknown>
  view_count: number | string
  published_at: string
  created_at: string
  updated_at: string
  author_id: string
  author_name: string
  author_bio: string
  author_avatar: string
  type: 'post'
  status: 'published' | 'draft' | string
  template: string
  is_home: number | string
  show_in_menu: number | string
  parent_id: string | null
  parent_title: string | null
  parent_slug: string | null
  tags: TagFromTags[]
  categories: CategoryWithPrimaryFlag[]
  primary_category: CategoryArticle
  category_id?: string
  category_name?: string
  category_slug?: string
  seo_url: string
  breadcrumbs: Breadcrumb[]
  related_posts?: RelatedPost[]
  has_custom_css?: boolean
  css_url?: string
}




export type CategoryArticle = {
  id: string
  project_id: string
  name: string
  slug: string
  description: string
  parent_id: string | null
  sort_order: string
  level: string
  path: string | null
  meta_title?: string
  meta_description?: string
  schema_data: SchemaData | null
  status: 'active' | 'inactive' | string
  created_at: string
  updated_at: string
  post_count?: string
}


export type RelatedPost = {
  id: string | number
  title: string
  slug: string
  excerpt: string
  featured_image: string
  published_at: string
}






/////////////////////////////////////////////////////////////////////////////////TIPOS Y DEMAS COMPLEMENTOS/////////////////////////////////////////////////////////////////////////////////
export type SchemaData = {
  "@context": string
  "@type": string
  name?: string
  headline?: string
  author?: string
}

export type ChildPages = {
  id: string
  title: string
  slug: string
  excerpt: string
}












///////////////////////////////////
interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
}

export interface SiteSettings {
  id: string
  project_id: string
  site_title: string
  site_description: string
  site_logo: string | null
  favicon: string | null
  primary_color: string
  secondary_color: string
  accent_color: string
  burger_menu_bg_color: string,
  burger_menu_font_color: string,
  cookies_enabled: "0" | "1",
  font_family: string
  meta_title: string
  meta_description: string
  meta_keywords: string | null
  ga_tracking_id: string | null
  facebook_pixel: string | null
  social_links: SocialLinks // puedes tiparlo mejor si tienes la estructura
  custom_css: string | null
  custom_js: string | null
  created_at: string
  updated_at: string
  schema_data: SchemaData | SchemaData[]

}

export interface Author {
  id: string;
  project_id: string;
  name: string;
  slug: string;
  email: string;
  bio: string;
  avatar: string;
  social_links: SocialLinks
  meta_title: string;
  meta_description: string;
  schema_data: unknown | null;
  status: string;
  created_at: string;
  updated_at: string;
  post_count: string;
}

export interface NavItemType {
  id: string
  project_id: string
  title: string
  url: string
  parent_id: string | null
  sort_order: string
  target: '_self' | '_blank' | '_parent' | '_top' | string
  css_class: string
  status: 'active' | 'inactive' | string
  created_at: string // podrías usar Date si parseas las fechas
  updated_at: string
  children?: NavItemType[]
}

export type Category = {
  id: string
  project_id: string
  name: string
  slug: string
  description: string
  parent_id: string | null
  sort_order: string
  level: string
  path: string
  meta_title: string | undefined
  meta_description: string | undefined
  schema_data: unknown // puedes refinar esto si sabes su estructura
  status: string
  created_at: string
  updated_at: string
  post_count: string
  child_categories_count: number
  seo_url: string
  breadcrumbs: Breadcrumb[]

  parent_name: string | null
  parent_slug: string | null
  total_posts: string
  child_categories: Category[] // vacíos en tu caso, pero pueden tener datos
  posts: Post[]
}



export interface Slug {
  slug: {
    id: string,
    title: string,
    type: string
  }
}






export interface Tag {
  id: string
  project_id: string
  name: string
  slug: string
  color: string
  description: string
  meta_title: string | null
  meta_description: string | null
  schema_data: unknown | null
  created_at: string
  updated_at: string
  posts: TagPost[]
}
type TagPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string
  published_at: string
}


export interface CategoryWithPrimaryFlag extends Category {
  is_primary: string
}

export interface Breadcrumb {
  title: string
  url: string
  type: 'home' | 'category' | 'post' | string
  current?: boolean
}

export type CategoryItem = {
  id: string;
  project_id: string;
  name: string;
  slug: string;
  description: string;
  parent_id: string | null;
  sort_order: string;
  level: string;
  path: string;
  meta_title: string | null;
  meta_description: string | null;
  schema_data: unknown | null; // Puedes ajustar esto según el tipo exacto de `schema_data` si lo conoces
  status: string;
  created_at: string;
  updated_at: string;
  post_count: string;
  parent_name: string | null;
  parent_slug: string | null;
  child_categories_count: number;
  seo_url: string;
  breadcrumbs: Breadcrumb[];
};

//SLUG Y PAGINAS
export type PageIdProps = {
  params: { id: string }
}
export type PageSlugProps = {
  params: { slug: string }
}
export type PagePostSlugProps = {
  params: { postSlug: string }
}



// TIPOS PARA RESPUESTA DE PERMALINK
export interface PermalinkCategoryHierarchy {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
}

export interface PermalinkBreadcrumb {
  title: string;
  url: string;
  type: 'home' | 'category' | string;
  current?: boolean;
}

export interface PermalinkData {
  id: string;
  name: string;
  slug: string;
  type: string;
  permalink: string;
  seo_url: string;
  category_hierarchy: PermalinkCategoryHierarchy[];
  breadcrumbs: PermalinkBreadcrumb[];
  url_segments: string[];
}

export interface PermalinkResponse {
  status: string;
  message: string;
  data: PermalinkData;
}

export interface AgeVerification {
  enabled: 0 | 1;
  modal_text: string;
  yes_text: string;
  no_text: string;
  redirect_url: string;
}