import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AsistenciaService } from '../../../../core/services/asistencia';

import { Estudiante } from '../../../../shared/models/estudiante';
import { RegistroAsistencia } from '../../../../shared/models/registro-asistencia';


@Component({
  selector: 'app-control-asistencia',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './control-asistencia.html',
  styleUrl: './control-asistencia.scss'
})
export class ControlAsistenciaComponent implements OnInit {


  private asistenciaService = inject(AsistenciaService);



  asignaturas = [

    'Desarrollo de Software V - Paralelo A',
    'Arquitectura de Sistemas - Paralelo B',
    'Base de Datos Avanzada - Paralelo A'

  ];



  asignaturaSeleccionada:string = this.asignaturas[0];



  fechaRegistro:string = '2026-07-21';



  estudiantes:Estudiante[] = [];



  totalPresentes:number = 0;

  totalAtrasos:number = 0;

  totalFaltas:number = 0;





  ngOnInit():void {

    this.cargarAsistencia();

  }





  cargarAsistencia():void {


    this.asistenciaService.obtenerAsistencia()
    .subscribe({


      next:(data)=>{


        if(data.length > 0){

          this.estudiantes = data[0].estudiantes;

        }


        this.calcularMetricas();


      },



      error:(error)=>{


        console.warn(
          'Backend no disponible. Usando datos temporales.',
          error
        );


        this.estudiantes = [

          {
            id:1,
            nombre:'Mendez Xiomara',
            iniciales:'XM',
            correo:'xiomara.mendez@yavirac.edu.ec',
            estado:'P',
            observacion:''
          },


          {
            id:2,
            nombre:'Flores Byron',
            iniciales:'BF',
            correo:'byron.flores@yavirac.edu.ec',
            estado:'A',
            observacion:'Llegó tarde'
          },


          {
            id:3,
            nombre:'Taquez Karen',
            iniciales:'KT',
            correo:'karen.taquez@yavirac.edu.ec',
            estado:'F',
            observacion:'Sin justificación'
          },


          {
            id:4,
            nombre:'Almeida Carlos',
            iniciales:'CA',
            correo:'carlos.almeida@yavirac.edu.ec',
            estado:'P',
            observacion:''
          },


          {
            id:5,
            nombre:'Castro Ana',
            iniciales:'AC',
            correo:'ana.castro@yavirac.edu.ec',
            estado:'P',
            observacion:''
          }


        ];



        this.calcularMetricas();


      }



    });


  }







  cambiarEstado(
    estudianteId:number,
    nuevoEstado:'P'|'A'|'F'
  ):void {


    const estudiante =
    this.estudiantes.find(
      e=>e.id===estudianteId
    );



    if(estudiante){


      estudiante.estado = nuevoEstado;



      if(nuevoEstado==='P'){

        estudiante.observacion='';

      }



      if(nuevoEstado==='F' && !estudiante.observacion){

        estudiante.observacion =
        'Sin justificación registrada';

      }



      this.calcularMetricas();


    }


  }







  calcularMetricas():void {


    this.totalPresentes =
    this.estudiantes.filter(
      e=>e.estado==='P'
    ).length;



    this.totalAtrasos =
    this.estudiantes.filter(
      e=>e.estado==='A'
    ).length;



    this.totalFaltas =
    this.estudiantes.filter(
      e=>e.estado==='F'
    ).length;


  }







  guardarAsistencia():void {



    const registro:RegistroAsistencia = {


      asignatura:
      this.asignaturaSeleccionada,



      fecha:
      this.fechaRegistro,



      estudiantes:
      this.estudiantes


    };





    this.asistenciaService.guardarAsistencia(registro)
    .subscribe({



      next:()=>{


        alert(
          'Asistencia guardada correctamente'
        );


      },



      error:(error)=>{


        console.error(
          'Error enviando asistencia',
          error
        );



        alert(
          'Registro preparado. Backend pendiente de conexión.'
        );


      }



    });



  }




}