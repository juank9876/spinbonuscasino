/**
 * Tipos de página en el proyecto
 */
export type PageType = 'home' | 'posts' | 'pages' | 'categories' | 'tags';

/**
 * Configuración de componentes sidebar
 */
interface SidebarConfig {
    brandlistyLite: boolean;
    latest: boolean;      // Últimos posts
    author: boolean;      // Info del autor
    categories: boolean;  // Categorías relacionadas
    tags: boolean;        // Tags relacionados
    related: boolean;     // Posts relacionados
}

/**
 * Configuración por tipo de página
 */
interface PageTypeConfig {
    sidebar: SidebarConfig;
    author: boolean;      // Mostrar autor del post/page
    tags: boolean;        // Mostrar tags
    categories: boolean;  // Mostrar categorías
    breadcrumbs: boolean; // Mostrar breadcrumbs
    share: boolean;       // Botones de compartir
    comments: boolean;    // Sistema de comentarios
}

/**
 * Configuración global del proyecto
 */
interface ProjectConfig {
    template: {
        particles: boolean;                  // Efecto de partículas en background
        homeHeroWithNavbarTransparent: boolean;           // Hero con navbar transparente
        pageHeroWithNavbarTransparent: boolean;
        categoryHeroWithNavbarTransparent: boolean;
        tagHeroWithNavbarTransparent: boolean;
        postHeroWithNavbarTransparent: boolean;
        darkMode: boolean;                  // Modo oscuro habilitado
    };
    components: {
        navbar: {
            transparent: boolean;             // Navbar transparente al hacer scroll
            fixed: boolean;                   // Navbar fijo en top
            showSearch: boolean;              // Mostrar búsqueda
            bgColor: string;                  // Color de fondo
            links: {
                styles: string;
                bgColor: string;
                dropdown: {
                    styles: string;
                    bgColor: string;
                }
            },
            tags: {
                styles: string;
            }
        };
        layout: {
            width: string
        };
        hero: {
            homeHero: boolean;                  // Mostrar hero en la página
            pageHero: boolean;
            categoryHero: boolean;
            tagHero: boolean;
            postHero: boolean;
            bgColor: string;
        };
        footer: {
            showOn: PageType[];               // En qué páginas mostrar footer
            showNewsletter: boolean;          // Mostrar suscripción newsletter
            showSocialLinks: boolean;         // Mostrar enlaces sociales
            width: string
            bgColor: string
        };
        sidebar: {
            width: string;
            spacer: {
                enabled: boolean;
                width: string;
            };
            gap: string;
        };
    };
    pageTypes: {
        home: PageTypeConfig;
        posts: PageTypeConfig;
        pages: PageTypeConfig;
        categories: PageTypeConfig;
        tags: PageTypeConfig;
    };

}

/**
 * Configuración del proyecto
 * Controla qué componentes se muestran en cada tipo de página
 */
export const config: ProjectConfig = {
    // ========================================
    // COMPONENTES GLOBALES
    // ========================================
    components: {
        layout: {
            width: 'w-[90vw] lg:w-[70vw] xl:w-[70vw]',
        },
        navbar: {
            transparent: false,
            fixed: false,
            showSearch: false, //NOT IMPLEMENTED
            bgColor: 'bg-gradient-to-br from-slate-700 via-indigo-600 to-slate-800',

            links: {
                styles: 'text-white hover:text-[var(--color-accent-light)] hover:bg-white/10',
                bgColor: '',
                dropdown: {
                    styles: 'text-white hover:text-[var(--color-accent-light)]',
                    bgColor: 'bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900',
                }
            },
            tags: {
                styles: 'px-2 py-1 rounded text-xs hover:text-white text-gray-200 bg-[var(--color-accent-dark)]',
            }
        },
        hero: {
            homeHero: true,
            pageHero: true,
            categoryHero: true,
            tagHero: true,
            postHero: true,
            bgColor: 'bg-gradient-to-br from-slate-900 via-indigo-800 to-slate-900',
        },
        footer: {
            showOn: ['home', 'posts', 'pages', 'categories', 'tags'],  // tags excluido
            showNewsletter: true,
            showSocialLinks: true,
            width: 'w-[60vw]',
            bgColor: 'bg-gradient-to-br from-slate-900 via-indigo-800 to-slate-900',

        },
        sidebar: {
            // Ancho del sidebar en diferentes breakpoints
            width: 'hidden lg:w-[600px] xl:w-[600px]',       // Desktop grande: más ancho

            // Espaciador izquierdo (para balance visual)
            spacer: {
                enabled: true,
                width: 'w-[0vw]',
            },
            // Gap entre contenido y sidebar
            gap: 'gap-5',
        }
    },

    // ========================================
    // CONFIGURACIÓN GENERAL DEL TEMPLATE
    // ========================================
    get template() {
        return {
            particles: true,
            homeHeroWithNavbarTransparent: this.components.hero.homeHero && this.components.navbar.transparent,
            pageHeroWithNavbarTransparent: this.components.hero.pageHero && this.components.navbar.transparent,
            categoryHeroWithNavbarTransparent: this.components.hero.categoryHero && this.components.navbar.transparent,
            tagHeroWithNavbarTransparent: this.components.hero.tagHero && this.components.navbar.transparent,
            postHeroWithNavbarTransparent: this.components.hero.postHero && this.components.navbar.transparent,
            darkMode: false,
        };
    },

    // ========================================
    // CONFIGURACIÓN POR TIPO DE PÁGINA
    // ========================================
    pageTypes: {
        // HOME
        home: {
            sidebar: {
                brandlistyLite: false,
                latest: false,
                author: false,
                categories: false,
                tags: false,
                related: false,
            },
            author: false,
            tags: false,
            categories: false,
            breadcrumbs: false,
            share: false,
            comments: false,
        },

        // POSTS (artículos individuales)
        posts: {
            sidebar: {
                brandlistyLite: false,
                latest: false,
                author: false,
                categories: false,
                tags: false,      // Desactivado - no mostrar tags en sidebar
                related: false,
            },
            author: true,
            tags: true,
            categories: true,
            breadcrumbs: true,
            share: true,
            comments: true,
        },

        // PAGES (páginas estáticas)
        pages: {
            sidebar: {
                brandlistyLite: false,
                latest: false,
                author: false,
                categories: false,
                tags: false,
                related: false,
            },
            author: false,
            tags: false,
            categories: false,
            breadcrumbs: true,
            share: false,
            comments: false,
        },

        // CATEGORIES (listado de posts por categoría)
        categories: {
            sidebar: {
                brandlistyLite: false,
                latest: false,
                author: false,
                categories: false,
                tags: false,
                related: false,
            },
            author: false,
            tags: false,
            categories: false,
            breadcrumbs: true,
            share: false,
            comments: false,
        },

        // TAGS (listado de posts por tag)
        tags: {
            sidebar: {
                brandlistyLite: false,
                latest: false,
                author: false,
                categories: false,
                tags: false,
                related: false,
            },
            author: false,
            tags: false,
            categories: false,
            breadcrumbs: true,
            share: false,
            comments: false,
        },
    },
};

/**
 * Helper function para obtener configuración de un tipo de página
 */
export function getPageConfig(pageType: PageType): PageTypeConfig {
    return config.pageTypes[pageType];
}

/**
 * Helper function para verificar si un componente debe mostrarse
 */
export function shouldShowComponent(
    pageType: PageType,
    component: keyof PageTypeConfig
): boolean {
    return config.pageTypes[pageType][component] as boolean;
}

/**
 * Helper function para verificar si footer debe mostrarse
 */
export function shouldShowFooter(pageType: PageType): boolean {
    return config.components.footer.showOn.includes(pageType);
}