
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
  schema_data: unknown[]
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
  parent_id: string | null
  parent_name: string | null
  parent_slug: string | null
  name: string
  slug: string
  description: string
  level: string
  path: string
  meta_title: string | undefined
  meta_description: string | undefined
  schema_data: unknown // puedes refinar esto si sabes su estructura
  created_at: string
  updated_at: string
  sort_order: string
  status: string
  seo_url: string
  total_posts: string
  child_categories: Category[] // vacíos en tu caso, pero pueden tener datos
  child_categories_count: number
  posts: Post[]
  breadcrumbs: Breadcrumb[]
}

export interface PostResponse {
  post: Post
  sidebar: Sidebar // definilo si lo vas a usar, o poné `any`
}

export interface Slug {
  slug: {
    id: string,
    title: string,
    type: string
  }
}

export interface Post {
  id: string
  project_id: string
  parent_id: string | null
  author_id: string
  title: string
  slug: string
  excerpt: string
  html_content: string
  css_content: string | null
  featured_image: string
  meta_title: string | undefined
  meta_description: string | undefined
  meta_keywords: string
  schema_data: unknown[] // Ajusta si sabes su estructura
  custom_fields: unknown[] // Igual aquí
  view_count: string
  comment_count: string
  sort_order: string
  allow_comments: string
  type: 'post'
  status: 'published' | 'draft' | string
  created_at: string
  updated_at: string
  published_at: string
  template: string
  show_in_menu: string
  is_home: string
  author_name: string
  author_bio: string
  author_avatar: string
  parent_title: string | null
  parent_slug: string | null
  tags: Tag[]
  categories: CategoryWithPrimaryFlag[]
  primary_category: Category
  category_id: string
  category_name: string
  category_slug: string
  seo_url: string
  breadcrumbs: Breadcrumb[]
}

export interface Sidebar {
  recent_posts: SidebarPost[]
  popular_categories: SidebarCategory[]
}

export interface SidebarPost {
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

export interface Tag {
  id: string
  project_id: string
  name: string
  slug: string
  description: string
  meta_title: string | null
  meta_description: string | null
  schema_data: unknown | null
  created_at: string
  updated_at: string
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

export interface Page {
  id: string
  project_id: string
  parent_id: string | null
  author_id: string
  title: string
  slug: string
  excerpt: string
  html_content: string
  css_content: string | null
  featured_image: string
  meta_title: string
  meta_description: string
  meta_keywords: string
  schema_data: unknown[] // puedes reemplazar con un tipo más estricto si conoces la estructura
  custom_fields: unknown[] // idem
  view_count: string
  comment_count: string
  sort_order: string
  allow_comments: string
  type: string
  status: string
  created_at: string
  updated_at: string
  published_at: string
  template: string
  show_in_menu: string
  is_home: string
  parent_title: string | null
  parent_slug: string | null
  child_pages: unknown[] // podrías tiparlo como PageData[] si se anidan igual
  seo_url: string
  breadcrumbs: Breadcrumb[]
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