import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { Carreras } from '../../../core/services/carreras';
import { Cursos } from '../../../core/services/cursos';



@Component({
  selector: 'app-gestion-carreras',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './gestion-carreras.html',
  styleUrl: './gestion-carreras.scss',
})
export class GestionCarreras implements OnInit {



  // ===============================
  // SERVICIOS
  // ===============================


  private carrerasService = inject(Carreras);

  private cursosService = inject(Cursos);





  // ===============================
  // LISTAS
  // ===============================


  carreras:any[] = [];

  cursos:any[] = [];






  // ===============================
  // ESTADOS
  // ===============================


  cargandoCarreras = false;

  cargandoCursos = false;


  errorCarreras = '';

  errorCursos = '';






  // ===============================
  // TABS
  // ===============================


  pestanaActiva:string = 'carreras';







  // ===============================
  // MODALES
  // ===============================


  mostrarSelectorRegistro:boolean = false;


  mostrarModal:boolean = false;


  tipoRegistro:string = 'carrera';


  modoEdicion:boolean = false;


  idEditar:number | null = null;






  // ===============================
  // FORMULARIO
  // ===============================


  formulario:any = {

    nombre:'',
    codigo:'',
    descripcion:'',
    estado:'Activo',

    nombreCurso:'',
    codigoCurso:'',
    carrera:'',
    semestre:'',
    modalidad:'',
    horario:'',
    aula:'',
    docenteId:null

  };







  ngOnInit(): void {


    this.cargarCarreras();

    this.cargarCursos();


  }









  // ===============================
  // CARGAR CARRERAS
  // ===============================


  cargarCarreras(){


    this.cargandoCarreras = true;


    this.carrerasService
    .obtenerCarreras()
    .subscribe({


      next:(data)=>{


        this.carreras = data;

        this.cargandoCarreras = false;


      },


      error:(error)=>{


        console.error(error);

        this.errorCarreras =
        'Error al cargar carreras';


        this.cargandoCarreras = false;


      }


    });


  }









  // ===============================
  // CARGAR CURSOS
  // ===============================


  cargarCursos(){


    this.cargandoCursos = true;


    this.cursosService
    .obtenerCursos()
    .subscribe({


      next:(data)=>{


        this.cursos = data;

        this.cargandoCursos = false;


      },


      error:(error)=>{


        console.error(error);

        this.errorCursos =
        'Error al cargar cursos';


        this.cargandoCursos = false;


      }


    });


  }









  // ===============================
  // SELECTOR NUEVO REGISTRO
  // ===============================


  abrirSelectorRegistro(){


    this.mostrarSelectorRegistro = true;


  }





  cerrarSelectorRegistro(){


    this.mostrarSelectorRegistro = false;


  }









  // ===============================
  // ABRIR MODAL NUEVO
  // ===============================


  abrirModal(tipo:string){


    this.mostrarSelectorRegistro = false;


    this.tipoRegistro = tipo;


    this.modoEdicion = false;


    this.idEditar = null;


    this.limpiarFormulario();


    this.mostrarModal = true;


  }









  // ===============================
  // CERRAR MODAL
  // ===============================


  cerrarModal(){


    this.mostrarModal = false;


  }









  // ===============================
  // LIMPIAR FORMULARIO
  // ===============================


  limpiarFormulario(){


    this.formulario = {


      nombre:'',
      codigo:'',
      descripcion:'',
      estado:'Activo',


      nombreCurso:'',
      codigoCurso:'',
      carrera:'',
      semestre:'',
      modalidad:'',
      horario:'',
      aula:'',
      docenteId:null


    };


  }









  // ===============================
  // GUARDAR
  // ===============================


  guardar(){


    if(this.tipoRegistro === 'carrera'){


      if(this.modoEdicion && this.idEditar){


        this.carrerasService
        .actualizarCarrera(
          this.idEditar,
          this.formulario
        )
        .subscribe(()=>{


          this.cargarCarreras();

          this.cerrarModal();


        });


      }else{


        this.carrerasService
        .crearCarrera(
          this.formulario
        )
        .subscribe(()=>{


          this.cargarCarreras();

          this.cerrarModal();


        });


      }



    }







    if(this.tipoRegistro === 'curso'){


      if(this.modoEdicion && this.idEditar){


        this.cursosService
        .actualizarCurso(
          this.idEditar,
          this.formulario
        )
        .subscribe(()=>{


          this.cargarCursos();

          this.cerrarModal();


        });



      }else{


        this.cursosService
        .crearCurso(
          this.formulario
        )
        .subscribe(()=>{


          this.cargarCursos();

          this.cerrarModal();


        });



      }


    }



  }









  // ===============================
  // EDITAR CARRERA
  // ===============================


  editarCarrera(carrera:any){


    this.tipoRegistro = 'carrera';


    this.modoEdicion = true;


    this.idEditar = carrera.id;


    this.formulario = {
      ...carrera
    };


    this.mostrarModal = true;


  }









  // ===============================
  // EDITAR CURSO
  // ===============================


  editarCurso(curso:any){


    this.tipoRegistro = 'curso';


    this.modoEdicion = true;


    this.idEditar = curso.id;


    this.formulario = {
      ...curso
    };


    this.mostrarModal = true;


  }









  // ===============================
  // ELIMINAR CARRERA
  // ===============================


  eliminarCarrera(id:number){


    if(confirm('¿Desea eliminar esta carrera?')){


      this.carrerasService
      .eliminarCarrera(id)
      .subscribe(()=>{


        this.cargarCarreras();


      });


    }


  }









  // ===============================
  // ELIMINAR CURSO
  // ===============================


  eliminarCurso(id:number){


    if(confirm('¿Desea eliminar este curso?')){


      this.cursosService
      .eliminarCurso(id)
      .subscribe(()=>{


        this.cargarCursos();


      });


    }


  }




}
