import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface UsuarioSesion {
  id: number;
  id_usuario: number;
  cedula: string;
  nombres: string;
  apellidos: string;
  correo: string;
  rol: 'ADMIN' | 'DOCENTE' | 'ESTUDIANTE';
  estado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'saae_token';
  private readonly USUARIO_KEY = 'saae_usuario';

  private apiUrl = 'http://localhost:5000/auth';


  // ===============================
  // LOGIN
  // ===============================

  login(datos: { correo: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, datos).pipe(
      tap(res => {
        if (res.token && res.usuario) {
          this.guardarSesion(res.token, res.usuario);
        }
      })
    );
  }


  // ===============================
  // REGISTRO
  // ===============================

  registrar(datos: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registro`, datos);
  }


  // ===============================
  // GESTIÓN DE SESIÓN
  // ===============================

  guardarSesion(token: string, usuario: UsuarioSesion): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USUARIO_KEY, JSON.stringify(usuario));
    }
  }

  obtenerToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  obtenerUsuario(): UsuarioSesion | null {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem(this.USUARIO_KEY);
      if (data) {
        try {
          return JSON.parse(data) as UsuarioSesion;
        } catch {
          return null;
        }
      }
    }
    return null;
  }

  obtenerRol(): string | null {
    const usuario = this.obtenerUsuario();
    return usuario ? usuario.rol : null;
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  cerrarSesion(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USUARIO_KEY);
    }
    this.router.navigate(['/login']);
  }

}