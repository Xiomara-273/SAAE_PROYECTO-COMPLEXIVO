import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


// ===============================
// INTERFACES
// ===============================


export interface Estudiante {

  id:number;

  nombreCompleto:string;

  carrera:string;

  correo:string;

  codigo:string;

}



export interface Docente {

  id:number;

  nombre:string;

  apellido:string;

  correo:string;

}



export interface Curso {


  id:number;

  nombreCurso:string;

  codigoCurso:string;

  descripcion:string;

  modalidad:string;

  horario:string;

  aula:string;

  docente:Docente;

  estado:string;


}




// ===============================
// MODAL
// ===============================


export interface ModalData {


  titulo:string;

  mensaje:string;

  tipo:
  | 'info'
  | 'success'
  | 'warning'
  | 'error';


}




// ===============================
// COMPONENTE
// ===============================


@Component({

  selector:'app-mis-cursos',

  standalone:true,

  imports:[

    CommonModule

  ],

  templateUrl:'./mis-cursos.html',

  styleUrl:'./mis-cursos.scss'

})


export class MisCursos {



  private http = inject(HttpClient);



  // ===============================
  // API FUTURA NESTJS
  // ===============================


  private API_URL =
  'http://localhost:3000/api';





  // ===============================
  // ESTUDIANTE
  // ===============================


  estudiante = signal<Estudiante>({


    id:1,

    nombreCompleto:
    'Juan Pérez González',

    carrera:
    'Ingeniería en Software',

    correo:
    'juan.perez@yavirac.edu.ec',

    codigo:
    'EST-2026-001'


  });







  // ===============================
  // CURSOS MOCK
  // ===============================


  cursos = signal<Curso[]>([



    {


      id:1,

      nombreCurso:
      'Programación Web',


      codigoCurso:
      'PW-101',


      descripcion:
      'Desarrollo de aplicaciones web modernas utilizando tecnologías frontend y backend.',


      modalidad:
      'Presencial',


      horario:
      'Lunes - Miércoles 08:00 - 10:00',


      aula:
      'Laboratorio 3',


      estado:
      'Activo',



      docente:{


        id:1,


        nombre:
        'Carlos',


        apellido:
        'Ramírez',


        correo:
        'carlos.ramirez@yavirac.edu.ec'


      }



    },





    {


      id:2,


      nombreCurso:
      'Base de Datos II',


      codigoCurso:
      'BD-202',


      descripcion:
      'Diseño, administración y optimización de bases de datos.',


      modalidad:
      'Híbrida',


      horario:
      'Martes - Jueves 14:00 - 16:00',


      aula:
      'Aula 204',


      estado:
      'Activo',




      docente:{


        id:2,


        nombre:
        'María',


        apellido:
        'Villacís',


        correo:
        'maria.villacis@yavirac.edu.ec'


      }



    }



  ]);








  // ===============================
  // MODAL
  // ===============================


  modalVisible = signal(false);



  modal = signal<ModalData>({


    titulo:'',


    mensaje:'',


    tipo:'info'


  });





  cursoSeleccionado =
  signal<Curso | null>(null);








  constructor(){


    this.cargarCursos();


  }








  // ===============================
  // FUTURO BACKEND
  // ===============================


  cargarCursos(){


    console.log(

      'Cursos cargados desde mock'

    );


  }









  // ===============================
  // VER CURSO
  // ===============================


  verCurso(curso:Curso){


    this.cursoSeleccionado.set(curso);



    this.abrirModal({



      titulo:
      curso.nombreCurso,



      mensaje:


      `
Código:
${curso.codigoCurso}


Docente:
${curso.docente.nombre}
${curso.docente.apellido}


Horario:
${curso.horario}


Aula:
${curso.aula}


Modalidad:
${curso.modalidad}
      `,



      tipo:
      'info'


    });



  }









  // ===============================
  // VER DOCENTE
  // ===============================


  verDocente(curso:Curso){



    this.abrirModal({



      titulo:
      'Docente asignado',



      mensaje:


      `
${curso.docente.nombre}
${curso.docente.apellido}


Correo:

${curso.docente.correo}

      `,



      tipo:
      'success'


    });



  }








  // ===============================
  // MODAL
  // ===============================


  abrirModal(data:ModalData){


    this.modal.set(data);


    this.modalVisible.set(true);


  }






  cerrarModal(){


    this.modalVisible.set(false);


  }







  // ===============================
  // UTILIDAD
  // ===============================


  cantidadCursos(){


    return this.cursos().length;


  }



}