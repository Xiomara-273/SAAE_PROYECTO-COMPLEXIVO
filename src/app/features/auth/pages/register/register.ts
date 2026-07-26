import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Auth } from '../../../../core/services/auth';



@Component({

  selector:'app-register',

  standalone:true,

  imports:[

    CommonModule,
    FormsModule,
    RouterLink

  ],

  templateUrl:'./register.html',

  styleUrl:'./register.scss'

})


export class RegisterComponent {



  private authService = inject(Auth);





  usuario = {


    nombre:'',

    correo:'',

    username:'',

    password:''


  };





  confirmarPassword = '';



  mostrarPassword = false;


  mostrarConfirmacion = false;



  nivelPassword = 0;


  mensajePassword = '';


  passwordCoincide = false;


  mensaje = '';






  evaluarPassword(){



    const password =
    this.usuario.password;



    let nivel = 0;




    if(password.length >= 6){

      nivel++;

    }



    if(/[A-Z]/.test(password)){

      nivel++;

    }



    if(/[0-9]/.test(password)){

      nivel++;

    }



    if(/[^A-Za-z0-9]/.test(password)){

      nivel++;

    }





    this.nivelPassword = nivel;





    switch(nivel){


      case 0:

        this.mensajePassword='';

        break;



      case 1:

        this.mensajePassword='Débil';

        break;



      case 2:

        this.mensajePassword='Media';

        break;



      case 3:

        this.mensajePassword='Buena';

        break;



      case 4:

        this.mensajePassword='Fuerte';

        break;



    }



    this.validarPassword();


  }








  validarPassword(){


    this.passwordCoincide =
    this.usuario.password === this.confirmarPassword;



  }








  registrar(){



    this.validarPassword();




    if(

      !this.usuario.nombre ||

      !this.usuario.correo ||

      !this.usuario.username ||

      !this.usuario.password

    ){


      alert(
        'Complete todos los campos'
      );


      return;


    }






    if(this.nivelPassword < 3){


      alert(
        'La contraseña debe ser más segura'
      );


      return;


    }







    if(!this.passwordCoincide){


      alert(
        'Las contraseñas no coinciden'
      );


      return;


    }






    this.authService
    .registrar(this.usuario)
    .subscribe({



      next:(respuesta)=>{


        console.log(
          respuesta
        );


        alert(
          'Registro realizado correctamente'
        );


      },



      error:(error)=>{


        console.error(
          error
        );


        alert(
          'Error al registrar usuario'
        );


      }



    });



  }





}