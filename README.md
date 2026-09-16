# Sistema Analítico de Asistencia Estudiantil (SAAE)

Aplicación full stack con Angular en el frontend y NestJS en el backend.

## Estructura

- `frontend/`: aplicación Angular.
- `backend/`: API NestJS.
- `n8n/`: flujos y automatizaciones.

## Ejecutar el frontend

```bash
cd frontend
npm install
npm start
```

Disponible en `http://localhost:4200/`.

## Ejecutar el backend

```bash
cd backend
npm install
npm run start:dev
```



El Sistema Analítico de Asistencia Estudiantil (SAAE) es una plataforma web orientada al monitoreo, control y análisis de la asistencia académica.

El sistema permite gestionar información académica mediante diferentes módulos dirigidos a docentes y estudiantes, proporcionando herramientas para:

Registro y control de asistencia.
Seguimiento académico.
Visualización de indicadores.
Gestión de justificaciones.
Reportes analíticos.
Monitoreo de estudiantes en riesgo académico.

El objetivo principal del sistema es transformar los registros tradicionales de asistencia en información útil para la toma de decisiones mediante análisis de datos.

🛠️ Tecnologías utilizadas
Frontend

El frontend fue desarrollado utilizando:

Angular 21
TypeScript
HTML5
SCSS
Angular Standalone Components
Reactive Forms
HttpClient para consumo de APIs
Backend

El backend será integrado mediante servicios REST desarrollados por el equipo encargado del servidor.

Actualmente el frontend se encuentra preparado para consumir endpoints mediante servicios Angular.

Base de datos

El sistema está diseñado para trabajar con una base de datos relacional.

📂 Arquitectura del Proyecto

El proyecto utiliza una arquitectura basada en módulos y separación de responsabilidades.

src
│
└── app
    │
    ├── core
    │   └── services
    │
    ├── features
    │
    ├── layouts
    │
    ├── shared
    │
    └── app.routes.ts
📁 Estructura principal
Core

Contiene servicios globales utilizados para comunicación con el backend.

core
│
└── services
    │
    ├── analitica.ts
    ├── auth.ts
    ├── estudiante.ts
    └── revision-justificaciones.ts
🔐 Módulo de Autenticación
Login

Ruta:

/login

Funcionalidades implementadas:

Formulario reactivo.
Validación de correo institucional.
Validación de contraseña.
Mostrar y ocultar contraseña.
Modal de recuperación de contraseña.
Preparación para conexión con API.

Archivo principal:

features/auth/pages/login

Componentes:

login.html
login.scss
login.ts

El servicio utilizado:

Auth Service

Permite realizar:

login(datos)

mediante petición:

POST /api/auth/login
📝 Registro de usuarios

Ruta:

/register

Funcionalidades implementadas:

Registro de nuevos usuarios.
Validación de campos obligatorios.
Confirmación de contraseña.
Evaluación de seguridad de contraseña.
Indicador de nivel:
Débil
Media
Buena
Fuerte

Archivos:

features/auth/pages/register
👨‍🏫 Módulo Docente
Dashboard Docente

Ruta:

/docente/dashboard

Funcionalidad:

Panel general de analítica docente.

Incluye:

Indicador de asistencia global.
Estudiantes en riesgo.
Justificaciones pendientes.
Gráficos estadísticos.
Alertas críticas.
Filtros por carrera y paralelo.

Componentes:

dashboard-docente

Servicio utilizado:

AnaliticaService

Endpoint preparado:

GET /api/analitica

Parámetros enviados:

{
 "carrera":"",
 "paralelo":""
}
📚 Gestión Académica
Gestión de Materias

Ruta:

/docente/gestion-materias

Funcionalidades:

Visualización de asignaturas.
Gestión de materias registradas.
Preparado para conexión con backend.
Gestión de Carreras y Cursos

Ruta:

/docente/gestion-carreras

Funcionalidades:

Administración de carreras.
Gestión de cursos académicos.
📋 Control y Registro de Asistencia

Ruta:

/docente/control-asistencia

Estado:

✅ Conectado con backend.

Permite:

Registro de asistencia.
Consulta de estudiantes.
Gestión del estado de asistencia.
📄 Revisión de Justificaciones

Ruta:

/docente/revision-justificaciones

Funcionalidades:

Visualización de solicitudes.
Estados:
Pendiente
Aprobada
Rechazada
Aprobación de solicitudes.
Rechazo de solicitudes.

Servicio preparado:

RevisionJustificacionesService

Endpoint preparado:

GET /api/justificaciones
👨‍🎓 Módulo Estudiante
Dashboard Estudiante

Ruta:

/estudiante/dashboard

Funcionalidades:

Información del estudiante.
Porcentaje general de asistencia.
Materias activas.
Alertas académicas.
Estado de asistencia por asignatura.

Servicio preparado:

DashboardEstudianteService
Historial de Asistencia

Ruta:

/estudiante/historial-asistencia

Funcionalidad:

Consulta histórica de asistencia del estudiante.

Estado:

✅ Preparado para backend.

Solicitud de Justificación

Ruta:

/estudiante/solicitar-justificacion

Permite:

Crear solicitudes.
Registrar motivo.
Adjuntar evidencia.
Mis Cursos

Ruta:

/estudiante/mis-cursos

Permite:

Visualizar cursos inscritos.
Información académica del estudiante.
📊 Reportes y Analítica

Ruta:

/reportes

Incluye:

Indicadores académicos.
Visualización de información.
Reportes generales.
🏢 Información Institucional

Ruta:

/nosotros

Incluye:

Información del sistema.
Descripción institucional.
🎨 Diseño UI/UX

El sistema utiliza un diseño moderno basado en:

Glassmorphism.
Gradientes.
Tarjetas estadísticas.
Diseño responsive.
Componentes reutilizables.

Características visuales:

Sidebar administrativo.
Dashboard con KPI.
Tablas modernas.
Estados mediante badges.
Tarjetas con sombras suaves.
🔗 Servicios Angular implementados
Analítica

Archivo:

analitica.ts

Función:

obtenerMetricas()

Consume:

/api/analitica
Autenticación

Archivo:

auth.ts

Funciones:

login()

registrar()

Consume:

/api/auth/login

/api/auth/registro
🚦 Estado actual del proyecto
Módulos terminados

✅ Login diseño completo
✅ Registro diseño completo
✅ Dashboard docente
✅ Dashboard estudiante
✅ Gestión de materias
✅ Gestión de carreras y cursos
✅ Control y registro de asistencia
✅ Historial de asistencia
✅ Solicitud de justificación
✅ Mis cursos
✅ Reportes
✅ Nosotros

🔄 Módulos pendientes de integración backend

Pendientes:

⬜ Login real con API
⬜ Registro real con API
⬜ Dashboard docente con datos reales
⬜ Dashboard estudiante con datos reales
⬜ Revisión de justificaciones con datos reales

▶️ Ejecución del proyecto

Instalar dependencias:

npm install

Ejecutar servidor Angular:

ng serve

Proyecto disponible en:

http://localhost:4200
👥 Equipo de desarrollo

Proyecto:

Sistema Analítico de Asistencia Estudiantil (SAAE)

Tecnología principal:

Angular + API REST

