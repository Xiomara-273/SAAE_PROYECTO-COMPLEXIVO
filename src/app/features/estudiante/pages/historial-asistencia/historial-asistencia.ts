import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

export class HistorialAsistenciaComponent {

  // ===============================
  // DATOS DEL ESTUDIANTE
  // ===============================

  nombreEstudiante: string =
    'Mendez Xiomara';

  // ===============================
  // FILTROS
  // ===============================

  materias: string[] = [

    'Desarrollo de Software V',

    'Arquitectura de Sistemas',

    'Base de Datos Avanzada'

  ];

  materiaSeleccionada: string =
    'Todas';

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

  historial: RegistroHistorial[] = [

    {

      fecha: '21/07/2026',

      materia: 'Desarrollo de Software V',

      docente: 'Ing. Carlos Almeida',

      estado: 'Presente',

      observacion: ''

    },

    {

      fecha: '20/07/2026',

      materia: 'Arquitectura de Sistemas',

      docente: 'Ing. María López',

      estado: 'Falta',

      observacion: 'Sin justificación'

    },

    {

      fecha: '19/07/2026',

      materia: 'Base de Datos Avanzada',

      docente: 'Ing. Juan Pérez',

      estado: 'Presente',

      observacion: ''

    },

    {

      fecha: '18/07/2026',

      materia: 'Arquitectura de Sistemas',

      docente: 'Ing. María López',

      estado: 'Atraso',

      observacion: 'Llegó tarde'

    },

    {

      fecha: '17/07/2026',

      materia: 'Desarrollo de Software V',

      docente: 'Ing. Carlos Almeida',

      estado: 'Presente',

      observacion: ''

    }

  ];

  historialFiltrado: RegistroHistorial[] = [
    ...this.historial
  ];

  constructor() {

    this.calcularMetricas();

  }

  // ===============================
  // FILTRAR HISTORIAL
  // ===============================

  filtrarHistorial(): void {

    if (this.materiaSeleccionada === 'Todas') {

      this.historialFiltrado = [
        ...this.historial
      ];

    } else {

      this.historialFiltrado =
        this.historial.filter(

          registro =>
            registro.materia === this.materiaSeleccionada

        );

    }

    this.calcularMetricas();

  }

  // ===============================
  // CALCULAR KPIs
  // ===============================

  calcularMetricas(): void {

    const total = this.historialFiltrado.length;

    this.presentes =
      this.historialFiltrado.filter(

        registro => registro.estado === 'Presente'

      ).length;

    this.atrasos =
      this.historialFiltrado.filter(

        registro => registro.estado === 'Atraso'

      ).length;

    this.faltas =
      this.historialFiltrado.filter(

        registro => registro.estado === 'Falta'

      ).length;

    const puntaje =
      this.presentes + (this.atrasos * 0.5);

    this.porcentajeTotal =
      total > 0
        ? Math.round((puntaje / total) * 100)
        : 0;

  }

}