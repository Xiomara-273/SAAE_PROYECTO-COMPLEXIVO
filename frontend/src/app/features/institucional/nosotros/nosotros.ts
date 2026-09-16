import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../../core/services/translation.service';


@Component({

  selector:'app-nosotros',

  standalone:true,

  imports:[

    CommonModule,
    RouterModule,
    TranslatePipe

  ],

  templateUrl:'./nosotros.html',

  styleUrl:'./nosotros.scss'

})


export class NosotrosComponent {



  // ===============================
  // INFORMACIÓN PRINCIPAL
  // ===============================


  nombreSistema:string =
  'SAAE - Sistema Analítico de Asistencia Estudiantil';



  institucion:string =
  'Instituto Superior Tecnológico de Turismo y Patrimonio Yavirac';



  descripcion:string =
  'Plataforma tecnológica orientada al monitoreo, análisis y seguimiento de la asistencia estudiantil mediante herramientas digitales que permiten mejorar la toma de decisiones académicas.';





  // ===============================
  // MISIÓN Y VISIÓN
  // ===============================


  mision:string =
  'Formar profesionales de excelencia enfocados en Ciencia, Tecnología y Sociedad, fortaleciendo sus competencias mediante una educación tecnológica de calidad.';



  vision:string =
  'Al 2027 el Instituto Superior Tecnológico de Turismo y Patrimonio Yavirac será una institución de vanguardia en la formación tecnológica y conservación del patrimonio.';





  // ===============================
  // VALORES INSTITUCIONALES
  // ===============================


  valores:string[]=[


    'Excelencia académica',

    'Innovación tecnológica',

    'Responsabilidad social',

    'Compromiso institucional',

    'Trabajo colaborativo',

    'Respeto y ética profesional'


  ];






  // ===============================
  // TECNOLOGÍAS DEL SISTEMA
  // ===============================


  tecnologias:string[]=[


    'Angular',

    'TypeScript',

    'NestJS',

    'Base de Datos MySQL',

    'Analítica de Datos',

    'Automatización con N8N'


  ];






  // ===============================
  // BENEFICIOS DEL SAAE
  // ===============================


  beneficios:string[]=[


    'Control y registro digital de asistencia.',


    'Seguimiento académico de estudiantes.',


    'Detección temprana de riesgos académicos.',


    'Gestión de justificaciones académicas.',


    'Generación de reportes e indicadores.',


    'Apoyo para docentes y autoridades institucionales.'


  ];







  // ===============================
  // INFORMACIÓN YAVIRAC
  // ===============================


  contacto={


    direccion:
    'García Moreno S4-35 y Ambato, Quito - Ecuador',


    telefono:
    '+593 99 550 6245',


    correo:
    'yavirac@yavirac.edu.ec',


    horario:
    'Lunes - Viernes: 08:00 - 17:00'


  };







  redes:string[]=[


    'Facebook',

    'Instagram',

    'X-Twitter',

    'YouTube',

    'TikTok',

    'LinkedIn'


  ];



}