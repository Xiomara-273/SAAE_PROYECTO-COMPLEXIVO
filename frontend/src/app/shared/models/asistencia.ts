export interface Asistencia {

  id:number;


  // Estudiante registrado

  estudianteId:number;

  estudianteNombre:string;



  // Información académica

  asignatura:string;

  paralelo:string;

  docente:string;



  // Fecha del registro

  fecha:string;



  // Estado de asistencia

  estado:'P'|'A'|'F';



  // Comentario realizado por el docente

  observacion?:string;



  // Control de auditoría

  registradoPor?:string;

  fechaRegistro?:string;


}