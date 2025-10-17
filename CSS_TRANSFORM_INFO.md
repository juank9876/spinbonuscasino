# 🎨 Transformación de CSS desde API

## Funcionamiento

El sistema ahora procesa automáticamente el CSS que viene desde la API **antes** de inyectarlo en el DOM.

### 📍 Ubicación del Procesamiento

**Archivo:** `src/components/juankui/css-content.tsx`

Este componente recibe el CSS de la API y lo procesa mediante el componente `DynamicStyle`.

---

## ✂️ Eliminación de max-width

### Clase Afectada

La clase `.info-cards-container` ahora tiene su propiedad `max-width` **eliminada automáticamente**.

### Ejemplo de Transformación

#### CSS Original (desde API):
```css
.info-cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    row-gap: 20px;
    column-gap: 20px;
    max-width: 1200px;  /* ❌ Esta línea se elimina */
    margin: 0 auto;
    font-family: Montserrat, sans-serif;
    color: rgb(51, 51, 51);
    line-height: 1.6;
    padding: 20px;
}
```

#### CSS Transformado (aplicado al DOM):
```css
.info-cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    row-gap: 20px;
    column-gap: 20px;
    /* max-width eliminado ✅ */
    margin: 0 auto;
    font-family: Montserrat, sans-serif;
    color: rgb(51, 51, 51);
    line-height: 1.6;
    padding: 20px;
}
```

---

## 🔧 Función Implementada

```typescript
const removeMaxWidthFromClass = (cssContent: string, className: string): string => {
    // Buscar la clase específica con su bloque de estilos
    const classRegex = new RegExp(`\\.${className}\\s*\\{([^}]*)\\}`, 'g');
    
    return cssContent.replace(classRegex, (match, styles) => {
        // Eliminar todas las variantes de max-width
        const cleanedStyles = styles
            .replace(/max-width\s*:\s*[^;]*;?/gi, '')
            .replace(/\s+/g, ' ')
            .trim();
        
        return `.${className} { ${cleanedStyles} }`;
    });
};
```

### Características

- ✅ Busca la clase específica usando regex
- ✅ Elimina `max-width` con cualquier valor
- ✅ Maneja espacios y formato CSS variable
- ✅ Case-insensitive (`max-width`, `MAX-WIDTH`, etc.)
- ✅ Preserva todos los demás estilos

---

## 🎯 Flujo Completo

```mermaid
API
 ↓
 CSS + HTML
 ↓
HtmlRenderer Component
 ↓
DynamicStyle Component
 ↓
removeMaxWidthFromClass() ← 🔥 Transformación aquí
 ↓
CSS modificado inyectado en <head>
 ↓
Renderizado en el navegador
```

---

## 🔍 Debug

Si necesitas ver el CSS transformado en consola, activa el debug en `config/debug-log.ts`:

```typescript
export const debug = {
    cssContent: true,  // ← Activar para ver CSS en consola
}
```

---

## ➕ Añadir Más Clases

Para eliminar `max-width` de otras clases, añade más llamadas en `DynamicStyle`:

```typescript
// Eliminar max-width de múltiples clases
cssContent = removeMaxWidthFromClass(cssContent, 'info-cards-container');
cssContent = removeMaxWidthFromClass(cssContent, 'otra-clase');
cssContent = removeMaxWidthFromClass(cssContent, 'mas-clases');
```

---

## 📦 Archivos Modificados

- ✅ `src/components/juankui/css-content.tsx` - **Actualizado** con función de transformación
- ✅ `src/components/html-transform/transformer-map.ts` - Registro de transformador HTML
- ✅ `src/components/html-transform/transformCards/info-cards-containter.tsx` - Transformador HTML
