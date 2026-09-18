import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



/* =====================================================
   INTERFACE MATERIA
===================================================== */


export interface Materia {

  id: number;
  nombre: string;
  codigo: string;
  descripcion: string;
  carrera: string;
  curso: string;
  semestre: string;
  horas: number;
  docente: string;
  estado: 'Activo' | 'Inactivo';

}



/* =====================================================
   RESPUESTA BACKEND
===================================================== */


export interface RespuestaMaterias {

  total: number;
  activas: number;
  horas: number;
  materias: Materia[];

}



@Injectable({
  providedIn: 'root'
})

export class MateriasService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000/api';



  /* =====================================================
     OBTENER MATERIAS
  ===================================================== */

  obtenerMaterias(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/materias`);
  }



  /* =====================================================
     CREAR MATERIA
  ===================================================== */

  crearMateria(materia: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/materias`, materia);
  }



  /* =====================================================
     ACTUALIZAR MATERIA
  ===================================================== */

  actualizarMateria(id: number, materia: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/materias/${id}`, materia);
  }



  /* =====================================================
     ELIMINAR MATERIA
  ===================================================== */

  eliminarMateria(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/materias/${id}`);
  }

}