import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { RegistroAsistencia } from '../../shared/models/registro-asistencia';


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {


  private http = inject(HttpClient);


  private apiUrl =
    'http://localhost:5000/api/asistencia';



  obtenerAsistencia(): Observable<RegistroAsistencia[]> {

    return this.http.get<RegistroAsistencia[]>(
      this.apiUrl
    );

  }



  guardarAsistencia(
    registro: RegistroAsistencia
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      registro
    );

  }



  actualizarAsistencia(
    id:number,
    registro:RegistroAsistencia
  ):Observable<any>{

    return this.http.put(
      `${this.apiUrl}/${id}`,
      registro
    );

  }



  eliminarAsistencia(
    id:number
  ):Observable<any>{

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }


}