# Administrador de contenidos — sytem-turims

Esta implementación conserva la arquitectura actual: Next.js (frontend), Express (API), Prisma y PostgreSQL (base de datos).

## Módulos incluidos

- Centros turísticos
- Recetas
- Fiestas
- Historia

El administrador permite crear, editar, eliminar, buscar y publicar u ocultar registros. La API administrativa exige una sesión válida de administrador. Las páginas públicas consultan únicamente los registros publicados.

## Configuración de Cloudinary

1. Crea una cuenta en https://cloudinary.com/.
2. En el Dashboard de Cloudinary copia el Cloud name, API Key y API Secret.
3. En `backend/.env` agrega:

```env
CLOUDINARY_CLOUD_NAME="tu-cloud-name"
CLOUDINARY_API_KEY="tu-api-key"
CLOUDINARY_API_SECRET="tu-api-secret"
```

El API Secret solo debe existir en el backend. No lo agregues al frontend ni lo publiques en GitHub.

## Preparar la base de datos

Desde la raíz del repositorio, ejecuta:

```powershell
cd backend
npm install
npx prisma generate
npm run db:migrate -- --name contenido_admin
npm run seed:content
npm run seed
cd ../frontend
npm install
cd ..
npm install
```

- La migración crea las tablas para los cuatro módulos.
- `seed:content` incorpora los seis lugares turísticos y las nueve recetas que ya estaban en los archivos estáticos. No sobrescribe registros existentes.
- `seed` crea o actualiza la cuenta administradora usando `ADMIN_EMAIL`, `ADMIN_PASSWORD` y `ADMIN_NOMBRE` de `backend/.env`.

Asegúrate de tener `DATABASE_URL` y las variables de sesión configuradas antes de ejecutar estos comandos.

## Ejecutar el proyecto

Desde la raíz:

```powershell
npm install
npm run dev
```

Abre `http://localhost:3000/admin` e inicia sesión con el administrador creado por el seed.

## Endpoints añadidos

### Administrativos (requieren sesión)

- `GET /api/admin/contenido/:tipo`
- `GET /api/admin/contenido/:tipo/:id`
- `POST /api/admin/contenido/:tipo`
- `PATCH /api/admin/contenido/:tipo/:id`
- `DELETE /api/admin/contenido/:tipo/:id`
- `POST /api/admin/cloudinary/signature`

Valores admitidos para `:tipo`: `centros-turisticos`, `recetas`, `fiestas`, `historia`.

### Públicos (solo lectura de registros publicados)

- `GET /api/public/contenido/:tipo`
- `GET /api/public/contenido/recetas/:slug`

## Despliegue

Configura también las variables `DATABASE_URL`, `SESSION_SECRET`, `FRONTEND_URL` y las tres variables de Cloudinary en el entorno del backend. En el frontend configura `BACKEND_URL` apuntando al servicio Express. En producción ejecuta `npm run db:deploy` desde la carpeta `backend` para aplicar migraciones ya generadas.
