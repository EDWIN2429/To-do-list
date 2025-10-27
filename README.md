# 📝 To-Do List - Sistema de Gestión de Tareas

Una aplicación completa de gestión de tareas desarrollada con **Laravel 12** (backend API REST) y **React + TypeScript** (frontend SPA), que incluye subtareas, sistema de prioridades, alertas de vencimiento en tiempo real y una interfaz moderna con shadcn/ui.

---

## 📑 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
  - [Backend (API Laravel)](#1-backend-api-laravel)
  - [Frontend (React)](#2-frontend-react)
- [Estructura de Ramas Git](#-estructura-de-ramas-git)
- [Configuración del Repositorio en GitHub](#-configuración-del-repositorio-en-github)
- [Uso de la Aplicación](#-uso-de-la-aplicación)
- [API Endpoints](#-api-endpoints)
- [Componentes Principales](#️-componentes-principales)
- [Sistema de Alertas](#-sistema-de-alertas)
- [Variables de Entorno](#-variables-de-entorno)
- [Scripts Disponibles](#-scripts-disponibles)
- [Despliegue](#-despliegue)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## ✨ Características

### Funcionalidades Principales

- **Dashboard Interactivo**: Tabla con todas las tareas, búsqueda, filtrado y paginación.
- **CRUD Completo de Tareas**: Crear, leer, actualizar y eliminar tareas.
- **Gestión de Subtareas**: Agregar subtareas a cada tarea y marcarlas como completadas.
- **Estados Automáticos**: El estado de la tarea cambia automáticamente a "completado" cuando todas sus subtareas están terminadas.
- **Sistema de Prioridades**: Clasificación en Alta, Media y Baja con indicadores visuales.
- **Alertas de Vencimiento**: Notificaciones en tiempo real para tareas vencidas y próximas a vencer.
- **Drawer de Notificaciones**: Panel lateral con contador en la campanita del header.
- **Interfaz Moderna**: UI construida con shadcn/ui + Tailwind CSS.
- **Responsive Design**: Adaptado para desktop, tablet y móvil.

### Características Técnicas

- **API REST**: Endpoints bien estructurados con validación y manejo de errores.
- **Zona Horaria**: Configurada para Colombia (America/Bogota).
- **Migraciones**: Base de datos versionada.
- **TypeScript**: Tipado fuerte en el frontend.
- **Axios Interceptors**: Manejo centralizado de errores HTTP.

---

## 🛠️ Stack Tecnológico

### Backend (API)

| Tecnología       | Versión | Descripción                       |
| ---------------- | ------- | --------------------------------- |
| **Laravel**      | 12.x    | Framework PHP para API REST       |
| **PHP**          | 8.2+    | Lenguaje de programación          |
| **SQLite**       | 3.x     | Base de datos ligera (desarrollo) |
| **Eloquent ORM** | -       | ORM de Laravel                    |
| **Carbon**       | -       | Manipulación de fechas y horas    |

### Frontend (SPA)

| Tecnología       | Versión | Descripción                         |
| ---------------- | ------- | ----------------------------------- |
| **React**        | 18.x    | Biblioteca de interfaces de usuario |
| **TypeScript**   | 5.x     | Superset tipado de JavaScript       |
| **Vite**         | 5.x     | Empaquetador ultrarrápido           |
| **React Router** | 6.x     | Enrutamiento del lado del cliente   |
| **Axios**        | 1.x     | Cliente HTTP para consumo de API    |
| **shadcn/ui**    | -       | Componentes UI con Radix UI         |
| **Tailwind CSS** | 3.x     | Framework CSS utilitario            |
| **Lucide React** | -       | Iconos SVG                          |


## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** ≥ 18.x ([descargar](https://nodejs.org/))
- **npm** ≥ 9.x (incluido con Node.js)
- **PHP** ≥ 8.2 ([descargar](https://www.php.net/downloads))
- **Composer** ≥ 2.x ([descargar](https://getcomposer.org/download/))
- **Git** ([descargar](https://git-scm.com/downloads))
- **SQLite** (incluido con PHP en Windows)

---

## 🚀 Instalación y Configuración

### 1) Backend (API Laravel)

#### 1.1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/To-Do-List.git
cd To-Do-List/Api
```

#### 1.2. Instalar dependencias de PHP

```bash
composer install
```

#### 1.3. Configurar el archivo `.env`

Copia el archivo de ejemplo y edita las variables:

```bash
copy .env.example .env
```

Edita `Api/.env`:

```env
APP_NAME="To-Do List API"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_TIMEZONE=America/Bogota
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
# DB_DATABASE se genera automáticamente con el siguiente comando

VITE_APP_NAME="${APP_NAME}"
```

#### 1.4. Generar clave de la aplicación

```bash
php artisan key:generate
```

#### 1.5. Crear la base de datos SQLite

```bash
touch database/database.sqlite
```

_En Windows (PowerShell):_

```powershell
New-Item database/database.sqlite -ItemType File
```

#### 1.6. Ejecutar las migraciones

```bash
php artisan migrate
```

#### 1.7. Limpiar cachés de configuración

```bash
php artisan config:clear
php artisan optimize:clear
```

#### 1.8. Iniciar el servidor de desarrollo

```bash
php artisan serve
```

El backend estará disponible en: **http://localhost:8000**

---

### 2) Frontend (React)

#### 2.1. Navegar a la carpeta del frontend

```bash
cd ../FrontEnd
```

#### 2.2. Instalar dependencias de Node.js

```bash
npm install
```

#### 2.3. Configurar el archivo `.env`

Crea `FrontEnd/.env` con:

```env
VITE_API_URL=http://localhost:8000
```

#### 2.4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

El frontend estará disponible en: **http://localhost:5173**

---

## 🌿 Estructura de Ramas Git

El proyecto sigue una estrategia de branching para organizar el desarrollo:

```
main                          # Rama principal (producción estable)
├── feat/frontend-scaffolding # Configuración inicial del frontend (React + Vite + shadcn/ui)
└── feature/implementación-Api # Desarrollo del backend (Laravel + API REST + Alertas)
```

### Descripción de Ramas

| Rama                         | Descripción                                                               |
| ---------------------------- | ------------------------------------------------------------------------- |
| `main`                       | Código estable listo para producción. Solo se fusionan ramas completadas. |
| `feat/frontend-scaffolding`  | Configuración inicial del frontend: React, TypeScript, Vite, shadcn/ui.   |
| `feature/implementación-Api` | Desarrollo del backend: modelos, migraciones, controladores, alertas.     |

### Flujo de Trabajo Git

1. **Crear una nueva rama** desde `main` para cada feature:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/nombre-de-la-feature
   ```

2. **Desarrollar y hacer commits**:

   ```bash
   git add .
   git commit -m "feat: descripción del cambio"
   ```

3. **Push a GitHub**:

   ```bash
   git push origin feature/nombre-de-la-feature
   ```

4. **Crear un Pull Request** en GitHub para fusionar a `main`.


## 📖 Uso de la Aplicación

### 1. Dashboard (Página Principal)

- **URL**: `http://localhost:5173/`
- **Funcionalidades**:
  - Ver todas las tareas en una tabla.
  - Buscar tareas por título.
  - Navegar entre páginas (paginación).
  - Botón "Crear Tarea" → redirige a `/create`.
  - Botón "Ver" en cada fila → redirige a `/task/:id`.
  - Botón "Eliminar" → elimina la tarea con confirmación.

### 2. Crear Tarea

- **URL**: `http://localhost:5173/create`
- **Funcionalidades**:
  - Formulario con campos:
    - Título (requerido)
    - Descripción
    - Prioridad (alta | media | baja)
    - Fecha de vencimiento (datetime-local)
    - Subtareas (agregar/eliminar dinámicamente)
  - Botón "Guardar" → envía POST a `/api/tasks` y redirige al Dashboard.

### 3. Detalle de Tarea

- **URL**: `http://localhost:5173/task/:id`
- **Funcionalidades**:
  - Muestra toda la información de la tarea.
  - Lista de subtareas con checkboxes para marcar como completadas.
  - Botón "Marcar como Completado" (solo si todas las subtareas están completas).
  - Botón "Editar" → abre formulario de edición.
  - Botón "Eliminar" → elimina y redirige al Dashboard.

### 4. Sistema de Alertas (Drawer)

- **Ubicación**: Campanita (🔔) en el header.
- **Funcionalidades**:
  - **Badge rojo** con el número total de alertas (vencidas + próximas).
  - Al hacer clic, se abre un **Drawer lateral** con:
    - **Sección "Vencidas"**: tareas con `due_date` < fecha actual.
    - **Sección "Próximas a vencer"**: tareas con `due_date` entre hoy y +2 días.
  - **Actualización automática**: Cada 60 segundos sin necesidad de abrir el drawer.


## 🎯 FUNCIONALIDADES ESENCIALES POR DÍA

### Día 1: Backend MVP

- ✅ CRUD completo de tareas
- ✅ CRUD completo de subtareas
- ✅ Cambio automático de estado
- ✅ API de alertas básica

### Día 2: Frontend MVP

- ✅ Dashboard con tabla
- ✅ Formulario de creación
- ✅ Vista de detalle
- ✅ Sistema de alertas básico

### Día 3: Integración MVP

- ✅ Navegación completa
- ✅ Filtros básicos
- ✅ UX mejorada
- ✅ Testing manual

## 📱 ESTRUCTURA FINAL DE COMPONENTES


## 🎨 COMPONENTES SHADCN/UI PARA ACELERAR DESARROLLO

### Componentes Principales a Usar

#### Botones

```jsx
import { Button } from "@/components/ui/button"

// Botón principal
<Button>Crear Tarea</Button>

// Botón con variantes
<Button variant="destructive">Eliminar</Button>
<Button variant="outline">Cancelar</Button>
<Button variant="secondary">Completado</Button>
```

#### Cards para Tareas

```jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Título de la Tarea</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Descripción de la tarea...</p>
  </CardContent>
</Card>;
```

#### Tabla de Tareas

```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Tarea</TableHead>
      <TableHead>Estado</TableHead>
      <TableHead>Prioridad</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>{/* Filas de tareas */}</TableBody>
</Table>;
```

#### Formularios

```jsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Label htmlFor="title">Título</Label>
<Input id="title" placeholder="Título de la tarea" />

<Label htmlFor="description">Descripción</Label>
<Textarea id="description" placeholder="Descripción..." />

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Seleccionar prioridad" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="alta">Alta</SelectItem>
    <SelectItem value="media">Media</SelectItem>
    <SelectItem value="baja">Baja</SelectItem>
  </SelectContent>
</Select>
```

#### Badges para Estados

```jsx
import { Badge } from "@/components/ui/badge"

<Badge variant="default">Pendiente</Badge>
<Badge variant="secondary">En Proceso</Badge>
<Badge variant="destructive">Completado</Badge>
```

#### Sheet para Alertas

```jsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Ver Alertas</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Alertas de Vencimiento</SheetTitle>
      <SheetDescription>
        Tareas próximas a vencer o ya vencidas
      </SheetDescription>
    </SheetHeader>
    {/* Contenido de alertas */}
  </SheetContent>
</Sheet>;
```

### Colores por Estado (shadcn/ui)

- **Pendiente**: `default` (azul)
- **En Proceso**: `secondary` (gris)
- **Completado**: `destructive` (verde)
- **Cancelado**: `outline` (borde)

### Colores por Prioridad

- **Alta**: `destructive` (rojo)
- **Media**: `secondary` (naranja)
- **Baja**: `default` (verde)

## 🛣️ CONFIGURACIÓN DE REACT ROUTER

### Estructura de Rutas

```jsx
// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import TaskDetail from "./pages/TaskDetail";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}
```

### Navegación entre Vistas

```jsx
import { useNavigate } from "react-router-dom";

// En Dashboard.jsx
const navigate = useNavigate();

const handleCreateTask = () => {
  navigate("/create");
};

const handleViewTask = (taskId) => {
  navigate(`/task/${taskId}`);
};

// En CreateTask.jsx
const handleCancel = () => {
  navigate("/");
};

// En TaskDetail.jsx
const handleBack = () => {
  navigate("/");
};
```

### Componente Layout con Navegación

```jsx
// Layout.jsx
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-gray-900">
              ToDo List Avanzado
            </Link>
            <div className="flex space-x-4">
              <Link to="/">
                <Button
                  variant={location.pathname === "/" ? "default" : "ghost"}
                >
                  Dashboard
                </Button>
              </Link>
              <Link to="/create">
                <Button>Crear Tarea</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
```

## 🚀 CHECKLIST FINAL (Día 3)

### Funcionalidades Core ✅

- [ ] Crear tarea con subtareas
- [ ] Ver lista de tareas en tabla
- [ ] Marcar subtareas como completadas
- [ ] Cambio automático de estado de tarea
- [ ] Completar tarea cuando todas las subtareas están listas
- [ ] Alertas para tareas próximas a vencer
- [ ] Filtros básicos (estado, prioridad)
- [ ] Navegación entre vistas

### UX Básica ✅

- [ ] Interfaz responsive
- [ ] Indicadores visuales de estado
- [ ] Mensajes de confirmación
- [ ] Loading states básicos
- [ ] Manejo de errores

### Técnico ✅

- [ ] API REST funcional
- [ ] Base de datos con relaciones
- [ ] Frontend React con routing
- [ ] Build de producción funcionando

## 🎯 RESULTADO FINAL

Al final de los 3 días tendrás:

✅ **Aplicación completamente funcional** con todas las características solicitadas
✅ **Backend Laravel robusto** con API REST
✅ **Frontend React moderno** con navegación
✅ **Base de datos bien estructurada** con relaciones
✅ **Sistema de alertas operativo**
✅ **Interfaz de usuario profesional**

**¡Listo para usar y demostrar!** 🚀

---

**Desarrollado con ❤️ en 72 horas usando Laravel 12 y React**

_Plan intensivo diseñado para máxima productividad en tiempo mínimo._
