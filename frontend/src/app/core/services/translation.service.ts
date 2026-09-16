import { Injectable, signal, Pipe, PipeTransform } from '@angular/core';

export type Idioma = 'Español' | 'English';

const DICCIONARIO: Record<Idioma, Record<string, string>> = {
  Español: {
    // Configuración
    'title.configuracion': 'Configuración del Sistema',
    'desc.configuracion': 'Administra tu información personal y preferencias del sistema SAAE.',
    'header.perfil': 'Información personal del usuario.',
    'label.nombre': 'Nombre',
    'label.apellido': 'Apellido',
    'label.correo': 'Correo electrónico',
    'label.telefono': 'Teléfono',
    'btn.guardar_perfil': 'Guardar perfil',
    'header.preferencias': 'Preferencias del sistema',
    'desc.preferencias': 'Personaliza el comportamiento de la plataforma.',
    'label.notificaciones': 'Notificaciones',
    'label.modo_oscuro': 'Modo oscuro',
    'label.idioma': 'Idioma',
    'btn.guardar_configuracion': 'Guardar configuración',
    'header.seguridad': 'Seguridad',
    'desc.seguridad': 'Actualiza la contraseña de tu cuenta.',
    'label.password_actual': 'Contraseña actual',
    'label.password_nueva': 'Nueva contraseña',
    'label.password_confirmar': 'Confirmar contraseña',
    'btn.cambiar_password': 'Cambiar contraseña',
    'msg.perfil_ok': 'Perfil actualizado correctamente',
    'msg.perfil_error': 'Error al actualizar perfil',
    'msg.config_ok': 'Configuración guardada correctamente',
    'msg.config_error': 'Error al guardar configuración',
    'msg.pass_ok': 'Contraseña actualizada correctamente',
    'msg.pass_error': 'Error al cambiar contraseña',
    'msg.pass_mismatch': 'Las contraseñas no coinciden',

    // Sidebar
    'menu.analitica': 'Panel General de Analítica',
    'menu.seguimiento': 'Seguimiento Académico',
    'menu.asistencia': 'Control y Registro de Asistencia',
    'menu.justificaciones': 'Revisión de Justificaciones',
    'menu.materias': 'Gestión de Materias',
    'menu.carreras': 'Gestión de Carreras y Cursos',
    'menu.estudiante': 'Gestión Académica Estudiante',
    'menu.dashboard_estudiante': 'Dashboard General Estudiante',
    'menu.historial': 'Historial de Asistencia',
    'menu.solicitar_justificacion': 'Solicitar Justificación',
    'menu.cursos': 'Mis Cursos',
    'menu.reportes': 'Reportes',
    'menu.reportes_general': 'Reportes y Analítica General',
    'menu.sistema': 'Sistema',
    'menu.configuracion': 'Configuración',
    'menu.nosotros': 'Nosotros',
    'menu.cerrar_sesion': 'Cerrar sesión',

    // Header & Layout
    'header.title': 'SAAE - Sistema Analítico de Asistencia',
    'header.subtitle': 'Instituto Tecnológico Yavirac',
    'header.user': 'Usuario',
    'header.role': 'Coordinador Académico',

    // Dashboard Docente
    'dash.welcome_title': 'SAAE: Sistema Analítico de Asistencia Estudiantil',
    'dash.welcome_desc': 'Plataforma inteligente para el monitoreo, control y análisis de asistencia académica.',
    'dash.security': 'Privacidad y Seguridad',
    'dash.sync': 'Datos sincronizados',
    'dash.docente_title': 'Panel General de Analítica Docente',
    'dash.docente_subtitle': 'Métricas consolidadas del periodo académico vigente',
    'dash.asistencia_promedio': 'Asistencia promedio global',
    'dash.sync_realtime': 'Sincronizado en tiempo real',
    'dash.estudiantes_riesgo': 'Estudiantes en riesgo crítico',
    'dash.requiere_seguimiento': 'Requiere seguimiento',
    'dash.justificaciones_pendientes': 'Justificaciones pendientes',
    'dash.solicitudes_revisar': 'Solicitudes por revisar',
    'dash.ausentismo_semanal': 'Índice de ausentismo semanal',
    'dash.inasistencia_materia': 'Inasistencia por materia',
    'dash.estado_asistencia': 'Estado actual de asistencia',
    'dash.alertas_criticas': 'Alertas críticas',
    'dash.asignatura': 'Asignatura',
    'dash.paralelo': 'Paralelo',
    'dash.horario': 'Horario',
    'dash.asistencia': 'Asistencia',

    // Dashboard Estudiante
    'est.dash_title': 'Dashboard General del Estudiante',
    'est.dash_subtitle': 'Seguimiento de tu asistencia y rendimiento académico',
    'est.porcentaje_global': 'Mi Porcentaje Global',
    'est.materias_activas': 'Materias Activas',
    'est.justificaciones_enviadas': 'Justificaciones Enviadas',
    'est.historial_reciente': 'Historial Reciente de Asistencia',

    // Control Asistencia
    'asistencia.title': 'Control y Registro de Asistencia',
    'asistencia.seleccionar_materia': 'Seleccionar Materia',
    'asistencia.seleccionar_fecha': 'Seleccionar Fecha',
    'asistencia.estudiante': 'Estudiante',
    'asistencia.estado': 'Estado de Asistencia',
    'asistencia.presente': 'Presente',
    'asistencia.ausente': 'Ausente',
    'asistencia.atraso': 'Atraso',
    'asistencia.justificado': 'Justificado',
    'asistencia.guardar': 'Guardar Registro de Asistencia',

    // Justificaciones
    'just.title': 'Revisión de Solicitudes de Justificación',
    'just.estudiante': 'Estudiante / Solicitante',
    'just.motivo': 'Motivo',
    'just.fecha': 'Fecha de Inasistencia',
    'just.evidencia': 'Evidencia',
    'just.aprobar': 'Aprobar',
    'just.rechazar': 'Rechazar',
    'just.pendiente': 'Pendiente',
    'just.aprobada': 'Aprobada',
    'just.rechazada': 'Rechazada',

    // Materias & Carreras
    'materias.title': 'Gestión de Materias y Asignaturas',
    'carreras.title': 'Gestión de Carreras y Cursos',
    'btn.nueva_materia': '+ Nueva Materia',
    'btn.nueva_carrera': '+ Nueva Carrera',
    'btn.editar': 'Editar',
    'btn.eliminar': 'Eliminar',
    'table.codigo': 'Código',
    'table.nombre': 'Nombre',
    'table.acciones': 'Acciones',

    // Estudiante Pages
    'est.solicitar_title': 'Solicitud de Justificación de Inasistencia',
    'est.motivo_label': 'Motivo o Explicación de la Inasistencia',
    'est.adjuntar_label': 'Adjuntar Certificado o Evidencia',
    'est.btn_enviar': 'Enviar Solicitud',
    'est.historial_title': 'Historial Personal de Asistencia',
    'est.mis_cursos_title': 'Mis Cursos y Asignaturas Inscritas',

    // Reportes & Nosotros
    'rep.title': 'Reportes y Indicadores de Analítica',
    'rep.exportar': 'Exportar Reporte (PDF/Excel)',
    'nos.title': 'Acerca del Sistema SAAE - Yavirac',
    'nos.desc': 'Plataforma web orientada al monitoreo, control y análisis analítico de la asistencia académica.',

    // Auth
    'auth.login_title': 'Iniciar Sesión en SAAE',
    'auth.correo': 'Correo Institucional',
    'auth.password': 'Contraseña',
    'auth.btn_ingresar': 'Ingresar al Sistema',
    'auth.register_title': 'Registro de Nuevo Usuario',
    'auth.btn_registrar': 'Registrarse'
  },
  English: {
    // Configuration
    'title.configuracion': 'System Settings',
    'desc.configuracion': 'Manage your personal information and SAAE system preferences.',
    'header.perfil': 'User personal information.',
    'label.nombre': 'First Name',
    'label.apellido': 'Last Name',
    'label.correo': 'Email Address',
    'label.telefono': 'Phone Number',
    'btn.guardar_perfil': 'Save Profile',
    'header.preferencias': 'System Preferences',
    'desc.preferencias': 'Customize platform behavior.',
    'label.notificaciones': 'Notifications',
    'label.modo_oscuro': 'Dark Mode',
    'label.idioma': 'Language',
    'btn.guardar_configuracion': 'Save Settings',
    'header.seguridad': 'Security',
    'desc.seguridad': 'Update your account password.',
    'label.password_actual': 'Current Password',
    'label.password_nueva': 'New Password',
    'label.password_confirmar': 'Confirm Password',
    'btn.cambiar_password': 'Change Password',
    'msg.perfil_ok': 'Profile updated successfully',
    'msg.perfil_error': 'Failed to update profile',
    'msg.config_ok': 'Settings saved successfully',
    'msg.config_error': 'Failed to save settings',
    'msg.pass_ok': 'Password updated successfully',
    'msg.pass_error': 'Failed to update password',
    'msg.pass_mismatch': 'Passwords do not match',

    // Sidebar
    'menu.analitica': 'Analytics Dashboard',
    'menu.seguimiento': 'Academic Tracking',
    'menu.asistencia': 'Attendance Control & Register',
    'menu.justificaciones': 'Justifications Review',
    'menu.materias': 'Subject Management',
    'menu.carreras': 'Career & Course Management',
    'menu.estudiante': 'Student Academic Management',
    'menu.dashboard_estudiante': 'Student Dashboard',
    'menu.historial': 'Attendance History',
    'menu.solicitar_justificacion': 'Request Justification',
    'menu.cursos': 'My Courses',
    'menu.reportes': 'Reports',
    'menu.reportes_general': 'Reports & General Analytics',
    'menu.sistema': 'System',
    'menu.configuracion': 'Settings',
    'menu.nosotros': 'About Us',
    'menu.cerrar_sesion': 'Log Out',

    // Header & Layout
    'header.title': 'SAAE - Attendance Analytics System',
    'header.subtitle': 'Yavirac Technological Institute',
    'header.user': 'User',
    'header.role': 'Academic Coordinator',

    // Dashboard Docente
    'dash.welcome_title': 'SAAE: Student Attendance Analytics System',
    'dash.welcome_desc': 'Smart platform for monitoring, controlling, and analyzing academic attendance.',
    'dash.security': 'Privacy and Security',
    'dash.sync': 'Synchronized Data',
    'dash.docente_title': 'Teacher Analytics Dashboard',
    'dash.docente_subtitle': 'Consolidated metrics for the current academic term',
    'dash.asistencia_promedio': 'Global Average Attendance',
    'dash.sync_realtime': 'Real-time synchronized',
    'dash.estudiantes_riesgo': 'Students at Critical Risk',
    'dash.requiere_seguimiento': 'Requires follow-up',
    'dash.justificaciones_pendientes': 'Pending Justifications',
    'dash.solicitudes_revisar': 'Requests to review',
    'dash.ausentismo_semanal': 'Weekly Absenteeism Index',
    'dash.inasistencia_materia': 'Absence by Subject',
    'dash.estado_asistencia': 'Current Attendance Status',
    'dash.alertas_criticas': 'Critical Alerts',
    'dash.asignatura': 'Subject',
    'dash.paralelo': 'Parallel',
    'dash.horario': 'Schedule',
    'dash.asistencia': 'Attendance',

    // Dashboard Estudiante
    'est.dash_title': 'Student General Dashboard',
    'est.dash_subtitle': 'Track your attendance and academic performance',
    'est.porcentaje_global': 'My Global Percentage',
    'est.materias_activas': 'Active Subjects',
    'est.justificaciones_enviadas': 'Submitted Justifications',
    'est.historial_reciente': 'Recent Attendance History',

    // Control Asistencia
    'asistencia.title': 'Attendance Control & Registration',
    'asistencia.seleccionar_materia': 'Select Subject',
    'asistencia.seleccionar_fecha': 'Select Date',
    'asistencia.estudiante': 'Student',
    'asistencia.estado': 'Attendance Status',
    'asistencia.presente': 'Present',
    'asistencia.ausente': 'Absent',
    'asistencia.atraso': 'Late',
    'asistencia.justificado': 'Justified',
    'asistencia.guardar': 'Save Attendance Record',

    // Justificaciones
    'just.title': 'Justification Requests Review',
    'just.estudiante': 'Student / Applicant',
    'just.motivo': 'Reason',
    'just.fecha': 'Absence Date',
    'just.evidencia': 'Evidence',
    'just.aprobar': 'Approve',
    'just.rechazar': 'Reject',
    'just.pendiente': 'Pending',
    'just.aprobada': 'Approved',
    'just.rechazada': 'Rejected',

    // Materias & Carreras
    'materias.title': 'Subject & Course Management',
    'carreras.title': 'Career & Course Management',
    'btn.nueva_materia': '+ New Subject',
    'btn.nueva_carrera': '+ New Career',
    'btn.editar': 'Edit',
    'btn.eliminar': 'Delete',
    'table.codigo': 'Code',
    'table.nombre': 'Name',
    'table.acciones': 'Actions',

    // Estudiante Pages
    'est.solicitar_title': 'Absence Justification Request',
    'est.motivo_label': 'Reason or Explanation for Absence',
    'est.adjuntar_label': 'Attach Certificate or Evidence',
    'est.btn_enviar': 'Submit Request',
    'est.historial_title': 'Personal Attendance History',
    'est.mis_cursos_title': 'My Enrolled Courses & Subjects',

    // Reportes & Nosotros
    'rep.title': 'Analytics Reports & Indicators',
    'rep.exportar': 'Export Report (PDF/Excel)',
    'nos.title': 'About SAAE System - Yavirac',
    'nos.desc': 'Web platform designed for monitoring, controlling, and analyzing academic attendance.',

    // Auth
    'auth.login_title': 'Log In to SAAE',
    'auth.correo': 'Institutional Email',
    'auth.password': 'Password',
    'auth.btn_ingresar': 'Log In to System',
    'auth.register_title': 'New User Registration',
    'auth.btn_registrar': 'Register'
  }
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = signal<Idioma>(this.getInitialIdioma());

  public readonly idioma = this.currentLanguage.asReadonly();

  private getInitialIdioma(): Idioma {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('saae_idioma') as Idioma;
      if (saved === 'Español' || saved === 'English') {
        return saved;
      }
    }
    return 'Español';
  }

  setIdioma(nuevoIdioma: Idioma): void {
    if (nuevoIdioma === 'Español' || nuevoIdioma === 'English') {
      this.currentLanguage.set(nuevoIdioma);
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('saae_idioma', nuevoIdioma);
      }
    }
  }

  translate(key: string): string {
    const lang = this.currentLanguage();
    return DICCIONARIO[lang]?.[key] || DICCIONARIO['Español']?.[key] || key;
  }
}

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(key: string): string {
    return this.translationService.translate(key);
  }
}
