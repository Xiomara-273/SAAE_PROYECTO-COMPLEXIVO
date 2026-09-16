import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface PerfilUsuario {

  nombre:string;

  apellido:string;

  correo:string;

  telefono:string;

  rol:string;

}



export interface ConfiguracionSistema {

  notificaciones:boolean;

  modoOscuro:boolean;

  idioma:string;

}





@Injectable({

  providedIn:'root'

})


export class ConfiguracionService {



  private http = inject(HttpClient);



  private apiUrl = 'http://localhost:5000/api';





  obtenerPerfil():Observable<PerfilUsuario>{


    return this.http.get<PerfilUsuario>(

      `${this.apiUrl}/configuracion/perfil`

    );


  }






  actualizarPerfil(

    datos:PerfilUsuario

  ):Observable<PerfilUsuario>{


    return this.http.put<PerfilUsuario>(

      `${this.apiUrl}/configuracion/perfil`,

      datos

    );


  }







  cambiarPassword(

    datos:any

  ):Observable<any>{


    return this.http.put(

      `${this.apiUrl}/configuracion/password`,

      datos

    );


  }







  obtenerConfiguracion():Observable<ConfiguracionSistema>{


    return this.http.get<ConfiguracionSistema>(

      `${this.apiUrl}/configuracion/sistema`

    );


  }







  guardarConfiguracion(

    datos:ConfiguracionSistema

  ):Observable<ConfiguracionSistema>{


    return this.http.put<ConfiguracionSistema>(

      `${this.apiUrl}/configuracion/sistema`,

      datos

    );


  }


}