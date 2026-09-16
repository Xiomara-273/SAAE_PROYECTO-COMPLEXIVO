import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AnaliticaService } from '../../../core/services/analitica';
import { AlertaAsistencia } from '../../../shared/models/alerta-asistencia';
import { MetricasAsistencia } from '../../../shared/models/metricas-asistencia';



@Component({
  selector: 'app-dashboard-docente',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
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



  asistenciaGlobal:string =
  '84.5%';



  totalEstudiantesRiesgo:number =
  5;



  justificacionesPendientes:number =
  3;



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


        this.cargarDatosDemo();


      }



    });


  }







  cargarDatosDemo():void {



    this.asistenciaGlobal =
    '84.5%';



    this.totalEstudiantesRiesgo =
    5;



    this.justificacionesPendientes =
    3;



    this.alertasCriticas = [



      {

        estudiante:'Mendez Xiomara',

        materia:'Arquitectura de Sistemas',

        porcentaje:71.4,

        tipo:'danger',

        detalle:'Asistencia bajo el mínimo permitido',

        tiempo:'Hace 5 minutos'

      },



      {

        estudiante:'Flores Byron',

        materia:'Desarrollo de Software V',

        porcentaje:78,

        tipo:'warning',

        detalle:'Tres atrasos consecutivos',

        tiempo:'Hace 1 hora'

      }



    ];



  }






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
