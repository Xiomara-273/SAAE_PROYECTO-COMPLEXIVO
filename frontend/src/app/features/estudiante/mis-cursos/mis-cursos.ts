import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Cursos } from '../../../core/services/cursos';
import { Auth } from '../../../core/services/auth';


// ===============================
// INTERFACES
// ===============================

export interface Estudiante {
  id: number;
  nombreCompleto: string;
  carrera: string;
  correo: string;
  codigo: string;
}

export interface Docente {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
}

export interface Curso {
  id: number;
  nombreCurso: string;
  codigoCurso: string;
  descripcion: string;
  modalidad: string;
  horario: string;
  aula: string;
  docente: Docente;
  estado: string;
}

export interface ModalData {
  titulo: string;
  mensaje: string;
  tipo: 'info' | 'success' | 'warning' | 'error';
}


// ===============================
// COMPONENTE
// ===============================

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-cursos.html',
  styleUrl: './mis-cursos.scss'
})

export class MisCursos implements OnInit {

  private cursosService = inject(Cursos);
  private authService = inject(Auth);


  // ===============================
  // ESTUDIANTE (desde sesión real)
  // ===============================

  estudiante = signal<Estudiante>({
    id: 0,
    nombreCompleto: '',
    carrera: '',
    correo: '',
    codigo: ''
  });


  // ===============================
  // CURSOS (desde backend)
  // ===============================

  cursos = signal<Curso[]>([]);

  cargando = signal(false);
  mensajeError = signal('');


  // ===============================
  // MODAL
  // ===============================

  modalVisible = signal(false);

  modal = signal<ModalData>({
    titulo: '',
    mensaje: '',
    tipo: 'info'
  });

  cursoSeleccionado = signal<Curso | null>(null);


  ngOnInit(): void {
    this.cargarEstudiante();
    this.cargarCursos();
  }


  // ===============================
  // CARGAR DATOS DEL ESTUDIANTE DESDE SESIÓN
  // ===============================

  cargarEstudiante(): void {
    const usuario = this.authService.obtenerUsuario();
    if (usuario) {
      this.estudiante.set({
        id: usuario.id,
        nombreCompleto: `${usuario.nombres} ${usuario.apellidos}`,
        carrera: '',
        correo: usuario.correo,
        codigo: usuario.cedula
      });
    }
  }


  // ===============================
  // CARGAR CURSOS DESDE BACKEND
  // ===============================

  cargarCursos(): void {
    this.cargando.set(true);
    this.mensajeError.set('');

    this.cursosService.obtenerCursos().subscribe({

      next: (data: any[]) => {
        this.cargando.set(false);
        // Mapear la respuesta del backend al formato del componente
        const cursosFormateados: Curso[] = data.map(c => ({
          id: c.id,
          nombreCurso: c.nombre || c.nombreCurso || '',
          codigoCurso: c.periodo || c.codigoCurso || '',
          descripcion: c.materia?.nombre || '',
          modalidad: 'Presencial',
          horario: '',
          aula: '',
          estado: c.estado ? 'Activo' : 'Inactivo',
          docente: {
            id: c.docente?.id || 0,
            nombre: c.docente?.nombres || '',
            apellido: c.docente?.apellidos || '',
            correo: c.docente?.correo || ''
          }
        }));
        this.cursos.set(cursosFormateados);
      },

      error: (err) => {
        this.cargando.set(false);
        console.warn('Error al cargar cursos:', err);
        this.mensajeError.set('Error al cargar los cursos. Verifique la conexión con el servidor.');
      }

    });
  }


  // ===============================
  // VER CURSO
  // ===============================

  verCurso(curso: Curso): void {
    this.cursoSeleccionado.set(curso);
    this.abrirModal({
      titulo: curso.nombreCurso,
      mensaje: `Código: ${curso.codigoCurso}\n\nDocente: ${curso.docente.nombre} ${curso.docente.apellido}\n\nHorario: ${curso.horario}\n\nAula: ${curso.aula}\n\nModalidad: ${curso.modalidad}`,
      tipo: 'info'
    });
  }


  // ===============================
  // VER DOCENTE
  // ===============================

  verDocente(curso: Curso): void {
    this.abrirModal({
      titulo: 'Docente asignado',
      mensaje: `${curso.docente.nombre} ${curso.docente.apellido}\n\nCorreo: ${curso.docente.correo}`,
      tipo: 'success'
    });
  }


  // ===============================
  // MODAL
  // ===============================

  abrirModal(data: ModalData): void {
    this.modal.set(data);
    this.modalVisible.set(true);
  }

  cerrarModal(): void {
    this.modalVisible.set(false);
  }


  // ===============================
  // UTILIDAD
  // ===============================

  cantidadCursos(): number {
    return this.cursos().length;
  }

}