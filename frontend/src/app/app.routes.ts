import { Routes } from '@angular/router';

// ===========================
// AUTH
// ===========================

import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';

// ===========================
// LAYOUT
// ===========================

import { MainLayout } from './layouts/main-layout/main-layout';

// ===========================
// DOCENTE
// ===========================

import { DashboardDocente } from './features/docente/dashboard-docente/dashboard-docente';

import { ControlAsistenciaComponent } from './features/docente/control-asistencia/control-asistencia';

import { RevisionJustificacionesComponent } from './features/docente/revision-justificaciones/revision-justificaciones';

import { GestionMateriasComponent } from './features/docente/gestion-materias/gestion-materias';

import { GestionCarreras } from './features/docente/gestion-carreras/gestion-carreras';

// ===========================
// ESTUDIANTE
// ===========================

import { DashboardEstudianteComponent } from './features/estudiante/dashboard-estudiante/dashboard-estudiante';

import { HistorialAsistenciaComponent } from './features/estudiante/historial-asistencia/historial-asistencia';

import { SolicitarJustificacionComponent } from './features/estudiante/solicitar-justificacion/solicitar-justificacion';

import { MisCursos } from './features/estudiante/mis-cursos/mis-cursos';

// ===========================
// REPORTES
// ===========================

import { ReportesAnalitica } from './features/reportes/reportes-analitica/reportes-analitica';

// ===========================
// SISTEMA
// ===========================

import { Configuracion } from './features/configuracion/configuracion/configuracion';

import { NosotrosComponent } from './features/institucional/nosotros/nosotros';

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
