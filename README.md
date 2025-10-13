# Permit Management Demo

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completado-success?style=for-the-badge)
![Tests](https://img.shields.io/badge/Tests-Backend-green?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)

Aplicación fullstack para la **gestión digital de permisos de trabajo en alturas**, orientada a seguridad y salud en el trabajo (SST). Incluye autenticación segura, CRUD completo, generación de PDFs, firmas digitales y tests automatizados.

## 🚀 Demo en Vivo

Puedes explorar la aplicación desplegada:

- **Frontend Demo**: [https://permit-management-demo.vercel.app](https://permit-management-demo.vercel.app)
- **Backend API**: Desplegado en Render (conectado al frontend)

**Credenciales de demostración:**

- Email: `demo@example.com`
- Contraseña: `permitDemo2025*`

**Funcionalidades disponibles:**

- ✅ Crear y gestionar permisos de trabajo
- ✅ Descargar permisos en PDF
- ✅ Firmas digitales con canvas
- ✅ Estados de permisos (Pendientes/Completados)
- ✅ CRUD completo de permisos

## 🧪 Cómo probar la demo

1. Inicia sesión con las credenciales proporcionadas
2. Haz clic en "Crear nuevo permiso"
3. Completa el formulario y prueba las firmas digitales
4. Descarga el PDF generado
5. Prueba las acciones: Finalizar, Eliminar

## 📸 Vista Previa

### Dashboard Principal

![Dashboard](./screenshots/dashboard.png)
_Vista principal con tabla de permisos y acciones rápidas_

### Crear Permiso

![Crear Permiso](./screenshots/create_permit.png)
_Formulario para crear nuevo permiso de trabajo en alturas_

### Vista preliminar PDF desktop

![Permiso Preview desktop](./screenshots/pdf_preview_desktop.png)
_Vista previa del permiso con opción de descarga en PDF en desktop_

### Vista preliminar PDF mobile

![PDF Preview mobile](./screenshots/pdf_preview_mobile.png)
_Vista previa del permiso con opción de descarga en PDF en mobile_

### Generación de PDF

![PDF](./screenshots/pdf_file.png)
_PDF descargado_

### Firmas Digitales

![Firmas](./screenshots/signature.png)
_Interfaz para capturar firmas digitales en canvas_

## ✨ Características

- **Autenticación segura:** Implementación JWT con contexto global de React
- **CRUD completo:** Gestión total de permisos de trabajo en alturas
- **Gestión de estados:** Permisos pendientes y completados
- **Firmas digitales:** Captura de firmas usando react-signature-canvas
- **Generación de PDFs:** Creación de documentos con @react-pdf/renderer
- **UI moderna:** TailwindCSS y shadcn/ui componentes reutilizables
- **Tests automatizados:** Tests de integración en backend con Jest + Supertest
- **Scripts útiles:** Generadores de datos dummy y hashes de contraseñas

## 🛠️ Tecnologías Utilizadas

### Frontend

- React con TypeScript
- Vite para compilación rápida
- TailwindCSS + shadcn/ui para UI
- @react-pdf/renderer para generación de PDFs
- react-signature-canvas para firmas digitales

### Backend

- Node.js y Express.js
- PostgreSQL con Neon
- JWT para autenticación
- Boom para manejo de errores estructurado
- Jest + Supertest para testing

### Infraestructura

- Vercel para frontend
- Render para backend
- Neon para base de datos PostgreSQL

## 🏗️ Arquitectura

```
permit-management-demo/
│
├── backend/                   # API REST con Express + PostgreSQL
│   ├── src/
|   |   ├── config/            # Configuración de variables de entorno
│   │   ├── controllers/       # Lógica de negocio
│   │   ├── libs/              # Librerías y configuraciones externas
│   │   ├── services/          # Capa de acceso a datos
│   │   ├── routes/            # Definición de endpoints
│   │   ├── middlewares/       # Auth, error handling
│   │   ├── types/             # Tipos globales
│   │   ├── utils/             # Helpers y utilidades
│   |   └── tests/             # Tests con Jest + Supertest
|   |
│   └── database/              # Schema SQL
│
├── frontend/                  # UI con React + Vite
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── context/           # AuthContext global
│   │   ├── hooks/             # Hooks personalizados
│   │   ├── layouts/           # Layouts reutilizables
│   │   ├── pages/             # Vistas principales
│   │   ├── types/             # Tipos globales
│   │   └── lib/               # Helpers
│   └── public/                # Assets estáticos
│
└── database/                  # Scripts SQL de inicialización
```

### Flujo de una Petición

```
Cliente → Frontend (React) → API Backend (Express) → PostgreSQL
    ↑                                                    ↓
    └──────────────── Response JSON ←─────────────────┘
```

### 📊 Estructura de Carpetas

| Carpeta                      | Responsabilidad                                            |
| ---------------------------- | ---------------------------------------------------------- |
| **backend/src/routes/**      | Define endpoints, métodos HTTP y mapea a controladores     |
| **backend/src/middleware/**  | Autenticación JWT, validación de datos, manejo de errores  |
| **backend/src/controllers/** | Lógica de negocio y coordina servicios                     |
| **backend/src/services/**    | Ejecuta queries SQL y gestiona acceso a PostgreSQL         |
| **backend/src/utils**        | Provee funciones reutilizables para toda la aplicación     |
| **backend/src/config/**      | Configuración de variables de entorno                      |
| **backend/src/libs**         | Centraliza configuraciones y conexiones externas           |
| **backend/src/test**         | Pruebas de la aplicación                                   |
| **backend/src/types**        | Tipos globales del backend                                 |
| **frontend/src/assets/**     | Imágenes, iconos y recursos estáticos                      |
| **frontend/src/components/** | Componentes reutilizables (formularios, modales)           |
| **frontend/src/pages/**      | Vistas principales (Dashboard, Login, creación de permiso) |
| **frontend/src/contexts/**   | Context API para estado global (autenticación)             |
| **frontend/src/hooks/**      | Custom hooks para lógica reutilizable                      |
| **frontend/src/layouts/**    | Layouts comunes para múltiples páginas                     |
| **frontend/src/lib/**        | Funciones auxiliares y helpers                             |
| **frontend/src/types/**      | Tipos globales del frontend                                |

## 📋 Requisitos Previos

- Node.js >= 18
- npm o yarn
- PostgreSQL (local o Neon)

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Mauricio2085/permit-management-demo.git
cd permit-management-demo
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

- Crea un archivo `.env` basándote en `.env.example`:

```bash
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/permit_db
JWT_SECRET=tu_clave_secreta_aqui
CLOUDINARY_API_KEY=your_cloudinary_API_key
CLOUDINARY_API_SECRET=your_cloudinary_secret_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

- Configurar la base de datos:

```bash
# Verifica que Postgresql esté corriendo.
sudo service postgresql status

# Conectarse a PostgreSQL y crear la base de datos
psql -U tu_usuario_postgres

# Dentro de psql, ejecutar:
CREATE DATABASE permit_demo_db

# Ejecutar el script SQL para crear tablas
psql -U tu_usuario_postgres -d permit_demo_db -f ./database/schema.sql
```

- Crea un correo y contraseña para las credenciales de la app:

Ejecuta el script para generar hash de contraseñas:

```sh
npm run hash tu_contraseña_segura
```

La utilidad te dará un hash de tu contraseña (guardalo para más adelante).

- Ejecuta la siguiente consulta en la terminal para guardar el correo y contraseña de inicio de sesión:

```sh
psql -U tu_usuario_postgres -d permit_demo_db -c "INSERT INTO usuarios (name, email, password, role_id)
VALUES ('tu_usuario', 'tu_correo@tu_dominio.com', 'hash_de_tu_contraseña', 1);"
```

Inicia el servidor:

```bash
npm run dev
```

El backend estará en `http://localhost:5000`

### 3. Configurar Frontend

```bash
cd ../frontend
npm install
```

Modifica el archivo `config/api.ts` con tus direcciones de APIs:

```typescript
const getApiUrl = (): string => {
  // ...
  if (env?.VITE_API_URL) {
    return env.VITE_API_URL;
  }

  if (env?.DEV) {
    return "http://localhost:5000/api/v1";
  }

  return "https://tu_backend/api/v1";
};

export const URL_API = getApiUrl();
```

Inicia la app:

```bash
npm run dev
```

El frontend estará en `http://localhost:5173`

## Scripts Disponibles

### Backend

- `npm run dev` - Inicia servidor en modo desarrollo
- `npm run build` - Compila para producción
- `npm run start` - Ejecuta compilado
- `npm run test` - Ejecuta tests con Jest
- `npm run hash contraseña` - Genera hash bcrypt de contraseña
- `npm run permit N` - Crea N permisos dummy de prueba

### Frontend

- `npm run dev` - Inicia Vite en desarrollo
- `npm run build` - Compila para producción
- `npm run preview` - Vista previa del build

## 🧪 Testing

### Backend

Se implementaron tests de integración con Jest + Supertest para los endpoints principales:

- **Autenticación:** Login y validación de tokens
- **Perfil:** Obtención de datos del usuario
- **Permisos:** CRUD completo (crear, listar, actualizar, eliminar)

Ejecutar tests:

```bash
cd backend
npm run test
```

### Frontend

Tests con Jest + React Testing Library están en proceso de implementación.

## 🔒 Seguridad

- Autenticación JWT con tokens de corta duración
- Contraseñas hasheadas con bcrypt
- Variables sensibles en .env
- Validación de inputs en cliente y servidor
- CORS configurado para dominios específicos
- Protección de rutas privadas en frontend

## 📑 Secciones de la Aplicación

### Vistas Privadas (Requieren autenticación JWT)

- **Dashboard:** Panel principal con tablas de permisos pendientes y completados
- **Crear Permiso:** Formulario para nuevo permiso de trabajo
- **Descargar Permiso:** Vista del permiso en formato con previsualización antes de descarga

### Vistas modales

- **Finalizar:** Modal para cerrar un permiso pendiente
- **Eliminar:** Modal para eliminar permisos pendientes
- **Error:** Modal para visualización de errores para el cliente

### Vistas Públicas

- **Login:** Autenticación de usuarios

## 📄 Generación de PDFs

Los permisos pueden descargarse como PDF con:

- Información del permiso (fecha, trabajador, ubicación, etc)
- Firma digital del usuario
- Datos de supervisor/autorización
- Formato profesional lista para impresión

Usa el botón "Descargar" en cualquier permiso para generar el PDF.

## 📡 API Endpoints

### Autenticación

- `POST /api/v1/auth/login` - Iniciar sesión
- `GET /api/v1/profile` - Perfil del usuario autenticado

### Permisos

- `GET /api/v1/work-at-heights/sequence` - Obtener consecutivo de permiso
- `GET /api/v1/work-at-heights/providers` - Obtener contratista de permiso
- `GET /api/v1/work-at-heights/critical-tasks` - Obtener tareas críticas de permiso
- `GET /api/v1/work-at-heights/documents-support` - Obtener documentos soporte de permiso
- `GET /api/v1/work-at-heights/fall-protection-systems` - Obtener elementos de protección contra caída de permiso
- `GET /api/v1/work-at-heights/personal-protection-elements` - Obtener elementos de protección personal de permiso
- `GET /api/v1/work-at-heights/access-systems` - Obtener elementos de acceso de permiso
- `GET /api/v1/work-at-heights/pending-permissions-resume` - Listar todos los permisos resumidos pendientes
- `GET /api/v1/work-at-heights/finished-permissions-resume` - Listar todos los permisos resumidos completados
- `GET /api/v1/work-at-heights/pending-complete-permissions/:permissionId` - Obtener permiso por ID
- `POST /api/v1/work-at-heights/permission` - Crear nuevo permiso
- `PUT /api/v1/work-at-heights/permission` - Actualizar permiso
- `DELETE /api/v1/work-at-heights/permission` - Eliminar permiso

**Nota:** Los endpoints están organizados por recurso. Todos los endpoints de permisos usan el prefijo `/api/v1/work-at-heights/`

## 💡 Sobre este Proyecto

Desarrollé Permit Management Demo para demostrar mis habilidades en:

- Arquitectura de monorepo fullstack
- Generación de documentos complejos (PDFs con firmas)
- TypeScript en proyectos grandes
- Implementación de features específicas del dominio (SST)

Este proyecto simula un caso de uso real en seguridad ocupacional.

## 📚 Aprendizajes Clave

Durante el desarrollo de este proyecto, reforcé mis conocimientos en:

- Arquitectura de monorepo (frontend + backend)
- Generación de documentos PDF con React
- Implementación de firmas digitales con canvas
- Tests de integración en Express con Supertest
- TypeScript en proyectos grandes
- Deploy de aplicaciones fullstack
- Seguridad en aplicaciones web (JWT, contraseñas, validación)
- Gestión de estado global con Context API

## 🔮 Roadmap

### ✅ Completado

- [x] CRUD completo de permisos
- [x] Generación de PDF
- [x] Firmas digitales
- [x] Autenticación JWT
- [x] Tests de integración en backend
- [x] Deploy en Vercel + Render

### 🚧 En desarrollo

- [ ] Tests en frontend con React Testing Library

### 📋 Próximas Mejoras

**Funcionalidades:**

- [ ] Mejora de UI/UX
- [ ] Validaciones avanzadas
- [ ] Exportación a Excel
- [ ] Reportes y estadísticas
- [ ] Sistema de notificaciones
- [ ] Auditoría de cambios

**Técnico:**

- [ ] Internacionalización (i18n)
- [ ] Caché con Redis
- [ ] Paginación en listados

## 🚀 Despliegue

### Frontend (Vercel)

1. Conecta tu repositorio GitHub a Vercel
2. Configura variables de entorno en Vercel dashboard
3. Deploy automático en cada push a main

### Backend (Render)

1. Crea servicio web en Render
2. Conecta repositorio GitHub
3. Configura variables de entorno
4. Deploy automático

### Base de Datos (Neon)

1. Crea proyecto en Neon
2. Copia DATABASE_URL
3. Usa url de conexión en tu .env del backend

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del repositorio

```bash
git clone https://github.com/TU_USUARIO/permit-management-demo.git
cd permit-management-demo
```

2. Crea una rama para tu feature

```bash
git checkout -b feature/nueva-funcionalidad
```

3. Realiza tus cambios y commits

```bash
git commit -m "feat: agregar nueva funcionalidad"
```

4. Push a tu rama

```bash
git push origin feature/nueva-funcionalidad
```

5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

## 👨‍💻 Autor

**Mauricio Ocampo**

- 📎 [LinkedIn](https://www.linkedin.com/in/jose-mauricio-ocampo-marulanda-92380a81)
- 📂 [GitHub](https://github.com/Mauricio2085)
- 📧 Email: maoca2085@gmail.com
- 🌐 Portfolio: [MyWebSite](https://mywebsite-iota-navy.vercel.app/)
