import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../../core/services/translation.service';

import { DashboardEstudianteService } from '../../../core/services/dashboard-estudiante.service';
import { Auth } from '../../../core/services/auth';

interface MateriaAsistencia {
  materia: string;
  docente: string;
  porcentaje: number;
  estado: string;
}

interface AlertaEstudiante {
  tipo: string;
  mensaje: string;
}

@Component({
  selector: 'app-dashboard-estudiante',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslatePipe
  ],
  templateUrl: './dashboard-estudiante.html',
  styleUrl: './dashboard-estudiante.scss'
})


export class DashboardEstudianteComponent implements OnInit {

  private dashboardService = inject(DashboardEstudianteService);
  private authService = inject(Auth);

  nombreEstudiante: string = '';
  carrera: string = '';
  semestre: string = '';
  asistenciaGeneral: number = 0;
  materias: MateriaAsistencia[] = [];
  alertas: AlertaEstudiante[] = [];

  cargando: boolean = false;
  mensajeError: string = '';


  ngOnInit(): void {
    this.cargarDashboard();
  }


  cargarDashboard(): void {

    const usuario = this.authService.obtenerUsuario();

    if (!usuario) {
      this.mensajeError = 'No hay sesión activa. Por favor inicie sesión.';
      return;
    }

    const estudianteId = usuario.id;
    this.cargando = true;

    this.dashboardService.obtenerDashboard(estudianteId).subscribe({

      next: (data) => {
        this.cargando = false;
        this.nombreEstudiante = data.nombreEstudiante;
        this.carrera = data.carrera;
        this.semestre = data.semestre;
        this.asistenciaGeneral = data.asistenciaGeneral;
        this.materias = data.materias;
        this.alertas = data.alertas;
      },

      error: (err) => {
        this.cargando = false;
        console.warn('No hay conexión con dashboard estudiante:', err);
        this.mensajeError = 'Error al cargar el dashboard. Verifique la conexión con el servidor.';
      }

    });

  }


  solicitarJustificacion(): void {
    console.log('Redirigiendo a formulario de justificación');
  }

}
