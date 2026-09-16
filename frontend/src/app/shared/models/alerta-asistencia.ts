export interface AlertaAsistencia {

  estudiante: string;

  materia: string;

  porcentaje: number;

  tipo: 'danger' | 'warning';

  detalle: string;

  tiempo: string;

}