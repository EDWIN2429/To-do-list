# To-do-list

Aplicación para gestionar tareas, subtareas, prioridades y notificaciones de vencimiento. El proyecto utiliza una API desarrollada con **Laravel 12** y un frontend con **React y TypeScript**.

Para la entrega de integración continua se configuraron **dos contenedores Docker**: uno para la API de Laravel y otro para la base de datos PostgreSQL. Ambos se comunican a través de una red interna administrada por Docker Compose.

## Tecnologías

| Componente | Tecnología |
| --- | --- |
| Backend | Laravel 12, PHP 8.3 |
| Frontend | React 18, TypeScript |
| Base de datos en Docker | PostgreSQL 16 |
| Contenedores | Docker y Docker Compose |
| Integración continua | GitHub Actions |

> El frontend React se ejecuta localmente durante esta entrega; los dos contenedores son la API Laravel y PostgreSQL. El proyecto también disponía de una configuración local con SQLite, independiente del entorno Docker descrito aquí.

## Estructura del proyecto

```text
To-do-list/
├── .github/
│   └── workflows/
│       └── docker-ci.yml
├── Api/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── ...
├── FrontEnd/
│   └── ...
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

## Requisitos previos

- Git.
- Docker Desktop con Docker Compose habilitado.
- Node.js y npm, **solo si se va a ejecutar el frontend React localmente**.

No es necesario instalar PostgreSQL ni PHP en Windows para levantar los dos contenedores.

## Iniciar los contenedores

Los comandos siguientes se ejecutan desde la raíz del proyecto, en **PowerShell**.

### 1. Clonar el repositorio

```powershell
git clone https://github.com/EDWIN2429/To-do-list.git
cd To-do-list
```

### 2. Configurar las variables de entorno

Crear el archivo privado de configuración a partir del ejemplo:

```powershell
Copy-Item .env.example .env
```

Editar el `.env` de la raíz con los valores correspondientes:

```dotenv
APP_KEY=
DB_DATABASE=todo_db
DB_USERNAME=todo_user
DB_PASSWORD=COLOCA_AQUI_UNA_CONTRASENA_SEGURA
```

Generar una clave de Laravel con la imagen de la aplicación:

```powershell
docker build -t todo-list-api:1.0 ./Api
docker run --rm todo-list-api:1.0 php artisan key:generate --show
```

Copiar la clave generada (que comienza por `base64:`) en `APP_KEY` del archivo `.env` de la raíz.

**Seguridad:** el archivo `.env` contiene datos privados y no debe subirse a GitHub. El repositorio incluye `.env.example` como referencia, sin contraseñas reales.

### 3. Construir e iniciar los servicios

```powershell
docker compose up -d --build
```

Docker Compose inicia los siguientes servicios:

| Servicio | Función | Acceso desde Windows |
| --- | --- | --- |
| `api` | Ejecuta la API Laravel | `http://localhost:8000` |
| `db` | Almacena los datos en PostgreSQL | Puerto `5433` en `127.0.0.1` |

Comprobar que ambos estén activos:

```powershell
docker compose ps
```

### 4. Crear las tablas de la base de datos

Ejecutar las migraciones de Laravel en PostgreSQL:

```powershell
docker compose exec api php artisan migrate --force
```

Consultar su estado:

```powershell
docker compose exec api php artisan migrate:status
```

Las migraciones crean las tablas necesarias para tareas, subtareas, notificaciones y servicios internos de Laravel.

## Comunicación entre contenedores

Los contenedores `api` y `db` pertenecen a una red Docker propia. Laravel se conecta a PostgreSQL utilizando el **nombre del servicio**, no una IP fija ni `localhost`:

```dotenv
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
```

En la configuración de Docker Compose, `depends_on` espera a que PostgreSQL pase su comprobación de disponibilidad antes de iniciar Laravel. Los datos de PostgreSQL se almacenan en un volumen, de modo que se mantienen cuando se recrean los contenedores sin eliminar ese volumen.

### Comprobar la comunicación

Abrir la consola de Laravel:

```powershell
docker compose exec api php artisan tinker
```

Dentro de Tinker, crear una tarea de prueba:

```php
DB::table('tasks')->insertGetId([
    'title' => 'Prueba comunicación Docker',
    'description' => 'Registro creado desde Laravel hacia PostgreSQL',
    'creation_date' => now(),
    'status' => 'Pendiente',
    'priority' => 'Media',
    'created_at' => now(),
    'updated_at' => now()
]);
```

Consultar la tarea desde Laravel:

```php
DB::table('tasks')->where('title', 'Prueba comunicación Docker')->first();
```

Salir de Tinker con `exit`. Para comprobar directamente el dato en PostgreSQL:

```powershell
docker compose exec db psql -U todo_user -d todo_db -c "SELECT id, title, status, priority FROM tasks WHERE title = 'Prueba comunicación Docker';"
```

Si se modificaron los valores `DB_USERNAME` o `DB_DATABASE` en `.env`, sustituirlos también en este comando.

Para inspeccionar la red:

```powershell
docker network inspect listadetareas_todo_network
```

> El nombre completo de la red depende del nombre de proyecto asignado por Docker Compose. Puede consultarse con `docker network ls`.

## Frontend React (ejecución local opcional)

El frontend **no es un tercer contenedor** en esta entrega. Si se desea ejecutar la interfaz web, desde la raíz del repositorio:

```powershell
cd FrontEnd
npm install
```

Configurar `FrontEnd/.env` con la URL de la API:

```dotenv
VITE_API_URL=http://localhost:8000
```

Iniciar el servidor de desarrollo:

```powershell
npm run dev
```

Vite suele mostrar la dirección local de acceso en la terminal (habitualmente `http://localhost:5173`). El funcionamiento integrado de la interfaz debe verificarse por separado.

## Integración continua con GitHub Actions

El archivo `.github/workflows/docker-ci.yml` define un workflow llamado **Docker CI** que se ejecuta en cada `push` o `pull request` hacia `main`.

Este workflow:

1. Descarga el código del repositorio.
2. Construye la imagen Docker de Laravel.
3. Descarga la imagen oficial de PostgreSQL.
4. Muestra las imágenes disponibles para verificar la construcción.

Los resultados pueden consultarse en la pestaña **Actions** del repositorio. El workflow verifica la construcción y descarga de imágenes; **no sustituye una prueba funcional completa** de la comunicación entre servicios.

## Comandos útiles

| Comando | Descripción |
| --- | --- |
| `docker compose up -d --build` | Construye e inicia los servicios |
| `docker compose ps` | Muestra el estado de los contenedores |
| `docker ps` | Lista los contenedores activos |
| `docker compose logs api` | Muestra los registros de Laravel |
| `docker compose logs db` | Muestra los registros de PostgreSQL |
| `docker compose down` | Detiene y elimina los contenedores conservando el volumen |

**Advertencia:** `docker compose down -v` también elimina los volúmenes del proyecto y puede borrar los datos de PostgreSQL. No utilizarlo si se desea conservar la información.

## Repositorio

[GitHub — EDWIN2429/To-do-list](https://github.com/EDWIN2429/To-do-list)
