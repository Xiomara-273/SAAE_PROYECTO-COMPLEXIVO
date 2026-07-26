import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class Carreras {


  private apiUrl = 'http://localhost:3000/api/carreras';



  constructor(
    private http: HttpClient
  ) {}





  // ===============================
  // OBTENER CARRERAS
  // ===============================

  obtenerCarreras(){

    return this.http.get<any[]>(
      this.apiUrl
    );

  }





  // ===============================
  // OBTENER CARRERA POR ID
  // ===============================

  obtenerCarreraPorId(id:number){

    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );

  }





  // ===============================
  // CREAR CARRERA
  // ===============================

  crearCarrera(carrera:any){

    return this.http.post<any>(
      this.apiUrl,
      carrera
    );

  }





  // ===============================
  // ACTUALIZAR CARRERA
  // ===============================

  actualizarCarrera(
    id:number,
    carrera:any
  ){

    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      carrera
    );

  }





  // ===============================
  // ELIMINAR CARRERA
  // ===============================

  eliminarCarrera(id:number){

    return this.http.delete<any>(
      `${this.apiUrl}/${id}`
    );

  }


}