import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn:'root'
})
export class Auth {


  private http = inject(HttpClient);



  private apiUrl =
  'http://localhost:5000/api/auth';





  login(
    datos:any
  ):Observable<any>{


    return this.http.post<any>(
      `${this.apiUrl}/login`,
      datos
    );


  }






  registrar(
    datos:any
  ):Observable<any>{


    return this.http.post<any>(
      `${this.apiUrl}/registro`,
      datos
    );


  }





}