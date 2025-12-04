![alt text](remote/public/domina-logo-light.webp)

# Domina prueba técnica React - Santiago Rendon Munera

Proyecto de demostración de **Microfrontends** con Vite, implementando una arquitectura de microfrontends con dos aplicaciones independientes: **Host** y **Remote**.

---

## 🏗️ Arquitectura

Este proyecto utiliza **Module Federation** para cargar dinámicamente componentes entre aplicaciones React independientes:

- **Host**: Aplicación principal (shell) que consume el microfrontend remoto
- **Remote**: Microfrontend que expone componentes para ser consumidos por el host

```
┌─────────────────────────────────────┐
│           HOST APP                   │
│   (https://domina-react-test         │
│    .vercel.app)                      │
│                                      │
│   ┌──────────────────────────────┐  │
│   │  Carga dinámicamente        │  │
│   │  componentes del Remote     │  │
│   └──────────────────────────────┘  │
│                 ↓                    │
└─────────────────┼────────────────────┘
                  │
                  │ HTTP Request
                  │
┌─────────────────┼────────────────────┐
│                 ↓                    │
│          REMOTE APP                  │
│   (https://domina-react-remote       │
│    .vercel.app)                      │
│                                      │
│   Expone:                            │
│   • UsersMainPage                    │
│   • Estilos Tailwind                 │
│                                      │
└──────────────────────────────────────┘
```

## 📦 Estructura del Proyecto

```
domina-react-test/
├── host/                    # Aplicación host (shell)
│   ├── src/
│   │   ├── layout/         # Layout principal
│   │   ├── routes/         # Configuración de rutas
│   │   └── App.tsx         # Componente principal
│   ├── vite.config.ts      # Config Vite con Module Federation
│   └── package.json
│
└── remote/                  # Aplicación remote (microfrontend)
    ├── src/
    │   ├── modules/
    │   │   └── users/      # Módulo de usuarios
    │   │       ├── components/
    │   │       │   ├── table/       # Tabla de usuarios
    │   │       │   ├── filters/     # Filtros de búsqueda
    │   │       │   └── pagination/  # Paginación
    │   │       ├── hooks/           # Custom hooks
    │   │       ├── services/        # API calls
    │   │       └── pages/           # Páginas
    │   ├── federation/              # Componentes expuestos
    │   │   └── UsersMainPageWithStyles.tsx
    │   └── __tests__/               # Tests unitarios y e2e
    ├── vite.config.ts               # Config Vite con Module Federation
    ├── vitest.config.ts             # Config Vitest (tests unitarios)
    ├── playwright.config.ts         # Config Playwright (tests e2e)
    └── package.json
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js >= 18
- pnpm >= 8

### Instalación

```bash
# Instalar dependencias del host
cd host
pnpm install

# Instalar dependencias del remote
cd ../remote
pnpm install
```

## 💻 Desarrollo Local

### Opción 1: Levantar ambos proyectos simultáneamente

```bash
# Terminal 1 - Remote
cd remote
pnpm dev
# Se levanta en: http://localhost:5001

# Terminal 2 - Host
cd host
pnpm dev
# Se levanta en: http://localhost:5173
```

**Importante**: El remote debe iniciarse **antes** que el host, ya que el host necesita cargar el `remoteEntry.js` del remote.

## 🧪 Testing

### Remote - Tests Unitarios (Vitest)

```bash
cd remote

# Ejecutar tests
pnpm test:run

```

### Remote - Tests E2E (Playwright)

```bash
cd remote

# Ejecutar tests e2e
pnpm test:e2e

```

## 🏗️ Build

### Remote

```bash
cd remote
pnpm build

# Preview del build
pnpm preview
# Se levanta en: http://localhost:5001
```

### Host

```bash
cd host
pnpm build

# Preview del build
pnpm preview
# Se levanta en: http://localhost:5173
```

## 🚢 Despliegue en Vercel

Este proyecto requiere **dos proyectos separados** en Vercel debido a la arquitectura de Module Federation.
