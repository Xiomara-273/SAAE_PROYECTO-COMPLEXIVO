import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../../core/services/translation.service';

import { JustificacionesService } from '../../../core/services/justificaciones.service';
import { Cursos } from '../../../core/services/cursos';
import { Auth } from '../../../core/services/auth';

interface Solicitud {
  id?: number;
  materia: string;
  fecha: string;
  tipo: string;
  motivo: string;
  archivo?: string;
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada';
  observacion?: string;
}

interface FormularioJustificacion {
  materia: string;
  fecha: string;
  tipo: string;
  motivo: string;
}

@Component({
  selector: 'app-solicitar-justificacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './solicitar-justificacion.html',
  styleUrl: './solicitar-justificacion.scss'
})

export class SolicitarJustificacionComponent implements OnInit {

  private justificacionesService = inject(JustificacionesService);
  private cursosService = inject(Cursos);
  private authService = inject(Auth);


  /* =====================================================
     DATOS DEL FORMULARIO
  ===================================================== */

  formulario: FormularioJustificacion = {
    materia: '',
    fecha: '',
    tipo: 'Médica',
    motivo: ''
  };


  /* =====================================================
     MATERIAS DEL ESTUDIANTE (desde backend)
  ===================================================== */

  materias: string[] = [];


  /* =====================================================
     ARCHIVO
  ===================================================== */

  archivoSeleccionado: File | null = null;
  nombreArchivo: string = '';


  /* =====================================================
     HISTORIAL (desde backend)
  ===================================================== */

  solicitudes: Solicitud[] = [];

  cargando: boolean = false;
  enviando: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';


  /* =====================================================
     INIT
  ===================================================== */

  ngOnInit(): void {
    this.cargarMaterias();
    this.cargarHistorial();
  }


  /* =====================================================
     CARGAR MATERIAS DESDE CURSOS DEL ESTUDIANTE
  ===================================================== */

  cargarMaterias(): void {
    this.cursosService.obtenerCursos().subscribe({
      next: (cursos: any[]) => {
        this.materias = cursos.map(c => c.materia?.nombre || c.nombre || '').filter(Boolean);
      },
      error: (err) => {
        console.warn('Error al cargar materias:', err);
      }
    });
  }


  /* =====================================================
     CARGAR HISTORIAL DE JUSTIFICACIONES
  ===================================================== */

  cargarHistorial(): void {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario) return;

    this.cargando = true;

    this.justificacionesService.obtenerMisJustificaciones(usuario.id).subscribe({

      next: (data: any[]) => {
        this.cargando = false;
        this.solicitudes = (data || []).map(item => ({
          id: item.id,
          materia: item.asistencia?.curso?.materia?.nombre || '',
          fecha: item.fecha_solicitud?.split('T')[0] || '',
          tipo: 'General',
          motivo: item.motivo || '',
          archivo: item.archivoUrl || undefined,
          estado: this.mapearEstado(item.estado),
          observacion: item.observacionDocente || undefined
        }));
      },

      error: (err) => {
        this.cargando = false;
        console.warn('Error al cargar historial de justificaciones:', err);
      }

    });
  }

  private mapearEstado(estado: string): 'Pendiente' | 'Aprobada' | 'Rechazada' {
    const mapa: Record<string, 'Pendiente' | 'Aprobada' | 'Rechazada'> = {
      'PENDIENTE': 'Pendiente',
      'APROBADO': 'Aprobada',
      'RECHAZADO': 'Rechazada'
    };
    return mapa[estado] || 'Pendiente';
  }


  /* =====================================================
     SELECCIONAR ARCHIVO
  ===================================================== */

  seleccionarArchivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0];
      this.nombreArchivo = this.archivoSeleccionado.name;
    }
  }


  /* =====================================================
     ENVIAR SOLICITUD AL BACKEND
  ===================================================== */

  enviarSolicitud(): void {

    if (!this.formulario.materia || !this.formulario.fecha || !this.formulario.motivo) {
      this.mensajeError = 'Complete todos los campos obligatorios.';
      return;
    }

    const usuario = this.authService.obtenerUsuario();
    if (!usuario) {
      this.mensajeError = 'No hay sesión activa. Por favor inicie sesión.';
      return;
    }

    this.enviando = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    this.justificacionesService.enviarJustificacion({
      estudianteId: usuario.id,
      motivo: this.formulario.motivo,
      archivoUrl: this.nombreArchivo || undefined
    }).subscribe({

      next: () => {
        this.enviando = false;
        this.mensajeExito = 'Solicitud enviada correctamente.';
        this.limpiarFormulario();
        this.cargarHistorial(); // Recargar historial
        setTimeout(() => this.mensajeExito = '', 5000);
      },

      error: (err) => {
        this.enviando = false;
        console.error('Error al enviar justificación:', err);
        this.mensajeError =
          err?.error?.message ||
          'Error al enviar la solicitud. Intente nuevamente.';
        setTimeout(() => this.mensajeError = '', 5000);
      }

    });

  }


  /* =====================================================
     LIMPIAR FORMULARIO
  ===================================================== */

  limpiarFormulario(): void {
    this.formulario = {
      materia: '',
      fecha: '',
      tipo: 'Médica',
      motivo: ''
    };
    this.archivoSeleccionado = null;
    this.nombreArchivo = '';
  }

}