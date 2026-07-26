import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { 
  ConfiguracionService,
  PerfilUsuario,
  ConfiguracionSistema
} from '../../../../core/services/configuracion';



@Component({

  selector:'app-configuracion',

  standalone:true,

  imports:[

    CommonModule,

    FormsModule

  ],

  templateUrl:'./configuracion.html',

  styleUrl:'./configuracion.scss'

})



export class Configuracion implements OnInit {



  private configuracionService = inject(ConfiguracionService);




  // ==================================
  // PERFIL DEL USUARIO
  // ==================================


  perfil:PerfilUsuario = {


    nombre:'',

    apellido:'',

    correo:'',

    telefono:'',

    rol:''


  };





  // ==================================
  // CONFIGURACIÓN DEL SISTEMA
  // ==================================


  sistema:ConfiguracionSistema = {


    notificaciones:true,

    modoOscuro:false,

    idioma:'Español'


  };





  // ==================================
  // CAMBIO DE CONTRASEÑA
  // ==================================


  password = {


    actual:'',

    nueva:'',

    confirmar:''


  };





  mensaje:string = '';

  cargando:boolean = false;







  ngOnInit():void{


    this.cargarPerfil();

    this.cargarConfiguracion();


  }








  // ==================================
  // OBTENER PERFIL
  // ==================================


  cargarPerfil():void{


    this.configuracionService

    .obtenerPerfil()

    .subscribe({


      next:(respuesta:PerfilUsuario)=>{


        this.perfil = respuesta;


      },


      error:(error:any)=>{


        console.error(

          'Error cargando perfil',

          error

        );


        // Datos temporales mientras existe backend

        this.perfil = {


          nombre:'Xiomara',

          apellido:'Mendez',

          correo:'usuario@yavirac.edu.ec',

          telefono:'0999999999',

          rol:'Estudiante'


        };


      }


    });


  }








  // ==================================
  // ACTUALIZAR PERFIL
  // ==================================


  guardarPerfil():void{


    this.cargando=true;


    this.configuracionService

    .actualizarPerfil(this.perfil)

    .subscribe({


      next:()=>{


        this.mensaje =

        'Perfil actualizado correctamente';


        this.cargando=false;


      },


      error:(error:any)=>{


        console.error(

          'Error actualizando perfil',

          error

        );


        this.mensaje =

        'Error al actualizar perfil';


        this.cargando=false;


      }


    });


  }








  // ==================================
  // OBTENER CONFIGURACIÓN
  // ==================================


  cargarConfiguracion():void{


    this.configuracionService

    .obtenerConfiguracion()

    .subscribe({


      next:(respuesta:ConfiguracionSistema)=>{


        this.sistema = respuesta;


      },


      error:(error:any)=>{


        console.error(

          'Error cargando configuración',

          error

        );


      }


    });


  }








  // ==================================
  // GUARDAR CONFIGURACIÓN
  // ==================================


  guardarConfiguracion():void{


    this.configuracionService

    .guardarConfiguracion(this.sistema)

    .subscribe({


      next:()=>{


        this.mensaje =

        'Configuración guardada correctamente';


      },


      error:(error:any)=>{


        console.error(

          'Error guardando configuración',

          error

        );


        this.mensaje =

        'Error al guardar configuración';


      }


    });


  }








  // ==================================
  // CAMBIAR CONTRASEÑA
  // ==================================


  cambiarPassword():void{


    if(

      this.password.nueva !== 

      this.password.confirmar

    ){


      this.mensaje =

      'Las contraseñas no coinciden';


      return;


    }





    this.configuracionService

    .cambiarPassword(this.password)

    .subscribe({


      next:()=>{


        this.mensaje =

        'Contraseña actualizada correctamente';



        this.password = {


          actual:'',

          nueva:'',

          confirmar:''


        };


      },


      error:(error:any)=>{


        console.error(

          'Error cambiando contraseña',

          error

        );


        this.mensaje =

        'Error al cambiar contraseña';


      }


    });


  }





}