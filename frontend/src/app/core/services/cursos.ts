import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class Cursos {


  private apiUrl = 'http://localhost:5000/api/cursos';



  constructor(
    private http: HttpClient
  ) {}





  // ===============================
  // OBTENER CURSOS
  // ===============================

  obtenerCursos(){

    return this.http.get<any[]>(
      this.apiUrl
    );

  }





  // ===============================
  // OBTENER CURSO POR ID
  // ===============================

  obtenerCursoPorId(id:number){

    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );

  }





  // ===============================
  // CREAR CURSO
  // ===============================

  crearCurso(curso:any){

    return this.http.post<any>(
      this.apiUrl,
      curso
    );

  }





  // ===============================
  // ACTUALIZAR CURSO
  // ===============================

  actualizarCurso(
    id:number,
    curso:any
  ){

    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      curso
    );

  }





  // ===============================
  // ELIMINAR CURSO
  // ===============================

  eliminarCurso(id:number){

    return this.http.delete<any>(
      `${this.apiUrl}/${id}`
    );

  }


}