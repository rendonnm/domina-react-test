# Domina React Test

Prueba técnica para **Domina ENTREGA TOTAL** - Aplicación de gestión de usuarios con React, TypeScript y TanStack Query.

## Tecnologías Utilizadas

- **React 19**
- **TypeScript**
- **Vite**
- **TailwindCSS**
- **TanStack Query**
- **React Router**
- **ESLint**

## Arquitectura

El proyecto sigue una arquitectura basada en funcionalidades (feature-based):

```
src/
├── modules/
│   └── users/
│       ├── components/
│       │   ├── filters/
│       │   ├── pagination/
│       │   └── table/
│       ├── constants/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       └── types/
├── layout/
└── routes/
```

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/rendonnm/domina-react-test.git
cd domina-react-test
```

2. Instalar dependencias:

```bash
npm install
```

## Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm dev

# Compilar para producción
npm build
```

## API

La aplicación consume datos de [DummyJSON](https://dummyjson.com/users).
