import {
  Component,
  inject,
  AfterViewInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Chart } from 'chart.js/auto';

import { Reportes } from '../../../core/services/reportes';



interface FiltrosReporte {

  periodo: string;

  carrera: string;

  curso: string;

  materia: string;

}



interface Indicadores {


  asistencia: number;

  estudiantes: number;

  riesgo: number;

  justificaciones: number;


}



interface Reporte {


  estudiante: string;

  carrera: string;

  curso: string;

  asistencia: number;

  estado: 'Normal' | 'Riesgo';


}





@Component({

  selector: 'app-reportes-analitica',

  standalone:true,


  imports:[

    CommonModule,

    FormsModule

  ],


  templateUrl:'./reportes-analitica.html',

  styleUrl:'./reportes-analitica.scss'


})



export class ReportesAnalitica implements AfterViewInit {



  private reportesService = inject(Reportes);



  graficoLinea?:Chart;

  graficoMateria?:Chart;



  filtros:FiltrosReporte = {


    periodo:'',

    carrera:'',

    curso:'',

    materia:''


  };







  periodos:string[]=[

    '2026-A',

    '2026-B'

  ];



  carreras:string[]=[

    'Desarrollo de Software',

    'Redes',

    'Administración'

  ];



  cursos:string[]=[

    '5to A',

    '5to B',

    '6to A'

  ];



  materias:string[]=[

    'Base de Datos',

    'Programación Web',

    'Ingeniería de Software'

  ];







  indicadores:Indicadores={


    asistencia:0,

    estudiantes:0,

    riesgo:0,

    justificaciones:0


  };






  reportes:Reporte[]=[];








  ngAfterViewInit():void{

    if (typeof document === 'undefined') return;

    this.crearGraficoLinea();

    this.crearGraficoMateria();


  }








  generarReporte():void{



    this.reportesService

    .obtenerReporte(this.filtros)

    .subscribe({



      next:(respuesta)=>{



        this.indicadores =
        respuesta.indicadores;



        this.reportes =
        respuesta.detalle.map((item)=>({


          estudiante:item.estudiante,

          carrera:item.carrera,

          curso:item.curso,

          asistencia:item.asistencia,

          estado:
          item.estado === 'Riesgo'
          ? 'Riesgo'
          : 'Normal'


        }));


        this.actualizarGraficos();



        alert(

          'Reporte generado correctamente'

        );



      },



      error:(error)=>{


        console.error(error);


        alert(

          'Error al conectar con el servidor'

        );


      }



    });



  }










  crearGraficoLinea():void{


    const canvas =
    document.getElementById(
      'asistenciaLinea'
    ) as HTMLCanvasElement;



    if(!canvas) return;



    this.graficoLinea = new Chart(canvas, {


      type:'line',


      data:{


        labels:[

          'Julio',

          'Agosto',

          'Septiembre',

          'Octubre'

        ],


        datasets:[{


          label:'Asistencia %',


          data:[

            85,

            88,

            92,

            95

          ],


          tension:.3


        }]


      },


      options:{


        responsive:true,

        maintainAspectRatio:false


      }



    });



  }









  crearGraficoMateria():void{



    const canvas =

    document.getElementById(

      'asistenciaMateria'

    ) as HTMLCanvasElement;



    if(!canvas) return;




    this.graficoMateria = new Chart(canvas,{



      type:'bar',



      data:{


        labels:[


          'Base Datos',

          'Programación Web',

          'Ingeniería Software'


        ],


        datasets:[{


          label:'Asistencia %',


          data:[

            92,

            88,

            95

          ]


        }]


      },


      options:{


        responsive:true,

        maintainAspectRatio:false


      }



    });



  }










  actualizarGraficos():void{



    if(this.graficoLinea){


      this.graficoLinea.update();


    }



    if(this.graficoMateria){


      this.graficoMateria.update();


    }



  }










  limpiarFiltros():void{


    this.filtros={


      periodo:'',

      carrera:'',

      curso:'',

      materia:''


    };



    this.reportes=[];


  }










  exportarPDF():void{



    this.reportesService

    .generarPDF(this.filtros)

    .subscribe({


      next:(archivo)=>{


        const url =
        window.URL.createObjectURL(archivo);



        const link =
        document.createElement('a');



        link.href=url;



        link.download =
        'reporte-asistencia.pdf';



        link.click();



        window.URL.revokeObjectURL(url);



      },


      error:()=>{


        alert(

          'No se pudo generar el PDF'

        );


      }



    });



  }










  exportarExcel():void{



    this.reportesService

    .generarExcel(this.filtros)

    .subscribe({


      next:(archivo)=>{


        const url =
        window.URL.createObjectURL(archivo);



        const link =
        document.createElement('a');



        link.href=url;



        link.download =
        'reporte-asistencia.xlsx';



        link.click();



        window.URL.revokeObjectURL(url);



      },


      error:()=>{


        alert(

          'No se pudo generar el Excel'

        );


      }



    });



  }






}
