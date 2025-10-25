# 🚀 Aplicación de Gestión de Tareas Avanzada (ToDo List) - PLAN INTENSIVO 3 DÍAS

Una aplicación completa de gestión de tareas desarrollada con Laravel 12 y React, que incluye subtareas, seguimiento de estado detallado, priorización, alertas de vencimiento y una interfaz de usuario moderna.

## ⚡ PLAN INTENSIVO - 3 DÍAS

### 🎯 Objetivo: MVP Funcional Completo en 72 Horas

## 📋 Características Principales (MVP)

- **Dashboard Interactivo**: Tabla con todas las tareas, filtrado básico
- **Gestión de Subtareas**: Creación y seguimiento de subtareas
- **Estados Automáticos**: Cambio automático de estado basado en progreso
- **Sistema de Prioridades**: Alta, Media, Baja
- **Alertas Básicas**: Notificaciones para tareas próximas a vencer
- **Interfaz Funcional**: UI básica pero completa

## 🛠️ Stack Tecnológico

### Backend

- **Laravel 12** - Framework PHP
- **SQLite** - Base de datos (rápida configuración)
- **Eloquent ORM** - Mapeo objeto-relacional
- **API REST** - Endpoints esenciales

### Frontend

- **React** - Biblioteca de interfaz de usuario
- **React Router** - Navegación y routing
- **shadcn/ui** - Componentes UI pre-construidos
- **Tailwind CSS** - Framework de estilos (ya configurado)
- **Vite** - Herramienta de construcción
- **Axios** - Cliente HTTP

## 📊 Estructura de Base de Datos Simplificada

### Tabla: tasks

```sql
- id (bigint, primary key)
- title (string, required)
- description (text, nullable)
- due_date (datetime, nullable)
- priority (enum: 'alta', 'media', 'baja', default: 'media')
- status (enum: 'pendiente', 'en_proceso', 'completado', default: 'pendiente')
- created_at (timestamp)
- updated_at (timestamp)
```

### Tabla: subtasks

```sql
- id (bigint, primary key)
- task_id (bigint, foreign key)
- title (string, required)
- is_completed (boolean, default: false)
- created_at (timestamp)
- updated_at (timestamp)
```

## 🚀 PLAN INTENSIVO - 3 DÍAS

### 📅 DÍA 1: BACKEND COMPLETO (8-10 horas)

#### 🌅 Mañana (4-5 horas)

**Objetivo: Base de datos y modelos funcionando**

- [ ] **Crear migraciones** (30 min)

  ```bash
  php artisan make:migration create_tasks_table
  php artisan make:migration create_subtasks_table
  ```

- [ ] **Ejecutar migraciones** (15 min)

  ```bash
  php artisan migrate
  ```

- [ ] **Crear modelos** (45 min)

  ```bash
  php artisan make:model Task
  php artisan make:model Subtask
  ```

- [ ] **Configurar relaciones** (30 min)

  - Task hasMany Subtasks
  - Subtask belongsTo Task

- [ ] **Crear controladores API** (60 min)

  ```bash
  php artisan make:controller Api/TaskController --api
  php artisan make:controller Api/SubtaskController --api
  ```

- [ ] **Implementar métodos CRUD básicos** (90 min)
  - TaskController: index, store, show, update, destroy
  - SubtaskController: store, update, destroy

#### 🌆 Tarde (4-5 horas)

**Objetivo: API funcional con lógica de negocio**

- [ ] **Definir rutas API** (30 min)

  ```php
  Route::apiResource('tasks', TaskController::class);
  Route::apiResource('subtasks', SubtaskController::class);
  ```

- [ ] **Implementar validación** (60 min)

  - Request classes para validación
  - Reglas de validación para tasks y subtasks

- [ ] **Lógica de cambio de estado** (90 min)

  - Observer o método en modelo Task
  - Cambio automático a "en_proceso" cuando hay subtareas completadas
  - Cambio a "completado" cuando todas las subtareas están completas

- [ ] **Sistema de alertas básico** (60 min)

  - Método para obtener tareas próximas a vencer
  - Endpoint para alertas

- [ ] **Testing básico** (30 min)
  - Probar endpoints con Postman/Insomnia

### 📅 DÍA 2: FRONTEND REACT (8-10 horas)

#### 🌅 Mañana (4-5 horas)

**Objetivo: Estructura base y componentes principales**

- [ ] **Configurar React Router** (30 min)

  ```bash
  npm install react-router-dom
  ```

- [ ] **Crear estructura de componentes** (60 min)

  ```
  src/
  ├── components/
  │   ├── Layout/
  │   ├── TaskTable/
  │   ├── CreateTaskForm/
  │   ├── TaskDetail/
  │   └── AlertDrawer/
  ├── pages/
  │   ├── Dashboard.jsx
  │   ├── CreateTask.jsx
  │   └── TaskDetail.jsx
  └── App.jsx
  ```

- [ ] **Configurar Axios** (30 min)

  - Base URL para API
  - Interceptors para manejo de errores

- [ ] **Crear Layout principal** (90 min)

  - Header con navegación
  - Sidebar para alertas
  - Estructura base responsive

- [ ] **Implementar Dashboard** (90 min)
  - Tabla básica de tareas
  - Botón "Crear Tarea"
  - Navegación a otras vistas

#### 🌆 Tarde (4-5 horas)

**Objetivo: Funcionalidades principales**

- [ ] **Formulario de creación** (120 min)

  - Campos principales de tarea
  - Gestión dinámica de subtareas
  - Validación básica
  - Envío a API

- [ ] **Vista de detalle** (120 min)

  - Mostrar información completa
  - Lista de subtareas con checkboxes
  - Botón "Completado" condicional
  - Actualización de estado

- [ ] **Sistema de alertas** (60 min)
  - Indicador en header
  - Drawer lateral básico
  - Cards de tareas con alerta

### 📅 DÍA 3: INTEGRACIÓN Y PULIMIENTO (8-10 horas)

#### 🌅 Mañana (4-5 horas)

**Objetivo: Integración completa y funcionalidades avanzadas**

- [ ] **Integrar todas las vistas** (90 min)

  - Navegación entre componentes
  - Estado compartido
  - Actualización en tiempo real

- [ ] **Implementar filtros** (90 min)

  - Filtro por estado
  - Filtro por prioridad
  - Búsqueda por texto

- [ ] **Paginación básica** (60 min)

  - Componente de paginación
  - Integración con API

- [ ] **Mejoras de UX** (60 min)
  - Loading states
  - Mensajes de confirmación
  - Manejo de errores

#### 🌆 Tarde (4-5 horas)

**Objetivo: Pulimiento y testing**

- [ ] **Estilos y responsividad** (120 min)

  - Mejorar diseño con Tailwind
  - Responsive design
  - Indicadores visuales de estado

- [ ] **Testing manual completo** (90 min)

  - Flujo completo de usuario
  - Casos edge
  - Corrección de bugs

- [ ] **Optimizaciones finales** (60 min)

  - Performance básica
  - Código limpio
  - Documentación mínima

- [ ] **Deploy básico** (30 min)
  - Configuración para producción
  - Build final

## ⚡ COMANDOS RÁPIDOS DE CONFIGURACIÓN

### Día 1 - Backend Setup

```bash
# Crear migraciones
php artisan make:migration create_tasks_table
php artisan make:migration create_subtasks_table

# Crear modelos
php artisan make:model Task
php artisan make:model Subtask

# Crear controladores
php artisan make:controller Api/TaskController --api
php artisan make:controller Api/SubtaskController --api

# Ejecutar migraciones
php artisan migrate

# Iniciar servidor
php artisan serve
```

### Día 2 - Frontend Setup

```bash
# Instalar dependencias
npm install react-router-dom axios
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge

# Configurar shadcn/ui
npx shadcn@latest init

# Instalar componentes shadcn/ui necesarios
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add checkbox
npx shadcn@latest add badge
npx shadcn@latest add sheet
npx shadcn@latest add table
npx shadcn@latest add pagination

# Crear estructura de carpetas
mkdir -p resources/js/components/{Layout,TaskTable,CreateTaskForm,TaskDetail,AlertDrawer}
mkdir -p resources/js/pages

# Desarrollo
npm run dev
```

### Día 3 - Build Final

```bash
# Build para producción
npm run build

# Optimizar Laravel
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
```

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

## 🚨 ESTRATEGIAS DE ACELERACIÓN

### 1. Priorización Estricta

- **MUST HAVE**: CRUD básico, cambio de estado, alertas
- **NICE TO HAVE**: Paginación avanzada, animaciones, tests automatizados
- **SKIP**: Autenticación, roles, notificaciones push

### 2. Código Mínimo Viable

- Validación básica (sin Request classes complejas)
- Estilos mínimos pero funcionales
- Sin tests automatizados (testing manual)
- Sin optimizaciones avanzadas

### 3. Herramientas de Desarrollo

- **Postman/Insomnia**: Para testing de API
- **React DevTools**: Para debugging
- **Laravel Debugbar**: Para optimización de queries
- **Tailwind IntelliSense**: Para desarrollo rápido

### 4. Flujo de Trabajo Intensivo

- **Pomodoro**: 25 min trabajo, 5 min descanso
- **Sin distracciones**: Notificaciones desactivadas
- **Commits frecuentes**: Cada funcionalidad completa
- **Testing continuo**: Probar cada cambio inmediatamente

## 📱 ESTRUCTURA FINAL DE COMPONENTES

```
resources/js/
├── components/
│   ├── ui/                    # Componentes shadcn/ui
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── label.jsx
│   │   ├── textarea.jsx
│   │   ├── select.jsx
│   │   ├── checkbox.jsx
│   │   ├── badge.jsx
│   │   ├── sheet.jsx
│   │   ├── table.jsx
│   │   └── pagination.jsx
│   ├── Layout/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── Layout.jsx
│   ├── TaskTable/
│   │   ├── TaskTable.jsx
│   │   ├── TaskRow.jsx
│   │   └── TaskFilters.jsx
│   ├── CreateTaskForm/
│   │   ├── CreateTaskForm.jsx
│   │   └── SubtaskInput.jsx
│   ├── TaskDetail/
│   │   ├── TaskDetail.jsx
│   │   └── SubtaskList.jsx
│   └── AlertDrawer/
│       ├── AlertDrawer.jsx
│       └── AlertCard.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── CreateTask.jsx
│   └── TaskDetail.jsx
├── services/
│   └── api.js
├── lib/
│   └── utils.js              # Utilidades de shadcn/ui
└── App.jsx
```

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
