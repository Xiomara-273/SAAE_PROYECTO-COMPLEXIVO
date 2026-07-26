import { AlertaAsistencia } from './alerta-asistencia';



export interface MetricasAsistencia {


  asistenciaGlobal:string;


  totalEstudiantesRiesgo:number;


  justificacionesPendientes:number;


  alertas:AlertaAsistencia[];


}