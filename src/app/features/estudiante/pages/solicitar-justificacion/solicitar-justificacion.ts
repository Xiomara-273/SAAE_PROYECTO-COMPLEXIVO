import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface Solicitud {

  materia: string;

  fecha: string;

  tipo: string;

  motivo: string;

  archivo?: string;

  estado: 'Pendiente' | 'Aprobada' | 'Rechazada';

  observacion?: string;

}



interface FormularioJustificacion {

  materia: string;

  fecha: string;

  tipo: string;

  motivo: string;

}



@Component({

  selector: 'app-solicitar-justificacion',

  standalone: true,

  imports: [

    CommonModule,

    FormsModule

  ],

  templateUrl: './solicitar-justificacion.html',

  styleUrl: './solicitar-justificacion.scss'

})


export class SolicitarJustificacionComponent {



  /* =====================================================
     DATOS DEL FORMULARIO
  ===================================================== */


  formulario: FormularioJustificacion = {

    materia: '',

    fecha: '',

    tipo: 'Médica',

    motivo: ''

  };





  /* =====================================================
     MATERIAS DEL ESTUDIANTE
  ===================================================== */


  materias: string[] = [

    'Programación Web',

    'Base de Datos',

    'Ingeniería de Software',

    'Sistemas Operativos',

    'Redes',

  ];





  /* =====================================================
     ARCHIVO
  ===================================================== */


  archivoSeleccionado: File | null = null;


  nombreArchivo: string = '';





  /* =====================================================
     HISTORIAL
  ===================================================== */


  solicitudes: Solicitud[] = [


    {

      materia: 'Base de Datos',

      fecha: '2026-07-15',

      tipo: 'Médica',

      motivo:
      'Reposo médico por enfermedad.',

      archivo:
      'certificado_medico.pdf',

      estado:
      'Aprobada',

      observacion:
      'Justificación validada por docente.'

    },


    {

      materia: 'Programación Web',

      fecha: '2026-07-20',

      tipo: 'Personal',

      motivo:
      'Calamidad familiar.',

      estado:
      'Pendiente'

    }


  ];





  /* =====================================================
     SELECCIONAR ARCHIVO
  ===================================================== */


  seleccionarArchivo(event: Event): void {


    const input =
      event.target as HTMLInputElement;



    if(input.files && input.files.length > 0) {


      this.archivoSeleccionado =
        input.files[0];



      this.nombreArchivo =
        this.archivoSeleccionado.name;


    }


  }





  /* =====================================================
     ENVIAR SOLICITUD
  ===================================================== */


  enviarSolicitud(): void {



    if(

      !this.formulario.materia ||

      !this.formulario.fecha ||

      !this.formulario.motivo

    ) {


      alert(
        'Complete todos los campos obligatorios.'
      );


      return;

    }





    const nuevaSolicitud: Solicitud = {


      materia:
      this.formulario.materia,


      fecha:
      this.formulario.fecha,


      tipo:
      this.formulario.tipo,


      motivo:
      this.formulario.motivo,



      archivo:
      this.nombreArchivo || undefined,



      estado:
      'Pendiente'


    };





    this.solicitudes.unshift(
      nuevaSolicitud
    );



    alert(
      'Solicitud enviada correctamente.'
    );



    this.limpiarFormulario();


  }





  /* =====================================================
     LIMPIAR FORMULARIO
  ===================================================== */


  limpiarFormulario(): void {



    this.formulario = {


      materia: '',


      fecha: '',


      tipo: 'Médica',


      motivo: ''


    };



    this.archivoSeleccionado =
      null;



    this.nombreArchivo =
      '';



  }





}