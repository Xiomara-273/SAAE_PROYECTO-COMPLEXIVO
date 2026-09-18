import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../../core/services/translation.service';

import { AnaliticaService } from '../../../core/services/analitica';
import { AlertaAsistencia } from '../../../shared/models/alerta-asistencia';
import { MetricasAsistencia } from '../../../shared/models/metricas-asistencia';



@Component({
  selector: 'app-dashboard-docente',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslatePipe
  ],
  templateUrl: './dashboard-docente.html',
  styleUrl: './dashboard-docente.scss'
})
export class DashboardDocente implements OnInit {



  private analiticaService = inject(AnaliticaService);



  carreraSeleccionada:string =
  'Desarrollo de Software';



  paraleloSeleccionado:string =
  'Todos';



  asistenciaGlobal: string = '--';

  totalEstudiantesRiesgo: number = 0;

  justificacionesPendientes: number = 0;




  alertasCriticas:AlertaAsistencia[] = [];





  ngOnInit():void {

    this.cargarMetricas();

  }






  cargarMetricas():void {


    this.analiticaService.obtenerMetricas(

      this.carreraSeleccionada,

      this.paraleloSeleccionado

    )
    .subscribe({



      next:(data:MetricasAsistencia)=>{


        this.asistenciaGlobal =
        data.asistenciaGlobal;



        this.totalEstudiantesRiesgo =
        data.totalEstudiantesRiesgo;



        this.justificacionesPendientes =
        data.justificacionesPendientes;



        this.alertasCriticas =
        data.alertas;



      },



      error:(error)=>{


        console.warn(
          'No hay conexión con analítica',
          error
        );


      }



    });


  }







  errorMetricas: string = '';






  onFiltrarMetricas(
    event:any,
    tipo:'carrera'|'paralelo'
  ):void {



    if(tipo==='carrera'){

      this.carreraSeleccionada =
      event.target.value;


    }
    else{


      this.paraleloSeleccionado =
      event.target.value;


    }



    this.cargarMetricas();


  }






  forzarSincronizacionN8N():void {


    this.cargarMetricas();


  }



}
