import { Routes } from '@angular/router';

// ===========================
// AUTH
// ===========================

import { LoginComponent } from './features/auth/pages/login/login';
import { RegisterComponent } from './features/auth/pages/register/register';

// ===========================
// LAYOUT
// ===========================

import { MainLayout } from './layouts/main-layout/main-layout';

// ===========================
// DOCENTE
// ===========================

import { DashboardDocente } from './features/docente/pages/dashboard-docente/dashboard-docente';

import { ControlAsistenciaComponent } from './features/docente/pages/control-asistencia/control-asistencia';

import { RevisionJustificacionesComponent } from './features/docente/pages/revision-justificaciones/revision-justificaciones';

import { GestionMateriasComponent } from './features/docente/pages/gestion-materias/gestion-materias';

import { GestionCarreras } from './features/docente/pages/gestion-carreras/gestion-carreras';

// ===========================
// ESTUDIANTE
// ===========================

import { DashboardEstudianteComponent } from './features/estudiante/pages/dashboard-estudiante/dashboard-estudiante';

import { HistorialAsistenciaComponent } from './features/estudiante/pages/historial-asistencia/historial-asistencia';

import { SolicitarJustificacionComponent } from './features/estudiante/pages/solicitar-justificacion/solicitar-justificacion';

import { MisCursos } from './features/estudiante/pages/mis-cursos/mis-cursos';

// ===========================
// REPORTES
// ===========================

import { ReportesAnalitica } from './features/reportes/pages/reportes-analitica/reportes-analitica';

// ===========================
// SISTEMA
// ===========================

import { Configuracion } from './features/configuracion/pages/configuracion/configuracion';

import { NosotrosComponent } from './features/institucional/pages/nosotros/nosotros';

export const routes: Routes = [

  // ===========================
  // AUTENTICACIÓN
  // ===========================

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  // ===========================
  // LAYOUT PRINCIPAL
  // ===========================

  {

    path: '',
    component: MainLayout,

    children: [

      // =====================
      // DOCENTE
      // =====================

      {
        path: 'docente/dashboard',
        component: DashboardDocente
      },

      {
        path: 'docente/asistencia',
        component: ControlAsistenciaComponent
      },

      {
        path: 'docente/justificaciones',
        component: RevisionJustificacionesComponent
      },

      {
        path: 'docente/materias',
        component: GestionMateriasComponent
      },

      {
        path: 'docente/carreras',
        component: GestionCarreras
      },

      // =====================
      // ESTUDIANTE
      // =====================

      {
        path: 'estudiante/dashboard',
        component: DashboardEstudianteComponent
      },

      {
        path: 'estudiante/historial',
        component: HistorialAsistenciaComponent
      },

      {
        path: 'estudiante/solicitar-justificacion',
        component: SolicitarJustificacionComponent
      },

      {
        path: 'estudiante/cursos',
        component: MisCursos
      },

      // =====================
      // REPORTES
      // =====================

      {
        path: 'analitica/reportes',
        component: ReportesAnalitica
      },

      // =====================
      // SISTEMA
      // =====================

      {
        path: 'configuracion',
        component: Configuracion
      },

      {
        path: 'nosotros',
        component: NosotrosComponent
      }

    ]

  },

  // ===========================
  // RUTA NO ENCONTRADA
  // ===========================

  {
    path: '**',
    redirectTo: 'login'
  }

];