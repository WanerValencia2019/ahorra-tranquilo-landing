Guía Frontend — Seguridad & Mantenibilidad (Concisa)

# Principios generales

- Mobile first & responsive (Tailwind). MOBILE ES LA PRIORIDAD.
- Accesibilidad (A11y) desde el inicio.
- Código limpio y modular.

Rendimiento
• Code splitting por rutas; lazy + Suspense.

Accesibilidad (A11y)
• Inputs con label, aria-\*, orden de tab correcto.
• Estados de foco visibles; shortcuts básicos donde tenga sentido.
• Contraste de color correcto; textos alternativos en iconos/imagenes.

Estilo & componentes
• Design tokens (tipos, colores, spacing) en Tailwind config.
• Usa shadcn/ui para consistencia (Button, Input, Dialog, Table, Tabs).
• Evita CSS in-line; componentes presentacionales puros y composables.

# Paleta de colores

Principios rápidos
• Confianza y claridad: base neutra (slate/gray) + acento teal/azul.
• Semántica financiera: ingresos = verde, gastos = rojo, transferencias/info = azul/cyan, alertas = ámbar.
• Accesibilidad: contraste ≥ 4.5:1; no usar color solo (añade iconos/labels).

Paleta recomendada (Light)
• Fondo: #F8FAFC (slate-50)
• Texto primario: #0F172A (slate-900)
• Superficie base (cards): #FFFFFF
• Bordes/sutil: #E2E8F0 (slate-200)
• Brand / Primario: #0EA5A4 (teal-500)
• Brand hover: #0F766E (teal-700)

Semántica (Light)
• Ingreso (success): #16A34A (green-600)
• Gasto (danger): #DC2626 (red-600)
• Transfer/Info: #0284C7 (sky-600)
• Ahorros: #059669 (emerald-600)
• Advertencia: #D97706 (amber-600)
• Deshabilitado: #94A3B8 (slate-400)

Paleta recomendada (Dark)
• Fondo: #0B1220 (slate-950 aprox)
• Texto primario: #E2E8F0 (slate-200)
• Superficie base (cards): #111827 (slate-900)
• Bordes/sutil: #334155 (slate-700)
• Brand / Primario: #2DD4BF (teal-400)
• Brand hover: #14B8A6 (teal-500)

Semántica (Dark)
• Ingreso: #22C55E (green-500)
• Gasto: #F87171 (red-400)
• Transfer/Info: #38BDF8 (sky-400)
• Ahorros: #34D399 (emerald-400)
• Advertencia: #F59E0B (amber-500)
• Deshabilitado: #64748B (slate-500)

Uso rápido (reglas)
• Botón primario: fondo teal (500/600), texto blanco; en dark usa teal (400/500).
• Badges: ingreso = verde, gasto = rojo, transferencia = azul; siempre con icono (+/-/↔).
• Gráficas: líneas: ingreso verde, gasto rojo, ahorro/flujo cyan/azul; categorías con escala de teals/azules y “Otros” en gris.
• Alertas: near-limit (ámbar), overspent (rojo).
• Focus/hover: sube saturación/brightness del color base (+10–15%) y añade outline visible.
