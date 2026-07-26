import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';



/* =====================================================
   INTERFACE MATERIA
===================================================== */


export interface Materia {


  id:number;

  nombre:string;

  codigo:string;

  descripcion:string;

  carrera:string;

  curso:string;

  semestre:string;

  horas:number;

  docente:string;

  estado:'Activo' | 'Inactivo';


}





/* =====================================================
   RESPUESTA BACKEND
===================================================== */


export interface RespuestaMaterias {


  total:number;

  activas:number;

  horas:number;

  materias:Materia[];


}







@Injectable({

  providedIn:'root'

})


export class MateriasService {



  private http = inject(HttpClient);



  /*
    URL futura NestJS

    Ejemplo:

    http://localhost:3000/api

  */


  private apiUrl = 'http://localhost:3000/api';







  /* =====================================================
     OBTENER MATERIAS
  ===================================================== */


  obtenerMaterias():Observable<RespuestaMaterias>{



    /*
      Cuando exista backend cambiar por:

      return this.http.get<RespuestaMaterias>(
        `${this.apiUrl}/materias`
      );

    */



    const respuestaTemporal:RespuestaMaterias = {


      total:5,


      activas:5,


      horas:20,


      materias:[


        {


          id:1,

          nombre:'Base de Datos',

          codigo:'BD001',

          descripcion:'Diseño y administración de bases de datos',

          carrera:'Desarrollo de Software',

          curso:'5to A',

          semestre:'Quinto',

          horas:4,

          docente:'Xiomara Mendez',

          estado:'Activo'


        },


        {


          id:2,

          nombre:'Programación Web',

          codigo:'PW001',

          descripcion:'Desarrollo de aplicaciones web',

          carrera:'Desarrollo de Software',

          curso:'5to A',

          semestre:'Quinto',

          horas:5,

          docente:'Xiomara Mendez',

          estado:'Activo'


        },


        {


          id:3,

          nombre:'Ingeniería de Software',

          codigo:'IS001',

          descripcion:'Metodologías y procesos de software',

          carrera:'Desarrollo de Software',

          curso:'6to A',

          semestre:'Sexto',

          horas:4,

          docente:'Xiomara Mendez',

          estado:'Activo'


        }


      ]


    };



    return of(respuestaTemporal);



  }









  /* =====================================================
     CREAR MATERIA
  ===================================================== */


  crearMateria(

    materia:Materia

  ):Observable<Materia>{



    /*
      Backend futuro:

      return this.http.post<Materia>(
        `${this.apiUrl}/materias`,
        materia
      );

    */



    return of(materia);



  }









  /* =====================================================
     ACTUALIZAR MATERIA
  ===================================================== */


  actualizarMateria(

    id:number,

    materia:Materia

  ):Observable<Materia>{



    /*
      Backend futuro:

      return this.http.put<Materia>(
        `${this.apiUrl}/materias/${id}`,
        materia
      );

    */



    return of(materia);



  }









  /* =====================================================
     ELIMINAR MATERIA
  ===================================================== */


  eliminarMateria(

    id:number

  ):Observable<boolean>{



    /*
      Backend futuro:

      return this.http.delete<boolean>(
        `${this.apiUrl}/materias/${id}`
      );

    */



    return of(true);



  }





}