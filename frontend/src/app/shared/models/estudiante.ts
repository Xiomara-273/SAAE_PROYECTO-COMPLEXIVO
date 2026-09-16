export interface Estudiante {

  id:number;

  nombre:string;

  apellido?:string;

  nombreCompleto?:string;

  cedula?:string;

  correo:string;

  telefono?:string;

  carrera?:string;

  semestre?:string;

  paralelo?:string;


  // Datos usados en control de asistencia

  iniciales?:string;

  estado?:'P'|'A'|'F';

  observacion?:string;



  // Datos de analítica

  porcentajeAsistencia?:number;

  totalFaltas?:number;

  totalAtrasos?:number;


  estadoRiesgo?:'Normal'|'Advertencia'|'Crítico';


}