import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class JustificacionesService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000/api/justificaciones';


  // ===============================
  // OBTENER JUSTIFICACIONES DEL ESTUDIANTE
  // ===============================

  obtenerMisJustificaciones(estudianteId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      params: { estudianteId: estudianteId.toString() }
    });
  }


  // ===============================
  // ENVIAR JUSTIFICACIÓN
  // ===============================

  enviarJustificacion(datos: {
    estudianteId: number;
    asistenciaId?: number;
    motivo: string;
    archivoUrl?: string;
  }): Observable<any> {
    return this.http.post<any>(this.apiUrl, datos);
  }

}
