# Configuración del Proyecto

Este archivo explica cómo usar el sistema de configuración del proyecto para controlar qué componentes se muestran en cada tipo de página.

## 📁 Estructura

El archivo `config.ts` contiene toda la configuración del proyecto dividida en tres secciones principales:

### 1. **Template** - Configuración general del template
```typescript
template: {
  particles: boolean,          // Efecto de partículas en background
  heroTransparent: boolean,    // Hero con navbar transparente
  darkMode: boolean,           // Modo oscuro habilitado
}
```

### 2. **Components** - Componentes globales
```typescript
components: {
  navbar: {
    transparent: boolean,      // Navbar transparente al hacer scroll
    fixed: boolean,            // Navbar fijo en top
    showSearch: boolean,       // Mostrar búsqueda
  },
  footer: {
    showOn: PageType[],        // Array de páginas donde mostrar footer
    showNewsletter: boolean,   // Mostrar suscripción newsletter
    showSocialLinks: boolean,  // Mostrar enlaces sociales
  },
}
```

### 3. **PageTypes** - Configuración por tipo de página

Cada tipo de página (`home`, `posts`, `pages`, `categories`, `tags`) tiene su propia configuración:

```typescript
pageTypes: {
  posts: {
    sidebar: {
      latest: boolean,         // Últimos posts
      author: boolean,         // Info del autor
      categories: boolean,     // Categorías relacionadas
      tags: boolean,           // Tags relacionados
      related: boolean,        // Posts relacionados
    },
    author: boolean,           // Mostrar autor del post
    tags: boolean,             // Mostrar tags
    categories: boolean,       // Mostrar categorías
    breadcrumbs: boolean,      // Mostrar breadcrumbs
    share: boolean,            // Botones de compartir
    comments: boolean,         // Sistema de comentarios
  }
}
```

## 🎯 Tipos de Página

El proyecto maneja **5 tipos de páginas**:

| Tipo | Descripción |
|------|-------------|
| `home` | Página principal |
| `posts` | Artículos individuales del blog |
| `pages` | Páginas estáticas (About, Contact, etc.) |
| `categories` | Listado de posts filtrados por categoría |
| `tags` | Listado de posts filtrados por tag |

## 🔧 Cómo Usar

### Opción 1: Acceso directo al objeto config

```tsx
import { config } from '@/config/config';

// Verificar si mostrar sidebar en posts
const showSidebar = config.pageTypes.posts.sidebar.latest;

// Verificar configuración del navbar
const isTransparent = config.components.navbar.transparent;
```

### Opción 2: Usando las helper functions

```tsx
import { getPageConfig, shouldShowComponent, shouldShowFooter } from '@/config/config';

// Obtener toda la configuración de un tipo de página
const postConfig = getPageConfig('posts');

// Verificar si un componente debe mostrarse
const showAuthor = shouldShowComponent('posts', 'author');

// Verificar si el footer debe mostrarse
const showFooter = shouldShowFooter('posts');
```

### Ejemplo práctico en un componente

```tsx
import { config } from '@/config/config';

export function PrePost({ children, post }: Props) {
  const postConfig = config.pageTypes.posts;

  // Verificar si mostrar al menos un elemento del sidebar
  const showSidebar = 
    postConfig.sidebar.latest || 
    postConfig.sidebar.author || 
    postConfig.sidebar.categories || 
    postConfig.sidebar.tags;

  return (
    <div>
      <PostBody>{children}</PostBody>

      {/* Mostrar sidebar solo si está habilitado */}
      {showSidebar && (
        <Sidebar>
          {postConfig.sidebar.latest && <LatestPosts />}
          {postConfig.sidebar.author && <AuthorInfo />}
          {postConfig.sidebar.categories && <Categories />}
          {postConfig.sidebar.tags && <Tags />}
        </Sidebar>
      )}

      {/* Mostrar autor solo si está habilitado */}
      {postConfig.author && <AuthorCard />}
      
      {/* Mostrar tags solo si está habilitado */}
      {postConfig.tags && <TagsList />}
    </div>
  );
}
```

## ⚙️ Configuración Recomendada por Tipo de Página

### Home
- **Sidebar**: Desactivado (limpio y enfocado)
- **Author/Tags**: Desactivado
- **Breadcrumbs**: Desactivado

### Posts
- **Sidebar**: Activado (máxima información complementaria)
- **Author/Tags**: Activado
- **Breadcrumbs**: Activado
- **Share/Comments**: Activado

### Pages
- **Sidebar**: Desactivado (contenido estático)
- **Author/Tags**: Desactivado
- **Breadcrumbs**: Activado (navegación)

### Categories/Tags
- **Sidebar**: Parcialmente activado (latest + categories + tags)
- **Author**: Desactivado
- **Breadcrumbs**: Activado

## 🎨 Personalización

Para cambiar la configuración, simplemente edita el objeto `config` en `config.ts`:

```typescript
export const config: ProjectConfig = {
  pageTypes: {
    posts: {
      sidebar: {
        latest: true,    // Cambia a false para desactivar
        author: true,
        categories: true,
        tags: true,
        related: true,
      },
      // ... resto de la configuración
    }
  }
}
```

## 🔍 TypeScript

El sistema está completamente tipado con TypeScript, lo que proporciona:

- ✅ **Autocompletado** en tu IDE
- ✅ **Detección de errores** en tiempo de desarrollo
- ✅ **Documentación inline** con comentarios
- ✅ **Type safety** en toda la aplicación

## 📝 Notas

- El contenido HTML viene de la API, este proyecto solo lo renderiza
- Los componentes se muestran/ocultan según la configuración, pero siempre están disponibles
- Cambiar la configuración no requiere reiniciar el servidor (hot reload)
- La configuración es reactiva, los cambios se reflejan inmediatamente

## 🚀 Siguiente Paso

Si necesitas agregar nuevas opciones de configuración, simplemente:

1. Añade la propiedad a la interfaz correspondiente (`SidebarConfig`, `PageTypeConfig`, etc.)
2. Actualiza el objeto `config` con el valor por defecto
3. TypeScript te guiará para actualizar todos los lugares donde se usa
