import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../../core/services/translation.service';

import { AsistenciaService } from '../../../core/services/asistencia';
import { Cursos } from '../../../core/services/cursos';
import { Auth } from '../../../core/services/auth';

import { Estudiante } from '../../../shared/models/estudiante';
import { RegistroAsistencia } from '../../../shared/models/registro-asistencia';


@Component({
  selector: 'app-control-asistencia',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslatePipe
  ],
  templateUrl: './control-asistencia.html',
  styleUrl: './control-asistencia.scss'
})
export class ControlAsistenciaComponent implements OnInit {

  private asistenciaService = inject(AsistenciaService);
  private cursosService = inject(Cursos);
  private authService = inject(Auth);

  // Cursos del docente cargados desde el backend
  asignaturas: any[] = [];
  asignaturaSeleccionada: string = '';
  cursoIdSeleccionado: number = 0;

  fechaRegistro: string = new Date().toISOString().split('T')[0];

  estudiantes: Estudiante[] = [];

  totalPresentes: number = 0;
  totalAtrasos: number = 0;
  totalFaltas: number = 0;

  cargando: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';


  ngOnInit(): void {
    this.cargarCursos();
  }


  // Cargar los cursos del docente autenticado
  cargarCursos(): void {
    this.cursosService.obtenerCursos().subscribe({
      next: (cursos: any[]) => {
        this.asignaturas = cursos;
        if (cursos.length > 0) {
          this.asignaturaSeleccionada = cursos[0].nombre;
          this.cursoIdSeleccionado = cursos[0].id;
          this.cargarAsistencia();
        }
      },
      error: (err) => {
        console.warn('No se pudieron cargar los cursos:', err);
        this.mensajeError = 'No se pudieron cargar los cursos. Verifique la conexión.';
      }
    });
  }


  // Cargar asistencia para el curso y fecha seleccionados
  cargarAsistencia(): void {
    if (!this.cursoIdSeleccionado) return;

    this.cargando = true;
    this.estudiantes = [];

    this.asistenciaService.obtenerAsistencia().subscribe({
      next: (data: any) => {
        this.cargando = false;
        if (Array.isArray(data) && data.length > 0) {
          // Filtrar por cursoId si la respuesta trae registros
          const registro = data.find((r: any) => r.cursoId === this.cursoIdSeleccionado);
          if (registro && registro.estudiantes) {
            this.estudiantes = registro.estudiantes;
          }
        }
        this.calcularMetricas();
      },
      error: (err) => {
        this.cargando = false;
        console.warn('Error al cargar asistencia:', err);
        this.mensajeError = 'Error al cargar la asistencia. Verifique la conexión con el servidor.';
        this.calcularMetricas();
      }
    });
  }


  onCambiarAsignatura(event: any): void {
    const cursoSeleccionado = this.asignaturas.find(c => c.nombre === event.target.value);
    if (cursoSeleccionado) {
      this.asignaturaSeleccionada = cursoSeleccionado.nombre;
      this.cursoIdSeleccionado = cursoSeleccionado.id;
      this.cargarAsistencia();
    }
  }


  cambiarEstado(
    estudianteId: number,
    nuevoEstado: 'P' | 'A' | 'F'
  ): void {

    const estudiante = this.estudiantes.find(e => e.id === estudianteId);

    if (estudiante) {
      estudiante.estado = nuevoEstado;

      if (nuevoEstado === 'P') {
        estudiante.observacion = '';
      }

      if (nuevoEstado === 'F' && !estudiante.observacion) {
        estudiante.observacion = 'Sin justificación registrada';
      }

      this.calcularMetricas();
    }
  }


  calcularMetricas(): void {
    this.totalPresentes = this.estudiantes.filter(e => e.estado === 'P').length;
    this.totalAtrasos = this.estudiantes.filter(e => e.estado === 'A').length;
    this.totalFaltas = this.estudiantes.filter(e => e.estado === 'F').length;
  }


  guardarAsistencia(): void {

    this.mensajeExito = '';
    this.mensajeError = '';

    const registro: RegistroAsistencia = {
      asignatura: this.asignaturaSeleccionada,
      fecha: this.fechaRegistro,
      estudiantes: this.estudiantes
    };

    this.asistenciaService.guardarAsistencia(registro).subscribe({

      next: () => {
        this.mensajeExito = 'Asistencia guardada correctamente.';
        setTimeout(() => this.mensajeExito = '', 4000);
      },

      error: (err) => {
        console.error('Error al guardar asistencia:', err);
        this.mensajeError =
          err?.error?.message ||
          'Error al guardar la asistencia. Intente nuevamente.';
        setTimeout(() => this.mensajeError = '', 5000);
      }

    });

  }

}
