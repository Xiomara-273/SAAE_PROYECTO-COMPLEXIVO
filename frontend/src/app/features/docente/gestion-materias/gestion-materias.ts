import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MateriasService } from '../../../core/services/materias';
import { Carreras } from '../../../core/services/carreras';


// ===============================
// INTERFACE MATERIA
// ===============================

interface Materia {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  carrera: string;
  docente: string;
  curso: string;
  horario: string;
  aula: string;
  estado: string;
}



@Component({
  selector: 'app-gestion-materias',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './gestion-materias.html',
  styleUrl: './gestion-materias.scss'
})

export class GestionMateriasComponent implements OnInit {

  private materiasService = inject(MateriasService);
  private carrerasService = inject(Carreras);


  // ===============================
  // VARIABLES PRINCIPALES
  // ===============================

  materias: Materia[] = [];

  cargando: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';


  // ===============================
  // LISTAS SELECT (desde backend)
  // ===============================

  carreras: any[] = [];
  cursos: string[] = [];
  docentes: string[] = [];


  // ===============================
  // FILTROS
  // ===============================

  materiasFiltradas: Materia[] = [];
  textoBusqueda: string = '';
  carreraSeleccionada: string = '';
  estadoSeleccionado: string = '';


  // ===============================
  // MODALES
  // ===============================

  mostrarModal: boolean = false;
  mostrarDetalles: boolean = false;
  modoEdicion: boolean = false;

  materiaSeleccionada!: Materia;

  materiaActual: Materia = {
    id: 0,
    codigo: '',
    nombre: '',
    descripcion: '',
    carrera: '',
    docente: '',
    curso: '',
    horario: '',
    aula: '',
    estado: 'Activo'
  };


  // ===============================
  // KPI
  // ===============================

  get docentesActivos() {
    return [...new Set(this.materias.map(m => m.docente))].length;
  }

  get cursosActivos() {
    return [...new Set(this.materias.map(m => m.curso))].length;
  }


  // ===============================
  // INIT
  // ===============================

  ngOnInit(): void {
    this.cargarMaterias();
    this.cargarCarreras();
  }


  // ===============================
  // CARGAR MATERIAS DESDE BACKEND
  // ===============================

  cargarMaterias(): void {
    this.cargando = true;

    this.materiasService.obtenerMaterias().subscribe({

      next: (data: any) => {
        this.cargando = false;
        // El backend puede retornar array directo o un objeto con { materias: [] }
        const lista = Array.isArray(data) ? data : (data.materias || []);
        this.materias = lista.map((m: any) => ({
          id: m.id,
          codigo: m.codigo || '',
          nombre: m.nombre || '',
          descripcion: m.descripcion || '',
          carrera: m.carrera?.nombre || m.carrera || '',
          docente: '',
          curso: '',
          horario: '',
          aula: '',
          estado: m.estado ? 'Activo' : 'Inactivo'
        }));
        this.filtrarMaterias();
      },

      error: (err) => {
        this.cargando = false;
        console.warn('Error al cargar materias:', err);
        this.mensajeError = 'Error al cargar las materias. Verifique la conexión con el servidor.';
        setTimeout(() => this.mensajeError = '', 5000);
      }

    });
  }


  // ===============================
  // CARGAR CARRERAS PARA SELECT
  // ===============================

  cargarCarreras(): void {
    this.carrerasService.obtenerCarreras().subscribe({
      next: (data: any[]) => {
        this.carreras = data;
      },
      error: (err) => {
        console.warn('Error al cargar carreras:', err);
      }
    });
  }


  // ===============================
  // FILTROS Y BÚSQUEDA
  // ===============================

  filtrarMaterias(): void {
    this.materiasFiltradas = this.materias.filter(materia => {

      const texto = this.textoBusqueda.toLowerCase().trim();

      const coincideTexto =
        materia.nombre.toLowerCase().includes(texto) ||
        materia.codigo.toLowerCase().includes(texto) ||
        materia.docente.toLowerCase().includes(texto);

      const coincideCarrera =
        this.carreraSeleccionada === '' ||
        materia.carrera === this.carreraSeleccionada;

      const coincideEstado =
        this.estadoSeleccionado === '' ||
        materia.estado === this.estadoSeleccionado;

      return coincideTexto && coincideCarrera && coincideEstado;

    });
  }


  // ===============================
  // ABRIR MODAL CREAR
  // ===============================

  abrirModalCrear(): void {
    this.modoEdicion = false;
    this.materiaActual = {
      id: 0, codigo: '', nombre: '', descripcion: '',
      carrera: '', docente: '', curso: '',
      horario: '', aula: '', estado: 'Activo'
    };
    this.mostrarModal = true;
  }


  // ===============================
  // CERRAR MODAL
  // ===============================

  cerrarModal(): void {
    this.mostrarModal = false;
  }


  // ===============================
  // GUARDAR MATERIA (CREAR O ACTUALIZAR)
  // ===============================

  guardarMateria(): void {
    this.mensajeExito = '';
    this.mensajeError = '';

    if (this.modoEdicion) {

      this.materiasService.actualizarMateria(this.materiaActual.id, this.materiaActual).subscribe({
        next: () => {
          this.mensajeExito = 'Materia actualizada correctamente.';
          this.cargarMaterias();
          this.cerrarModal();
          setTimeout(() => this.mensajeExito = '', 4000);
        },
        error: (err) => {
          this.mensajeError = err?.error?.message || 'Error al actualizar la materia.';
          setTimeout(() => this.mensajeError = '', 5000);
        }
      });

    } else {

      this.materiasService.crearMateria(this.materiaActual).subscribe({
        next: () => {
          this.mensajeExito = 'Materia creada correctamente.';
          this.cargarMaterias();
          this.cerrarModal();
          setTimeout(() => this.mensajeExito = '', 4000);
        },
        error: (err) => {
          this.mensajeError = err?.error?.message || 'Error al crear la materia.';
          setTimeout(() => this.mensajeError = '', 5000);
        }
      });

    }
  }


  // ===============================
  // EDITAR
  // ===============================

  editarMateria(materia: Materia): void {
    this.modoEdicion = true;
    this.materiaActual = { ...materia };
    this.mostrarModal = true;
  }


  // ===============================
  // ELIMINAR
  // ===============================

  eliminarMateria(id: number): void {
    const confirmar = confirm('¿Está seguro de eliminar esta materia?');
    if (!confirmar) return;

    this.materiasService.eliminarMateria(id).subscribe({
      next: () => {
        this.mensajeExito = 'Materia eliminada correctamente.';
        this.cargarMaterias();
        setTimeout(() => this.mensajeExito = '', 4000);
      },
      error: (err) => {
        this.mensajeError = err?.error?.message || 'Error al eliminar la materia.';
        setTimeout(() => this.mensajeError = '', 5000);
      }
    });
  }


  // ===============================
  // DETALLES
  // ===============================

  verDetalles(materia: Materia): void {
    this.materiaSeleccionada = { ...materia };
    this.mostrarDetalles = true;
  }

  cerrarDetalles(): void {
    this.mostrarDetalles = false;
  }

}