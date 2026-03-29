# VertiCollage

Una aplicación web para crear collages verticales a partir de múltiples imágenes. Construida con Next.js y React, procesa todo en el navegador usando la API de Canvas — no requiere backend.

## Características

- **Subir imágenes** - Arrastra y suelta o haz clic para seleccionar múltiples imágenes
- **Reordenar** - Mueve las imágenes hacia arriba o abajo para cambiar su posición
- **Configuración flexible** - Ajusta el ancho del collage y el espacio entre imágenes
- **Múltiples formatos** - Exporta en PNG, JPG o WebP
- **Tema claro/oscuro** - Cambio de tema automático según tu preferencia

## Tecnologías

- [Next.js 16](https://nextjs.org) — Framework de React con App Router
- [React 19](https://react.dev) — Biblioteca de UI
- [TypeScript](https://www.typescriptlang.org) — Tipado estático
- [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules) — Estilos por componente
- [Lucide React](https://lucide.dev) — Iconos

## Requisitos

- Node.js 18+
- pnpm (o npm/yarn/bun)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/orlandotellez/verticollage
cd verticollage

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia el servidor de desarrollo |
| `pnpm build` | Crea la build de producción |
| `pnpm start` | Inicia el servidor de producción |
| `pnpm lint` | Ejecuta ESLint |

## Estructura del Proyecto

```
src/
├── components/
│   ├── index/              # Componentes principales
│   │   ├── ImageUploader   # Carga de imágenes
│   │   ├── ImagePreview    # Vista previa y reordenado
│   │   ├── CollageConfig   # Configuración del collage
│   │   └── FormatSelector  # Selección de formato
│   └── common/             # Componentes compartidos
│       └── IconTheme       # Botón de cambio de tema
├── context/
│   └── ThemeContext        # Contexto de tema claro/oscuro
├── providers/
│   └── Providers           # Proveedores de la aplicación
├── utils/
│   └── imageProcessor      # Procesamiento de imágenes con Canvas
├── types/
│   └── index.d.ts          # Tipos de TypeScript
└── assets/
    └── svgs                # Assets estáticos
```

## Cómo Contribuir

1. **Haz un fork** del repositorio
2. Crea una rama nueva: `git checkout -b tu-rama`
3. Haz tus cambios y commitea: `git commit -m 'Tu mensaje'`
4. Push a tu rama: `git push origin tu-rama`
5. Abre un Pull Request

### Guías de estilo

- Usamos ESLint para mantener consistencia de código
- TypeScript estricto habilitado
- CSS Modules para estilos (sin Tailwind en componentes)
- Nombres de componentes en PascalCase
- Archivos de estilos en `*.module.css`

## Licencia

MIT License — libre para usar y modificar.

---

¿Encontraste un bug? ¿Tenés una idea? Abrí un [issue](https://github.com/orlandotellez/verticollage/issues) y lo vemos.
