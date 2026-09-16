import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';



/*
=====================================================
 INTERFACES
=====================================================
*/


export interface FiltrosReporte {

  periodo?: string;

  carrera?: string;

  curso?: string;

  materia?: string;

}



export interface IndicadoresReporte {

  asistencia:number;

  estudiantes:number;

  riesgo:number;

  justificaciones:number;

}



export interface DetalleReporte {


  estudiante:string;

  carrera:string;

  curso:string;

  asistencia:number;

  estado:string;


}



export interface RespuestaReporte {


  indicadores:IndicadoresReporte;

  detalle:DetalleReporte[];


}






@Injectable({

  providedIn:'root'

})


export class Reportes {



  private http = inject(HttpClient);



  /*
  ================================================
   URL BACKEND

   Después cambiamos por la URL real de tu API

   Ejemplo:
   http://localhost:5000/api/reportes

  ================================================
  */


  private apiUrl = 'http://localhost:5000/api/reportes';







  /*
  ================================================
    OBTENER REPORTE
  ================================================
  */


  obtenerReporte(

    filtros:FiltrosReporte

  ):Observable<RespuestaReporte>{



    let params = new HttpParams();



    if(filtros.periodo){

      params=params.set(
        'periodo',
        filtros.periodo
      );

    }



    if(filtros.carrera){

      params=params.set(
        'carrera',
        filtros.carrera
      );

    }



    if(filtros.curso){

      params=params.set(
        'curso',
        filtros.curso
      );

    }



    if(filtros.materia){

      params=params.set(
        'materia',
        filtros.materia
      );

    }



    return this.http.get<RespuestaReporte>(

      `${this.apiUrl}`,

      {
        params
      }

    );


  }







  /*
  ================================================
    GENERAR PDF
  ================================================
  */


  generarPDF(

    filtros:FiltrosReporte

  ):Observable<Blob>{



    return this.http.post(

      `${this.apiUrl}/pdf`,

      filtros,

      {

        responseType:'blob'

      }

    );


  }








  /*
  ================================================
    GENERAR EXCEL
  ================================================
  */


  generarExcel(

    filtros:FiltrosReporte

  ):Observable<Blob>{



    return this.http.post(

      `${this.apiUrl}/excel`,

      filtros,

      {

        responseType:'blob'

      }

    );


  }





}