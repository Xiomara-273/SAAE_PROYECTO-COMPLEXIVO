import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { RevisionJustificaciones } from '../../../core/services/revision-justificaciones';



interface Justificacion {

  id:number;

  estudiante:string;

  materia:string;

  fecha:string;

  motivo:string;

  archivo:string;

  estado:'Pendiente'|'Aprobada'|'Rechazada';

}





@Component({

  selector:'app-revision-justificaciones',

  standalone:true,

  imports:[
    CommonModule,
    RouterModule
  ],

  templateUrl:'./revision-justificaciones.html',

  styleUrl:'./revision-justificaciones.scss'

})


export class RevisionJustificacionesComponent implements OnInit {



  private servicio = inject(
    RevisionJustificaciones
  );





  solicitudes:Justificacion[]=[];





  pendientes:number = 0;

  aprobadas:number = 0;

  rechazadas:number = 0;








  ngOnInit():void{


    this.cargarSolicitudes();


  }







  cargarSolicitudes(){



    this.servicio
    .obtenerSolicitudes()
    .subscribe({



      next:(data:any)=>{


        this.solicitudes = data;


        this.calcularEstados();


      },



      error:(error:any)=>{


        console.warn(
          'No hay conexión con justificaciones',
          error
        );


        this.cargarDatosDemo();


      }



    });



  }







  cargarDatosDemo(){



    this.solicitudes=[



      {

        id:1,

        estudiante:'Mendez Xiomara',

        materia:'Arquitectura de Sistemas',

        fecha:'2026-07-15',

        motivo:'Calamidad doméstica',

        archivo:'certificado.pdf',

        estado:'Pendiente'

      },



      {

        id:2,

        estudiante:'Flores Byron',

        materia:'Desarrollo de Software V',

        fecha:'2026-07-10',

        motivo:'Problemas de transporte',

        archivo:'foto.jpg',

        estado:'Aprobada'

      },



      {

        id:3,

        estudiante:'Taquez Karen',

        materia:'Base de Datos Avanzada',

        fecha:'2026-07-08',

        motivo:'Situación personal',

        archivo:'documento.pdf',

        estado:'Rechazada'

      }



    ];



    this.calcularEstados();



  }









  calcularEstados(){



    this.pendientes =
    this.solicitudes.filter(
      item=>item.estado==='Pendiente'
    ).length;




    this.aprobadas =
    this.solicitudes.filter(
      item=>item.estado==='Aprobada'
    ).length;




    this.rechazadas =
    this.solicitudes.filter(
      item=>item.estado==='Rechazada'
    ).length;



  }









  aprobar(id:number){



    this.servicio
    .aprobarSolicitud(id)
    .subscribe({



      next:()=>{


        this.cargarSolicitudes();


      },



      error:()=>{


        const solicitud =
        this.solicitudes.find(
          item=>item.id===id
        );


        if(solicitud){

          solicitud.estado='Aprobada';

          this.calcularEstados();

        }


      }



    });



  }









  rechazar(id:number){



    this.servicio
    .rechazarSolicitud(id)
    .subscribe({



      next:()=>{


        this.cargarSolicitudes();


      },



      error:()=>{


        const solicitud =
        this.solicitudes.find(
          item=>item.id===id
        );


        if(solicitud){

          solicitud.estado='Rechazada';

          this.calcularEstados();

        }


      }



    });



  }





}
