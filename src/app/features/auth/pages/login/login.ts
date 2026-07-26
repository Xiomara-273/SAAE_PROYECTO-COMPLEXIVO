import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import {
  Router,
  RouterModule
} from '@angular/router';


import { Auth } from '../../../../core/services/auth';



@Component({

  selector:'app-login',

  standalone:true,

  imports:[

    CommonModule,
    ReactiveFormsModule,
    RouterModule

  ],

  templateUrl:'./login.html',

  styleUrl:'./login.scss'

})


export class LoginComponent implements OnInit {



  private fb = inject(FormBuilder);

  private router = inject(Router);

  private authService = inject(Auth);





  loginForm!:FormGroup;



  mostrarPassword = false;


  mostrarRecuperar = false;


  cargando = false;


  mensajeError = '';






  ngOnInit():void {



    this.loginForm = this.fb.group({



      email:[

        '',

        [

          Validators.required,

          Validators.email

        ]

      ],





      password:[

        '',

        [

          Validators.required,

          Validators.minLength(6)

        ]

      ]



    });



  }








  abrirRecuperar():void{


    this.mostrarRecuperar = true;


  }








  cerrarRecuperar():void{


    this.mostrarRecuperar = false;


  }








  enviarCodigo():void{


    alert(
      'Se enviará el código de recuperación al correo institucional.'
    );


    this.cerrarRecuperar();


  }









  onSubmit():void{



    if(this.loginForm.invalid){


      this.loginForm.markAllAsTouched();


      return;


    }





    this.cargando = true;


    this.mensajeError = '';





    this.authService
    .login(this.loginForm.value)
    .subscribe({





      next:(respuesta:any)=>{



        console.log(
          'RESPUESTA LOGIN:',
          respuesta
        );




        this.cargando = false;





        if(respuesta.rol === 'docente'){



          this.router.navigate([
            '/docente/dashboard'
          ]);



        }

        else if(respuesta.rol === 'estudiante'){



          this.router.navigate([
            '/estudiante/dashboard'
          ]);



        }

        else {



          console.warn(
            'Rol no reconocido',
            respuesta
          );



          this.router.navigate([
            '/docente/dashboard'
          ]);



        }



      },







      error:(error:any)=>{



        console.error(
          'ERROR LOGIN:',
          error
        );



        this.cargando = false;



        this.mensajeError =
        'Correo o contraseña incorrectos';



      }





    });



  }





}