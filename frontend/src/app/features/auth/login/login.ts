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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})

export class LoginComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm!: FormGroup;

  mostrarPassword = false;
  mostrarRecuperar = false;

  cargando = false;

  mensajeError = '';

  ngOnInit(): void {

    this.loginForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });

  }

  abrirRecuperar(): void {

    this.mostrarRecuperar = true;

  }

  cerrarRecuperar(): void {

    this.mostrarRecuperar = false;

  }

  enviarCodigo(): void {

    alert(
      'Se enviará el código de recuperación al correo institucional.'
    );

    this.cerrarRecuperar();

  }

  onSubmit(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.cargando = true;

    this.mensajeError = '';

    setTimeout(() => {

      this.cargando = false;

      const email =
        this.loginForm.value.email.toLowerCase();

      if (email.includes('docente')) {

        this.router.navigate([
          '/docente/dashboard'
        ]);

        return;

      }

      if (email.includes('estudiante')) {

        this.router.navigate([
          '/estudiante/dashboard'
        ]);

        return;

      }

      this.router.navigate([
        '/docente/dashboard'
      ]);

    }, 1000);

  }

}