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

import { Auth } from '../../../core/services/auth';

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
  private authService = inject(Auth);

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
    alert('Se enviará el código de recuperación al correo institucional.');
    this.cerrarRecuperar();
  }

  onSubmit(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    const datos = {
      correo: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(datos).subscribe({

      next: (res) => {
        this.cargando = false;
        const rol = res.usuario?.rol;

        if (rol === 'ESTUDIANTE') {
          this.router.navigate(['/estudiante/dashboard']);
        } else {
          // DOCENTE y ADMIN van al dashboard docente
          this.router.navigate(['/docente/dashboard']);
        }
      },

      error: (err) => {
        this.cargando = false;
        this.mensajeError =
          err?.error?.message ||
          'Correo o contraseña incorrectos. Intente nuevamente.';
      }

    });

  }

}