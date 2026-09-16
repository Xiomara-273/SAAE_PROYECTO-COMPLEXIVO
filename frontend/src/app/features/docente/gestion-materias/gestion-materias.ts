import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// ===============================
// INTERFACE MATERIA
// ===============================

interface Materia {


  id: number;

  codigo: string;

  nombre: string;

  descripcion: string;

  carrera: string;

  docente: string;

  curso: string;

  horario: string;

  aula: string;

  estado: string;


}






@Component({

  selector: 'app-gestion-materias',

  standalone: true,

  imports: [

    CommonModule,

    FormsModule

  ],

  templateUrl: './gestion-materias.html',

  styleUrl: './gestion-materias.scss'


})


export class GestionMateriasComponent {



  // ===============================
  // VARIABLES PRINCIPALES
  // ===============================


  materias: Materia[] = [



    {


      id:1,

      codigo:'MAT-001',

      nombre:'Programación Web',

      descripcion:'Desarrollo de aplicaciones web con tecnologías modernas.',

      carrera:'Desarrollo de Software',

      docente:'Ing. Carlos Ramírez',

      curso:'3ro A',

      horario:'Lunes 08:00 - 10:00',

      aula:'Laboratorio 1',

      estado:'Activo'


    },






    {


      id:2,

      codigo:'MAT-002',

      nombre:'Base de Datos',

      descripcion:'Diseño y administración de bases de datos relacionales.',

      carrera:'Desarrollo de Software',

      docente:'Ing. María López',

      curso:'2do B',

      horario:'Martes 10:00 - 12:00',

      aula:'Laboratorio 2',

      estado:'Activo'


    },







    {


      id:3,

      codigo:'MAT-003',

      nombre:'Análisis de Sistemas',

      descripcion:'Modelado y análisis de requerimientos.',

      carrera:'Tecnologías de la Información',

      docente:'Ing. José Morales',

      curso:'4to A',

      horario:'Miércoles 14:00 - 16:00',

      aula:'Aula 203',

      estado:'Inactivo'


    }



  ];







  // ===============================
  // LISTAS SELECT
  // ===============================


  carreras:string[]=[


    'Desarrollo de Software',

    'Tecnologías de la Información',

    'Administración'


  ];







  cursos:string[]=[


    '1ro A',

    '2do A',

    '2do B',

    '3ro A',

    '4to A'


  ];







  docentes:string[]=[


    'Ing. Carlos Ramírez',

    'Ing. María López',

    'Ing. José Morales'


  ];







  // ===============================
  // FILTROS
  // ===============================


  materiasFiltradas: Materia[]=[];



  textoBusqueda:string='';



  carreraSeleccionada:string='';



  estadoSeleccionado:string='';







  // ===============================
  // MODALES
  // ===============================


  mostrarModal:boolean=false;



  mostrarDetalles:boolean=false;



  modoEdicion:boolean=false;







  materiaSeleccionada!:Materia;







  materiaActual:Materia={



    id:0,

    codigo:'',

    nombre:'',

    descripcion:'',

    carrera:'',

    docente:'',

    curso:'',

    horario:'',

    aula:'',

    estado:'Activo'


  };







  constructor(){


    this.materiasFiltradas=[...this.materias];


  }







  // ===============================
  // KPI
  // ===============================


  get docentesActivos(){


    return this.docentes.length;


  }




  get cursosActivos(){


    return this.cursos.length;


  }
  // ===============================
// FILTROS Y BUSQUEDA
// ===============================


filtrarMaterias(){


  this.materiasFiltradas = this.materias.filter((materia)=>{



    const texto = this.textoBusqueda
      .toLowerCase()
      .trim();



    const coincideTexto =

      materia.nombre
      .toLowerCase()
      .includes(texto)

      ||

      materia.codigo
      .toLowerCase()
      .includes(texto)

      ||

      materia.docente
      .toLowerCase()
      .includes(texto);





    const coincideCarrera =

      this.carreraSeleccionada === ''

      ||

      materia.carrera === this.carreraSeleccionada;






    const coincideEstado =


      this.estadoSeleccionado === ''

      ||

      materia.estado === this.estadoSeleccionado;







    return (

      coincideTexto

      &&

      coincideCarrera

      &&

      coincideEstado

    );



  });



}








// ===============================
// ABRIR MODAL CREAR
// ===============================


abrirModalCrear(){



  this.modoEdicion=false;



  this.materiaActual={


    id:0,

    codigo:'',

    nombre:'',

    descripcion:'',

    carrera:'',

    docente:'',

    curso:'',

    horario:'',

    aula:'',

    estado:'Activo'


  };



  this.mostrarModal=true;



}









// ===============================
// CERRAR MODAL
// ===============================


cerrarModal(){


  this.mostrarModal=false;


}









// ===============================
// GUARDAR MATERIA
// ===============================


guardarMateria(){



  if(this.modoEdicion){



    const index = this.materias.findIndex(


      m => m.id === this.materiaActual.id


    );





    if(index !== -1){


      this.materias[index] = {


        ...this.materiaActual


      };


    }





  }

  else{



    const nuevaMateria:Materia={



      ...this.materiaActual,

      id:

      this.materias.length + 1



    };





    this.materias.push(nuevaMateria);



  }





  this.filtrarMaterias();



  this.cerrarModal();



}








// ===============================
// EDITAR
// ===============================


editarMateria(materia:Materia){



  this.modoEdicion=true;



  this.materiaActual={



    ...materia



  };




  this.mostrarModal=true;



}









// ===============================
// ELIMINAR
// ===============================


eliminarMateria(id:number){



  const confirmar = confirm(

    '¿Está seguro de eliminar esta materia?'

  );





  if(confirmar){



    this.materias = this.materias.filter(


      materia => materia.id !== id


    );





    this.filtrarMaterias();



  }



}









// ===============================
// DETALLES
// ===============================


verDetalles(materia:Materia){



  this.materiaSeleccionada = {


    ...materia


  };




  this.mostrarDetalles=true;



}









cerrarDetalles(){


  this.mostrarDetalles=false;


}
// ===============================
// CICLO DE VIDA
// ===============================


ngOnInit(){


  this.filtrarMaterias();


}






}