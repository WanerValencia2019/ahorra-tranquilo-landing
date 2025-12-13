# 📝 Guía para Crear Nuevos Posts del Blog

## Estructura Estándar de un Post

### 1. Frontmatter (Metadata)

```yaml
---
title: "Título Principal del Post"
description: "Descripción SEO optimizada de 150-160 caracteres que aparecerá en búsquedas"
pubDate: 2024-12-12T00:00:00Z
author: "Waner Valencia"
category: "Categoría Principal" # Ver categorías disponibles abajo
tags: ["tag1", "tag2", "tag3", "tag4"]
image: "https://placehold.co/1200x630/COLOR/ffffff?text=Titulo+Corto"
featured: false # true para posts destacados
readTime: "X min"
---
```

#### Categorías Disponibles:
- Educación Financiera
- Presupuestos
- Ahorro
- Inversión
- Deudas
- Herramientas
- Tips

### 2. Imports de Componentes

**Siempre incluir al inicio del contenido:**

```jsx
import Callout from '../../components/blog/Callout.astro';
import StatsCard from '../../components/blog/StatsCard.astro';
import ComparisonTable from '../../components/blog/ComparisonTable.astro';
import HighlightBox from '../../components/blog/HighlightBox.astro';
import ProTip from '../../components/blog/ProTip.astro';
import QuickStats from '../../components/blog/QuickStats.astro';
import ProgressBar from '../../components/blog/ProgressBar.astro';
import StepByStep from '../../components/blog/StepByStep.astro';
import BeforeAfter from '../../components/blog/BeforeAfter.astro';
```

---

## 🎨 Componentes Disponibles

### 1. Callout (Cajas de Información)

Para llamar la atención sobre información importante.

**Tipos disponibles:**
- `info` - Información general (azul) 💡
- `warning` - Advertencias (amarillo) ⚠️
- `success` - Consejos positivos (verde) ✅
- `tip` - Tips financieros (teal) 💰

**Uso:**

```jsx
<Callout type="info" title="Título Opcional">
Contenido del callout. Puedes usar:
- Listas
- **Negrita**
- *Cursiva*
</Callout>
```

---

### 2. StatsCard (Tarjetas de Estadísticas)

Para mostrar números importantes de forma visual.

**Props:**
- `number`: El número/porcentaje a mostrar
- `label`: Descripción del número
- `color`: primary | success | warning | info | destructive
- `icon`: Emoji opcional

**Uso:**

```jsx
<div class="grid md:grid-cols-3 gap-6 my-10">
  <StatsCard number="50%" label="Necesidades Básicas" color="primary" icon="🏠" />
  <StatsCard number="30%" label="Gustos" color="success" icon="🎉" />
  <StatsCard number="20%" label="Ahorros" color="warning" icon="💰" />
</div>
```

---

### 3. HighlightBox (Caja Destacada)

Para resaltar conceptos clave o quotes importantes.

**Props:**
- `emoji`: Emoji decorativo (default: 📊)
- `variant`: gradient | solid | outline

**Uso:**

```jsx
<HighlightBox emoji="🎯" variant="gradient">
**Dato clave:** Las personas con metas escritas son 42% más propensas a alcanzarlas.
</HighlightBox>
```

---

### 4. ComparisonTable (Tablas Comparativas)

Para mostrar datos tabulares de forma elegante.

**Props:**
- `title`: Título opcional de la tabla
- `variant`: default | compact | striped

**Uso:**

```jsx
<ComparisonTable title="Distribución de Gastos ($3,000,000 mensual)">

| Concepto | Monto | % del Total |
|----------|-------|-------------|
| Arriendo | $800,000 | 27% |
| Servicios | $180,000 | 6% |
| Mercado | $400,000 | 13% |
| **TOTAL** | **$1,500,000** | **50%** |

</ComparisonTable>
```

---

### 5. ProTip (Consejos Profesionales)

Para tips avanzados o información especial.

**Props:**
- `title`: Título del tip
- `icon`: Emoji (default: 💡)

**Uso:**

```jsx
<ProTip title="Configura alertas inteligentes" icon="📱">

1. Activa notificaciones para gastos importantes
2. Define límites personalizados por categoría
3. Revisa tu dashboard cada domingo

Esto te mantendrá siempre al tanto de tu situación financiera.

</ProTip>
```

---

### 6. QuickStats (Estadísticas Rápidas)

Grid de estadísticas compactas con iconos y tendencias.

**Props:**
- `stats`: Array de objetos con value, label, icon, trend
- `columns`: 2 | 3 | 4

**Uso:**

```jsx
<QuickStats
  stats={[
    { value: "67%", label: "Sin ahorros", icon: "🚨", trend: "down" },
    { value: "45%", label: "Sin $500K", icon: "🚫", trend: "down" },
    { value: "<1 mes", label: "Resistencia sin salario", icon: "⏱" }
  ]}
  columns={3}
/>
```

---

### 7. ProgressBar (Barra de Progreso)

Para mostrar progreso hacia metas.

**Props:**
- `current`: Valor actual
- `total`: Valor objetivo
- `label`: Etiqueta opcional
- `color`: primary | success | warning | info
- `showPercentage`: true | false (default: true)

**Uso:**

```jsx
<ProgressBar 
  current={4500000} 
  total={9000000} 
  label="Progreso hacia meta de emergencias" 
  color="success" 
/>
```

---

### 8. StepByStep (Pasos Secuenciales)

Para tutoriales o procesos paso a paso.

**Props:**
- `steps`: Array de objetos con title, description, icon

**Uso:**

```jsx
<StepByStep
  steps={[
    {
      title: "Calcula tus ingresos",
      description: "Suma salario neto + ingresos extras regulares",
      icon: "💵"
    },
    {
      title: "Analiza gastos",
      description: "Revisa últimos 3 meses en la app",
      icon: "📊"
    },
    {
      title: "Define presupuesto",
      description: "Asigna porcentajes a cada categoría",
      icon: "🎯"
    }
  ]}
/>
```

---

### 9. BeforeAfter (Antes y Después)

Para mostrar transformaciones o comparaciones.

**Props:**
- `before`: Valor inicial
- `after`: Valor final
- `metric`: Nombre de la métrica
- `improvement`: Texto de mejora (opcional)

**Uso:**

```jsx
<BeforeAfter 
  before="$0" 
  after="$5,000,000"
  metric="Fondo de emergencias"
  improvement="+100% en seguridad financiera"
/>
```

---

## 📐 Estructura Recomendada de un Post

### 1. Introducción (H2)
- Plantea el problema o necesidad
- Usa un HighlightBox para el concepto clave

### 2. Conceptos Principales (H2 + H3)
- Divide en secciones lógicas
- Usa Callouts para información importante
- Incluye StatsCards cuando haya números relevantes

### 3. Ejemplos Prácticos (H2)
- ComparisonTable para comparaciones
- QuickStats para datos rápidos
- BeforeAfter para transformaciones

### 4. Paso a Paso (H2)
- StepByStep para procesos
- Callouts para advertencias en cada paso

### 5. Tips Avanzados (H2)
- ProTip para consejos especializados

### 6. Conclusión (H2)
- Resumen de puntos clave
- Call to action
- HighlightBox con mensaje final

---

## 🎨 Guía de Estilo

### ✨ Estilos Automáticos para Markdown

**¡IMPORTANTE!** No necesitas componentes para TODO. El contenido markdown normal ya se ve increíble gracias a los estilos CSS globales:

**Elementos que se estilizan automáticamente:**
- ✅ Listas (ul/ol) - con bullets personalizados o números circulares
- ✅ Párrafos - con espaciado y legibilidad optimizada
- ✅ Títulos H2/H3/H4 - con gradientes y bordes
- ✅ Enlaces - con subrayado animado
- ✅ Negritas - con fondo destacado
- ✅ Código inline - con fondo de color
- ✅ Bloques de código - con sombras y bordes
- ✅ Blockquotes - con borde lateral y gradiente
- ✅ Tablas - con hover y estilos alternados
- ✅ Imágenes - con bordes redondeados y sombras

### Cuándo Usar Componentes vs Markdown Puro

**Usa Componentes para:**
- 📊 Datos numéricos destacados (StatsCard, QuickStats)
- ⚠️ Información crítica o advertencias (Callout)
- 💡 Tips especiales o Pro Tips (ProTip, HighlightBox)
- 📈 Progreso visual (ProgressBar)
- 🔄 Comparaciones antes/después (BeforeAfter)
- 📋 Procesos paso a paso (StepByStep)
- 📑 Tablas complejas con título (ComparisonTable)

**Usa Markdown Puro para:**
- ✍️ Párrafos explicativos normales
- 📝 Listas simples de puntos
- 🔗 Enlaces y referencias
- 📖 Contenido narrativo
- 💬 Citas o blockquotes simples
- 📊 Tablas sencillas de datos
- 🖼️ Imágenes individuales

### Ejemplo de Contenido Balanceado

```markdown
## Sección Normal con Markdown

Esto es un párrafo normal que se verá hermoso automáticamente. No necesitas componente para esto.

### Lista automáticamente estilizada

- Este punto tendrá un bullet bonito
- Este también se verá profesional
- Todo sin necesidad de componentes

**Texto importante** se destaca automáticamente con fondo de color.

<HighlightBox emoji="💡">
**Usa esto solo para conceptos MUY importantes** que necesiten destacarse del resto del contenido.
</HighlightBox>

Continúa con texto normal para mantener el flujo de lectura...
```

### Emojis Recomendados por Tema:

**Dinero/Finanzas:**
💰 💵 💸 💳 💴 💶 💷 🏦 📊 📈 📉 💹

**Ahorro:**
🏠 🐷 💎 🔒 🛡️ 🎯 🏆

**Éxito/Logros:**
✅ ✔️ 🎉 🎊 🏆 ⭐ 🌟 💪 🚀

**Advertencia/Cuidado:**
⚠️ ❌ 🚫 ⛔ 🔴 💀 ⏰ 🔥

**Información:**
💡 📝 📚 📖 🔍 ℹ️ 💭 🤔

**Herramientas:**
📱 💻 🖥️ ⚙️ 🔧 🛠️

### Formato de Números:

**Moneda colombiana:**
```
$3,000,000 COP
$1.5M (para números grandes)
```

**Porcentajes:**
```
50% (sin espacio)
+15% (con signo para aumentos)
-10% (con signo para disminuciones)
```

### Tone of Voice:

- ✅ Cercano pero profesional
- ✅ Usa "tú" para dirigirte al lector
- ✅ Ejemplos con números reales colombianos
- ✅ Llamadas a la acción claras
- ❌ Evita tecnicismos innecesarios
- ❌ No prometas resultados mágicos
- ❌ No uses jerga financiera compleja

---

## 📝 Checklist Pre-Publicación

- [ ] Frontmatter completo con todos los campos
- [ ] Imagen OG con dimensiones correctas (1200x630)
- [ ] Al menos 3 componentes interactivos usados
- [ ] Longitud: mínimo 800 palabras
- [ ] Tiempo de lectura calculado (250 palabras/minuto)
- [ ] Links internos a otros posts relacionados
- [ ] Call to action al final
- [ ] Revisar ortografía y gramática
- [ ] Probar en móvil y desktop
- [ ] Verificar que todos los componentes renderizan bien

---

## 💡 Ideas de Posts Futuros

**Ahorro:**
- "Cómo Ahorrar para la Cuota Inicial de tu Casa"
- "Desafío de Ahorro de 52 Semanas"
- "Apps de Ahorro Automático: ¿Funcionan?"

**Presupuestos:**
- "Presupuesto Familiar: Guía Completa"
- "Cómo Reducir Gastos Hormiga"
- "Presupuesto para Freelancers"

**Inversión:**
- "Primeros Pasos en Inversión (CDTs vs Fondos)"
- "Cómo Empezar a Invertir con Poco Dinero"
- "Diversificación para Principiantes"

**Deudas:**
- "Método Bola de Nieve vs Avalancha"
- "Consolidación de Deudas: ¿Cuándo Tiene Sentido?"
- "Cómo Negociar con el Banco"

---

## 🔗 Enlaces Útiles

- [Componentes de Blog](../src/components/blog/)
- [Guía de Marca](../BRAND_GUIDELINES.md)
- [Configuración de Content](../src/content/config.ts)

---

**Última actualización:** Diciembre 2024
