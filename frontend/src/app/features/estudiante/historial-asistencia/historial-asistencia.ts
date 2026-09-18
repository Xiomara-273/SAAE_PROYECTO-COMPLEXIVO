import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AsistenciaService } from '../../../core/services/asistencia';
import { Auth } from '../../../core/services/auth';

interface RegistroHistorial {
  fecha: string;
  materia: string;
  docente: string;
  estado: 'Presente' | 'Atraso' | 'Falta';
  observacion: string;
}

@Component({
  selector: 'app-historial-asistencia',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './historial-asistencia.html',
  styleUrl: './historial-asistencia.scss'
})

export class HistorialAsistenciaComponent implements OnInit {

  private asistenciaService = inject(AsistenciaService);
  private authService = inject(Auth);

  // ===============================
  // DATOS DEL ESTUDIANTE
  // ===============================

  nombreEstudiante: string = '';

  // ===============================
  // FILTROS
  // ===============================

  materias: string[] = [];
  materiaSeleccionada: string = 'Todas';

  // ===============================
  // KPIs
  // ===============================

  porcentajeTotal: number = 0;
  presentes: number = 0;
  atrasos: number = 0;
  faltas: number = 0;

  // ===============================
  // HISTORIAL
  // ===============================

  historial: RegistroHistorial[] = [];
  historialFiltrado: RegistroHistorial[] = [];

  cargando: boolean = false;
  mensajeError: string = '';

  // ===============================
  // INIT
  // ===============================

  ngOnInit(): void {
    const usuario = this.authService.obtenerUsuario();
    if (usuario) {
      this.nombreEstudiante = `${usuario.nombres} ${usuario.apellidos}`;
      this.cargarHistorial(usuario.id);
    } else {
      this.mensajeError = 'No hay sesión activa. Por favor inicie sesión.';
    }
  }

  // ===============================
  // CARGAR HISTORIAL DESDE BACKEND
  // ===============================

  cargarHistorial(estudianteId: number): void {
    this.cargando = true;

    this.asistenciaService.obtenerAsistencia().subscribe({

      next: (data: any) => {
        this.cargando = false;
        // Mapear respuesta del backend al formato del historial
        const registros = Array.isArray(data) ? data : [];
        this.historial = registros.map((r: any) => ({
          fecha: r.fecha || '',
          materia: r.curso?.materia?.nombre || r.materia || '',
          docente: r.curso?.docente
            ? `${r.curso.docente.nombres} ${r.curso.docente.apellidos}`
            : '',
          estado: this.mapearEstado(r.estado),
          observacion: r.observacion || ''
        }));

        // Extraer lista de materias únicas para el filtro
        const materiasUnicas = [...new Set(this.historial.map(r => r.materia))].filter(Boolean);
        this.materias = materiasUnicas;

        this.historialFiltrado = [...this.historial];
        this.calcularMetricas();
      },

      error: (err) => {
        this.cargando = false;
        console.warn('Error al cargar historial:', err);
        this.mensajeError = 'Error al cargar el historial. Verifique la conexión con el servidor.';
      }

    });
  }

  private mapearEstado(estadoBackend: string): 'Presente' | 'Atraso' | 'Falta' {
    const mapa: Record<string, 'Presente' | 'Atraso' | 'Falta'> = {
      'PRESENTE': 'Presente',
      'ATRASO': 'Atraso',
      'FALTA': 'Falta'
    };
    return mapa[estadoBackend] || 'Presente';
  }

  // ===============================
  // FILTRAR HISTORIAL
  // ===============================

  filtrarHistorial(): void {
    if (this.materiaSeleccionada === 'Todas') {
      this.historialFiltrado = [...this.historial];
    } else {
      this.historialFiltrado = this.historial.filter(
        registro => registro.materia === this.materiaSeleccionada
      );
    }
    this.calcularMetricas();
  }

  // ===============================
  // CALCULAR KPIs
  // ===============================

  calcularMetricas(): void {
    const total = this.historialFiltrado.length;

    this.presentes = this.historialFiltrado.filter(r => r.estado === 'Presente').length;
    this.atrasos = this.historialFiltrado.filter(r => r.estado === 'Atraso').length;
    this.faltas = this.historialFiltrado.filter(r => r.estado === 'Falta').length;

    const puntaje = this.presentes + (this.atrasos * 0.5);
    this.porcentajeTotal = total > 0 ? Math.round((puntaje / total) * 100) : 0;
  }

}