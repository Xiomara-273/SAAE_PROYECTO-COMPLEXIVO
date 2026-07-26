import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface DashboardEstudiante {


  nombreEstudiante:string;

  carrera:string;

  semestre:string;

  asistenciaGeneral:number;

  materias:any[];

  alertas:any[];


}





@Injectable({
  providedIn:'root'
})
export class DashboardEstudianteService {



  private http = inject(HttpClient);



  private apiUrl =
  'http://localhost:5000/api/dashboard-estudiante';






  obtenerDashboard(
    estudianteId:number
  ):Observable<DashboardEstudiante>{



    return this.http.get<DashboardEstudiante>(
      `${this.apiUrl}/${estudianteId}`
    );


  }




}