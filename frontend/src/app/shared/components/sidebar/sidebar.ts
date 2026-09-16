import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../core/services/translation.service';


@Component({

  selector: 'app-sidebar',

  standalone:true,

  imports:[
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TranslatePipe
  ],

  templateUrl:'./sidebar.html',

  styleUrl:'./sidebar.scss'

})


export class Sidebar {



  // Menús desplegables

  seguimientoAbierto:boolean = false;

  gestionAbierta:boolean = false;

  reportesAbierto:boolean = false;

  sistemaAbierto:boolean = false;




  constructor(
    private router:Router
  ){}





  // =============================
  // ABRIR / CERRAR MENUS
  // =============================


  toggleSeguimiento():void{

    this.seguimientoAbierto =
    !this.seguimientoAbierto;

  }





  toggleGestion():void{

    this.gestionAbierta =
    !this.gestionAbierta;

  }





  toggleReportes():void{

    this.reportesAbierto =
    !this.reportesAbierto;

  }





  toggleSistema():void{

    this.sistemaAbierto =
    !this.sistemaAbierto;

  }





  // =============================
  // CERRAR SESION
  // =============================


  cerrarSesion():void{


    localStorage.clear();

    sessionStorage.clear();


    this.router.navigate(['/login']);


  }




}