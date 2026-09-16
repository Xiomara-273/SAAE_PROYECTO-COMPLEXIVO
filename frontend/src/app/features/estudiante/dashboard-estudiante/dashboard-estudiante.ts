import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../../core/services/translation.service';

import { DashboardEstudianteService } from '../../../core/services/dashboard-estudiante.service';

interface MateriaAsistencia {

  materia:string;
  docente:string;
  porcentaje:number;
  estado:string;

}

interface AlertaEstudiante {

  tipo:string;
  mensaje:string;

}

@Component({

  selector:'app-dashboard-estudiante',

  standalone:true,

  imports:[
    CommonModule,
    RouterModule,
    TranslatePipe
  ],

  templateUrl:'./dashboard-estudiante.html',

  styleUrl:'./dashboard-estudiante.scss'

})



export class DashboardEstudianteComponent implements OnInit {



  private dashboardService = inject(
    DashboardEstudianteService
  );





  nombreEstudiante:string = 'Mendez Xiomara';


  carrera:string = 'Desarrollo de Software';


  semestre:string = 'Quinto Semestre';



  asistenciaGeneral:number = 86;





  materias:MateriaAsistencia[]=[



    {

      materia:'Desarrollo de Software V',

      docente:'Ing. Carlos Almeida',

      porcentaje:92,

      estado:'Excelente'

    },



    {

      materia:'Arquitectura de Sistemas',

      docente:'Ing. María López',

      porcentaje:71,

      estado:'Riesgo'

    },



    {

      materia:'Base de Datos Avanzada',

      docente:'Ing. Juan Pérez',

      porcentaje:88,

      estado:'Bueno'

    }



  ];







  alertas:AlertaEstudiante[]=[



    {

      tipo:'warning',

      mensaje:'Tu asistencia en Arquitectura de Sistemas está cerca del límite permitido.'

    },



    {

      tipo:'success',

      mensaje:'Mantienes una asistencia general superior al 80%.'

    }



  ];







  ngOnInit():void{


    this.cargarDashboard();


  }







  cargarDashboard(){



    const estudianteId = 1;



    this.dashboardService
    .obtenerDashboard(estudianteId)
    .subscribe({



      next:(data)=>{



        this.nombreEstudiante =
        data.nombreEstudiante;



        this.carrera =
        data.carrera;



        this.semestre =
        data.semestre;



        this.asistenciaGeneral =
        data.asistenciaGeneral;



        this.materias =
        data.materias;



        this.alertas =
        data.alertas;



      },



      error:(error)=>{



        console.warn(
          'No hay conexión con dashboard estudiante',
          error
        );



      }



    });



  }







  solicitarJustificacion(){



    console.log(
      'Redirigiendo a formulario de justificación'
    );



  }



}
