# Sistema de Estilos del Blog

Sistema completo de estilos para posts de blog con Markdown y componentes interactivos.

## 📁 Archivos

- **`/src/styles/blog-prose.css`**: Sistema completo de estilos para contenido Markdown
- **`/src/pages/blog/[slug].astro`**: Layout del blog (importa blog-prose.css)
- **`/src/components/blog/`**: Componentes especializados para blog

## ✅ Elementos Markdown Estilizados

### Headings (h1-h6)
```markdown
## Título Principal
### Subtítulo
#### Sección
```

**Características:**
- H2 con barra vertical gradiente decorativa
- Espaciado y tamaños consistentes
- Letter-spacing ajustado para legibilidad

### Párrafos
```markdown
Este es un párrafo normal con espaciado automático.
```

**Características:**
- Line-height 1.75 para legibilidad óptima
- Margin-bottom automático de 1.25rem
- Tamaño de fuente: 1.0625rem

### Links
```markdown
[Texto del enlace](https://ejemplo.com)
```

**Características:**
- Color primario con hover animado
- Underline gradiente con efecto reveal
- Links externos tienen icono ↗ automático
- Sin decoración manual necesaria

### Énfasis y Strong
```markdown
**Texto en negrita** con fondo sutil
*Texto en cursiva* con color diferenciado
```

**Características:**
- Strong tiene fondo gradiente sutil
- Em usa color muted-foreground

### Code
```markdown
`código inline` con fondo

\`\`\`javascript
// Bloque de código
const ejemplo = "valor";
\`\`\`
```

**Características:**
- Inline code con fondo, borde y padding
- Bloques de código con syntax highlighting ready
- Font monoespaciada con fallbacks

### Listas

#### Lista desordenada
```markdown
- Ítem 1
- Ítem 2
  - Sub-ítem anidado
- Ítem 3
```

**Características:**
- Bullets personalizados (triángulos gradiente)
- Soporte para listas anidadas
- Espaciado consistente

#### Lista ordenada
```markdown
1. Primer paso
2. Segundo paso
3. Tercer paso
```

**Características:**
- Números circulares con gradiente
- Peso visual para jerarquía
- Auto-incremento con CSS counters

### Tablas
```markdown
| Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|-----------|
| Dato 1    | Dato 2    | Dato 3    |
| Dato 4    | Dato 5    | Dato 6    |
```

**Características:**
- Header con gradiente de color
- Hover effect en filas
- Responsive (scroll horizontal en móvil)
- Bordes y sombras sutiles

### Blockquotes
```markdown
> Esta es una cita importante
> que puede tener múltiples líneas.
```

**Características:**
- Barra lateral colorida
- Fondo sutil
- Padding generoso
- Font-style italic automático

### Imágenes
```markdown
![Descripción](url-imagen.jpg)
```

**Características:**
- Border-radius automático
- Box-shadow para profundidad
- Max-width 100% (responsive)
- Margin automático

### Línea Horizontal
```markdown
---
```

**Características:**
- Gradiente de transparente a visible
- Height de 2px
- Margin superior e inferior generoso

## 🎨 Componentes de Blog

### Callout
```astro
<Callout type="info" title="Título">
Contenido del callout
</Callout>
```

**Tipos:** `info`, `warning`, `success`, `danger`

### StatsCard
```astro
<StatsCard 
  number="67%" 
  label="Descripción" 
  color="primary" 
  icon="🎯" 
/>
```

**Colores:** `primary`, `success`, `warning`, `info`, `danger`

### QuickStats
```astro
<QuickStats
  stats={[
    { value: "67%", label: "Descripción", icon: "🚨", trend: "down" },
    { value: "45%", label: "Otra métrica", icon: "📈", trend: "up" }
  ]}
  columns={2}
/>
```

### HighlightBox
```astro
<HighlightBox emoji="💡" variant="gradient">
Contenido destacado importante
</HighlightBox>
```

**Variantes:** `default`, `gradient`, `outline`

### ComparisonTable
```astro
<ComparisonTable title="Título de la tabla">

| Columna 1 | Columna 2 |
|-----------|-----------|
| Dato      | Otro dato |

</ComparisonTable>
```

### ProTip
```astro
<ProTip title="Consejo profesional" icon="💡">
Contenido del tip
</ProTip>
```

### ProgressBar
```astro
<ProgressBar 
  current={500000} 
  total={9000000} 
  label="Meta de ahorro" 
  color="success" 
/>
```

### StepByStep
```astro
<StepByStep
  steps={[
    { title: "Paso 1", content: "Descripción" },
    { title: "Paso 2", content: "Descripción" }
  ]}
/>
```

### BeforeAfter
```astro
<BeforeAfter
  before={{
    title: "Antes",
    items: ["Item 1", "Item 2"]
  }}
  after={{
    title: "Después",
    items: ["Item 1", "Item 2"]
  }}
/>
```

### BlogButton
```astro
<BlogButton 
  href="/planes" 
  variant="primary" 
  size="lg" 
  icon="🚀"
>
  Texto del botón
</BlogButton>
```

**Variantes:** `primary`, `secondary`, `outline`
**Tamaños:** `sm`, `md`, `lg`

## 📐 Layout y Estructura

### Contenedores Full-Width vs Text-Width

El sistema automáticamente ajusta el ancho:

- **Texto markdown**: Max-width de 65ch para legibilidad
- **Componentes con grid/columns**: Full width del contenedor
- **Tablas e imágenes**: Responsive y full-width cuando necesario

### Grids para Componentes

```astro
<div class="grid md:grid-cols-2 gap-6 my-8">
  <StatsCard ... />
  <StatsCard ... />
</div>

<div class="grid md:grid-cols-3 gap-6 my-10">
  <StatsCard ... />
  <StatsCard ... />
  <StatsCard ... />
</div>
```

### Espaciado Vertical

```astro
<div class="space-y-6 my-10">
  <Callout ... />
  <Callout ... />
  <Callout ... />
</div>
```

## 🎯 Mejores Prácticas

### ✅ DO:
1. Usar markdown nativo siempre que sea posible
2. Los componentes no necesitan wrappers adicionales
3. Dejar que el CSS maneje el espaciado automáticamente
4. Usar componentes para contenido interactivo/visual
5. Agrupar componentes relacionados en grids

### ❌ DON'T:
1. No wrappear texto en divs innecesarios
2. No agregar margin/padding manual al markdown
3. No mezclar estilos inline con el sistema
4. No usar `<div class="blog-text-content">` (ya no necesario)

## 🔍 Debugging

### Verificar estilos aplicados:
1. Inspeccionar elemento en DevTools
2. Buscar clase `.prose-blog` en el contenedor
3. Verificar que blog-prose.css esté cargado en Network tab

### Problemas comunes:

**Texto sin estilos:**
- Verificar que el archivo MDX no tenga divs extra
- Confirmar que blog-prose.css está importado en [slug].astro

**Componentes desbordados:**
- Usar grids con gap apropiado
- Verificar clases responsive (md:grid-cols-X)

**Espaciado irregular:**
- Remover margin/padding manual
- Dejar que el sistema maneje automáticamente

## 📱 Responsive Design

Todos los elementos son responsive por defecto:

- **Tablas**: Scroll horizontal en móvil
- **Grids**: Colapsan a 1 columna en mobile
- **Imágenes**: Max-width 100% automático
- **Typography**: Tamaños ajustados por breakpoint

## 🎨 Dark Mode

Todos los estilos soportan dark mode usando CSS variables:

```css
color: var(--foreground);
background: var(--background);
border-color: var(--border);
```

El sistema automáticamente adapta colores basado en el tema activo.

## 📊 Performance

- **CSS externo**: Cacheado por el navegador
- **Sin JavaScript**: Markdown renderizado server-side
- **Lazy loading**: Imágenes con loading="lazy" opcional
- **Bundle size**: CSS minificado en producción

## 🚀 Crear Nuevo Post

1. Copiar `_template.mdx` en `/src/content/blog/`
2. Actualizar frontmatter (título, descripción, fecha, etc.)
3. Escribir contenido en Markdown
4. Usar componentes donde sea necesario
5. ¡Publicar!

**No necesitas:**
- Agregar imports de CSS
- Wrappear contenido en divs
- Configurar estilos manualmente
- Preocuparte por spacing

Todo está automatizado. Solo escribe y usa componentes. 🎉
