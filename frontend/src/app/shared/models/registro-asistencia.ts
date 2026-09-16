import { Estudiante } from './estudiante';

export interface RegistroAsistencia {

  id?: number;

  asignatura: string;

  fecha: string;

  estudiantes: Estudiante[];

}