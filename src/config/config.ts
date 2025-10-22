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
        };
        layout: {
            width: {
                base: string;
                lg: string;
                xl: string;
            };
        };
        hero: {
            homeHero: boolean;                  // Mostrar hero en la página
            pageHero: boolean;
            categoryHero: boolean;
            tagHero: boolean;
            postHero: boolean;
        };
        footer: {
            showOn: PageType[];               // En qué páginas mostrar footer
            showNewsletter: boolean;          // Mostrar suscripción newsletter
            showSocialLinks: boolean;         // Mostrar enlaces sociales
        };
        sidebar: {
            width: {
                base: string;
                lg: string;
                xl: string;
            };
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
            width: {
                base: 'w-[90vw]',
                lg: 'lg:w-[60vw]',
                xl: 'xl:w-[60vw]',
            }
        },
        navbar: {
            transparent: false,
            fixed: true,
            showSearch: true,
        },
        hero: {
            homeHero: true,
            pageHero: true,
            categoryHero: true,
            tagHero: true,
            postHero: true,
        },
        footer: {
            showOn: ['home', 'posts', 'pages', 'categories', 'tags'],  // tags excluido
            showNewsletter: true,
            showSocialLinks: true,
        },
        sidebar: {
            // Ancho del sidebar en diferentes breakpoints
            width: {
                base: 'w-full',           // Mobile: ancho completo (aunque esté oculto)
                lg: 'lg:w-[500px]',       // Desktop: ancho fijo
                xl: 'xl:w-[500px]',       // Desktop grande: más ancho
            },
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
                latest: true,
                author: true,
                categories: true,
                tags: true,
                related: true,
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
                brandlistyLite: true,
                latest: true,
                author: true,
                categories: true,
                tags: true,      // Desactivado - no mostrar tags en sidebar
                related: true,
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
                latest: true,
                author: false,
                categories: true,
                tags: true,
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
                latest: true,
                author: false,
                categories: true,
                tags: true,
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