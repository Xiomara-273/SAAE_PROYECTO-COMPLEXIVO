import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MetricasAsistencia } from '../../shared/models/metricas-asistencia';



@Injectable({
  providedIn: 'root'
})
export class AnaliticaService {


  private http = inject(HttpClient);



  private apiUrl =
  'http://localhost:5000/api/analitica';




  obtenerMetricas(
    carrera:string,
    paralelo:string
  ):Observable<MetricasAsistencia>{



    return this.http.get<MetricasAsistencia>(
      this.apiUrl,
      {
        params:{
          carrera,
          paralelo
        }
      }
    );


  }



}