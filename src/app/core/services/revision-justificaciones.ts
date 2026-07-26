import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn:'root'
})
export class RevisionJustificaciones {


  private http = inject(HttpClient);



  private apiUrl =
  'http://localhost:5000/api/justificaciones';





  obtenerSolicitudes():Observable<any>{


    return this.http.get<any>(
      this.apiUrl
    );


  }







  aprobarSolicitud(
    id:number
  ):Observable<any>{


    return this.http.put<any>(
      `${this.apiUrl}/${id}/aprobar`,
      {}
    );


  }







  rechazarSolicitud(
    id:number
  ):Observable<any>{


    return this.http.put<any>(
      `${this.apiUrl}/${id}/rechazar`,
      {}
    );


  }



}