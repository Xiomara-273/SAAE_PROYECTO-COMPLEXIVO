import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RevisionJustificaciones } from '../../../core/services/revision-justificaciones';


interface Justificacion {
  id: number;
  estudiante: string;
  materia: string;
  fecha: string;
  motivo: string;
  archivo: string;
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada';
}



@Component({
  selector: 'app-revision-justificaciones',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './revision-justificaciones.html',
  styleUrl: './revision-justificaciones.scss'
})

export class RevisionJustificacionesComponent implements OnInit {

  private servicio = inject(RevisionJustificaciones);

  solicitudes: Justificacion[] = [];

  pendientes: number = 0;
  aprobadas: number = 0;
  rechazadas: number = 0;

  cargando: boolean = false;
  mensajeError: string = '';


  ngOnInit(): void {
    this.cargarSolicitudes();
  }


  cargarSolicitudes(): void {
    this.cargando = true;
    this.mensajeError = '';

    this.servicio.obtenerSolicitudes().subscribe({

      next: (data: any) => {
        this.cargando = false;
        // Mapear estados del backend (APROBADO/RECHAZADO/PENDIENTE) a los del template
        this.solicitudes = (data || []).map((item: any) => ({
          ...item,
          estado: this.mapearEstado(item.estado)
        }));
        this.calcularEstados();
      },

      error: (err: any) => {
        this.cargando = false;
        console.warn('No hay conexión con justificaciones:', err);
        this.mensajeError = 'Error al cargar las justificaciones. Verifique la conexión con el servidor.';
      }

    });
  }


  private mapearEstado(estadoBackend: string): 'Pendiente' | 'Aprobada' | 'Rechazada' {
    const mapa: Record<string, 'Pendiente' | 'Aprobada' | 'Rechazada'> = {
      'PENDIENTE': 'Pendiente',
      'APROBADO': 'Aprobada',
      'RECHAZADO': 'Rechazada'
    };
    return mapa[estadoBackend] || 'Pendiente';
  }


  calcularEstados(): void {
    this.pendientes = this.solicitudes.filter(item => item.estado === 'Pendiente').length;
    this.aprobadas = this.solicitudes.filter(item => item.estado === 'Aprobada').length;
    this.rechazadas = this.solicitudes.filter(item => item.estado === 'Rechazada').length;
  }


  aprobar(id: number): void {
    this.servicio.aprobarSolicitud(id).subscribe({
      next: () => {
        this.cargarSolicitudes();
      },
      error: (err) => {
        console.error('Error al aprobar:', err);
        this.mensajeError = 'Error al aprobar la solicitud. Intente nuevamente.';
        setTimeout(() => this.mensajeError = '', 5000);
      }
    });
  }


  rechazar(id: number): void {
    this.servicio.rechazarSolicitud(id).subscribe({
      next: () => {
        this.cargarSolicitudes();
      },
      error: (err) => {
        console.error('Error al rechazar:', err);
        this.mensajeError = 'Error al rechazar la solicitud. Intente nuevamente.';
        setTimeout(() => this.mensajeError = '', 5000);
      }
    });
  }

}
