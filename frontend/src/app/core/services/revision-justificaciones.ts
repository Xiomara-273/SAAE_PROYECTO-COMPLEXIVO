import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RevisionJustificaciones {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000/api/justificaciones';


  // ===============================
  // OBTENER TODAS LAS SOLICITUDES
  // ===============================

  obtenerSolicitudes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }


  // ===============================
  // APROBAR SOLICITUD
  // ===============================

  aprobarSolicitud(id: number): Observable<any> {
    return this.http.patch<any>(
      `${this.apiUrl}/${id}`,
      { estado: 'APROBADO' }
    );
  }


  // ===============================
  // RECHAZAR SOLICITUD
  // ===============================

  rechazarSolicitud(id: number, observacion?: string): Observable<any> {
    return this.http.patch<any>(
      `${this.apiUrl}/${id}`,
      {
        estado: 'RECHAZADO',
        observacionDocente: observacion || ''
      }
    );
  }

}