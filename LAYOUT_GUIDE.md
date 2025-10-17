# 📐 Guía de Layout y Sidebar

## Resumen de la Reorganización

Se ha refactorizado la arquitectura de layouts para **centralizar** la lógica del sidebar y hacerla **reutilizable** en todos los tipos de página.

---

## 🏗️ Estructura Nueva

### Componente Central: `ContentWithSidebar`

**Ubicación:** `src/components/juankui/layouts/content-with-sidebar.tsx`

Este componente maneja automáticamente:
- ✅ Layout responsive con contenido principal + sidebar
- ✅ Configuración del sidebar según tipo de página
- ✅ Mostrar/ocultar sidebar según config
- ✅ Espaciado y alineación correctos

### Props del Componente

```typescript
interface ContentWithSidebarProps {
  children: ReactNode;              // Contenido principal
  sidebarConfig?: SidebarConfig;    // Configuración de qué mostrar en sidebar
  sidebarData?: SidebarData;        // Datos para los widgets del sidebar
  contentMaxWidth?: string;         // Ancho máximo del contenido (default: max-w-[90vw] lg:max-w-[60vw])
  className?: string;               // Clases adicionales
}
```

---

## 📝 Cómo Usar en Cada Página

### 1. **Posts** (`pre-post.tsx`)

```tsx
<ContentWithSidebar
  sidebarConfig={postConfig.sidebar}
  sidebarData={{
    author: { id, name, avatar, bio },
    category: { id, name, slug },
    tag: { id, name, slug },
    postId: post.id
  }}
>
  <PostBody>{children}</PostBody>
</ContentWithSidebar>
```

### 2. **Categorías** (`pre-category.tsx`)

```tsx
<ContentWithSidebar
  sidebarConfig={categoryConfig.sidebar}
  sidebarData={{ category: { id, name, slug } }}
  contentMaxWidth="max-w-[90vw] lg:max-w-[60vw]"
>
  <div className='flex flex-col space-y-5'>
    {children}
  </div>
</ContentWithSidebar>
```

### 3. **Tags** (`pre-tag.tsx`)

```tsx
<ContentWithSidebar
  sidebarConfig={tagConfig.sidebar}
  sidebarData={{ tag: { id, name, slug } }}
  contentMaxWidth="max-w-[90vw] lg:max-w-[60vw]"
>
  <div className='flex flex-col space-y-5'>
    {children}
  </div>
</ContentWithSidebar>
```

### 4. **Páginas** (`pre-page.tsx`)

```tsx
<ContentWithSidebar
  sidebarConfig={pageConfig.sidebar}
  contentMaxWidth="max-w-[90vw] lg:max-w-[60vw]"
>
  <div className='flex flex-col space-y-5'>
    {children}
  </div>
</ContentWithSidebar>
```

---

## ⚙️ Configuración del Sidebar

La configuración se maneja en **`config.ts`** bajo `pageTypes`:

```typescript
pageTypes: {
  posts: {
    sidebar: {
      latest: true,        // Últimos posts
      author: true,        // Posts del autor
      categories: true,    // Posts de la categoría
      tags: true,          // Posts del tag
      related: true,       // Posts relacionados
    }
  },
  categories: {
    sidebar: {
      latest: true,
      categories: true,
      tags: true,
    }
  },
  // ... etc
}
```

---

## ✨ Ventajas de esta Arquitectura

1. **DRY (Don't Repeat Yourself)**: El código del sidebar está en un solo lugar
2. **Mantenibilidad**: Cambios al sidebar afectan todas las páginas automáticamente
3. **Consistencia**: Layout uniforme en todas las páginas
4. **Flexibilidad**: Fácil activar/desactivar sidebar en cualquier tipo de página
5. **Escalabilidad**: Agregar nuevos widgets al sidebar es sencillo

---

## 🎯 Ejemplo: Activar Sidebar en Páginas

Si quieres activar el sidebar en páginas estáticas:

1. Ve a `config.ts`
2. Modifica `pageTypes.pages.sidebar`:

```typescript
pages: {
  sidebar: {
    latest: true,        // ✅ Activar últimos posts
    categories: true,    // ✅ Activar categorías
  }
}
```

3. El sidebar aparecerá automáticamente en todas las páginas

---

## 📊 Comportamiento Responsive

- **Desktop (lg+)**: Sidebar visible a la derecha
- **Mobile/Tablet**: Sidebar oculto automáticamente
- **Spacer izquierdo**: Solo visible en desktop cuando hay sidebar activo

---

## 🔧 Personalización del Sidebar

### Configuración Responsive del Ancho

El sidebar ahora soporta **configuración responsive completa** desde `config.ts`:

```typescript
components: {
  sidebar: {
    // Ancho del sidebar en diferentes breakpoints
    width: {
      base: 'w-full',           // Mobile (aunque esté oculto)
      lg: 'lg:w-[320px]',       // Desktop: 320px
      xl: 'xl:w-[380px]',       // Desktop XL: 380px
    },
    // Espaciador izquierdo (balance visual)
    spacer: {
      enabled: true,            // Activar/desactivar spacer
      width: 'w-[25vw]',       // Ancho del spacer
    },
    // Gap entre contenido y sidebar
    gap: 'gap-5',               // Tailwind spacing class
  }
}
```

### Ejemplos de Configuración

#### Sidebar más ancho
```typescript
width: {
  base: 'w-full',
  lg: 'lg:w-[400px]',
  xl: 'xl:w-[450px]',
}
```

#### Sidebar más estrecho
```typescript
width: {
  base: 'w-full',
  lg: 'lg:w-[280px]',
  xl: 'xl:w-[300px]',
}
```

#### Sidebar con ancho fluido
```typescript
width: {
  base: 'w-full',
  lg: 'lg:w-[25vw]',
  xl: 'xl:w-[20vw]',
}
```

#### Desactivar spacer izquierdo
```typescript
spacer: {
  enabled: false,
  width: 'w-0',
}
```

#### Más espacio entre contenido y sidebar
```typescript
gap: 'gap-8',  // o gap-10, gap-12, etc.
```

### Cambiar ancho del contenido

Al usar el componente:
```tsx
<ContentWithSidebar
  contentMaxWidth="max-w-[80vw] lg:max-w-[50vw]"
>
```

---

## 🎨 Sistema Responsive en Detalle

### Breakpoints de Tailwind

El sidebar utiliza los breakpoints estándar de Tailwind CSS:

- **base**: `0px` - Mobile (sidebar oculto)
- **lg**: `1024px+` - Tablets landscape y desktop (sidebar visible)
- **xl**: `1280px+` - Desktop grande (sidebar más ancho)

### Comportamiento por Dispositivo

| Dispositivo | Sidebar | Spacer | Contenido |
|------------|---------|--------|-----------|
| Mobile (< 1024px) | ❌ Oculto | ❌ Oculto | 100% ancho |
| Tablet/Desktop (1024px+) | ✅ Visible (320px) | ✅ Visible | Flexible |
| Desktop XL (1280px+) | ✅ Visible (380px) | ✅ Visible | Flexible |

### Flujo de Clases CSS

El componente `ContentWithSidebar` construye dinámicamente las clases:

```javascript
// Sidebar width
sidebarWidth = "w-full lg:w-[320px] xl:w-[380px]"

// Container gap
containerGap = "gap-5"

// Resultado final en el DOM
<div class="flex flex-row gap-5 w-[90vw]">
  <div class="w-[25vw] hidden lg:block" />      <!-- Spacer -->
  <div class="flex-1">Content</div>             <!-- Main content -->
  <div class="w-full lg:w-[320px] xl:w-[380px]"> <!-- Sidebar -->
    ...widgets...
  </div>
</div>
```

---

## 📦 Archivos Modificados

- ✅ `src/components/juankui/layouts/content-with-sidebar.tsx` - **NUEVO** componente reutilizable
- ✅ `src/components/juankui/pre-rendered/pre-post.tsx` - Refactorizado
- ✅ `src/components/juankui/pre-rendered/pre-category.tsx` - Refactorizado
- ✅ `src/components/juankui/pre-rendered/pre-tag.tsx` - Refactorizado
- ✅ `src/components/juankui/pre-rendered/pre-page.tsx` - Refactorizado
- ✅ `src/config/config.ts` - **Actualizado** con configuración responsive del sidebar
