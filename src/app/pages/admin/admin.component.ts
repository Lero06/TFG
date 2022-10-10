import { Component, OnInit } from '@angular/core';
import { Libro } from '../../interfaces/Libro';
import { LibrosService } from '../../services/libros.service';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { NgxFileDropEntry } from 'ngx-file-drop';
import { Evento } from '../../interfaces/Evento';
import { EventosService } from '../../services/eventos.service';
import { map, Observable } from 'rxjs';
import { _isNumberValue } from '@angular/cdk/coercion';
import { Reserva } from '../../interfaces/Reserva';
import { ReservasService } from '../../services/reservas.service';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  // General
  subirLibroActivado:boolean;
  borrarLibroActivado:boolean;
  subirEventoActivado:boolean;
  borrarEventoActivado:boolean;
  subirPersActivado:boolean;
  bajarPersActivado:boolean;
  gestionActivado:boolean;
  erroresActivado:boolean;

  // Gestión de Reservas
  /*subirReservaActivo:boolean;
  reservas:Observable<Reserva[]>;
  valorInputGR:string;
  valorInputUser:string;
  existeLibro:boolean;
  resDisponibilidad:any;
  usuarioEncontrado:boolean;
  resUsuario:any;*/


  

  constructor() { 
    this.subirLibroActivado = false;
    this.borrarLibroActivado = false;
    this.subirEventoActivado = false;
    this.subirPersActivado = false;
    this.bajarPersActivado = false;
    this.borrarEventoActivado = false;
    this.gestionActivado = false;
    this.erroresActivado = false;
  }

  ngOnInit(): void {}

  /* --------------- GENERAL ---------------*/
  activarSubirLibro(){
    this.subirLibroActivado = true;
  }

  activarBorrarLibro(){
    this.borrarLibroActivado = true;
  }

  activarSubirEvento(){
    this.subirEventoActivado = true;
  }

  activarBorrarEvento(){
    this.borrarEventoActivado = true;
  }

  activarGestion(){
    this.gestionActivado = true;
  }

  activarGestionErrores(){
    this.erroresActivado = true;
  }


  /* --------------- GESTION DE RESERVAS---------------*/
  /*atrasDesdeGestion(){
    this.gestionActivado = false;
  }

  async buscarUsuario(){
    // Checkear Inputs
    const user = await this.autenticacionService.buscarUsuariosPorID(this.valorInputUser);
    user.subscribe((r) => {
      console.log(r);
      if(r == null){
        this.usuarioEncontrado = false;
      }else{
        this.usuarioEncontrado = true;
        this.resUsuario = r;
      }
    });
  }

  async buscarDisponibilidadLibro(){
    //  isbn = this.valorInputGR;
    // Controlar errores

    const disponibilidad = await this.reservasService.buscarDisponibilidad(this.valorInputGR);
    disponibilidad.subscribe((r) => {
      console.log(r);
      if(r == null){
        this.existeLibro = false;
      }else{
        this.existeLibro = true;
        this.resDisponibilidad = r;
      }
    });
  } 

  pedirLibro(isbnAPedir:string){
    this.reservasService.cambiarEstadoaND(isbnAPedir, this.valorInputUser);
    this.resDisponibilidad.estado = 'No Disponible';
    this.reservasService.addNuevaReserva(isbnAPedir, this.valorInputUser);
  }

  seHaDevuelto(isbnADevolver:string){
    this.reservasService.cambiarEstadoaD(isbnADevolver);
    this.resDisponibilidad.estado = 'Disponible';
  }*/

  /* OTROS */
    // la casa de maria -> La Casa De Maria
    /*nombreAMayus(s:string){
      // Hacer las primeras letras MAYUS
      var splitStr = s.toLowerCase().split(' ');
      for (var i = 0; i < splitStr.length; i++) {
          // You do not need to check if i is larger than splitStr length, as your for does that for you
          // Assign it back to the array
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
      }
      // Directly return the joined string
      return splitStr.join(' '); 
    }
  
    aplicarNombreEstetico(s:string){
      if(!s){return '';}
      let res:string;
      res = s;
      // Poner ... si el nombre es muy largo
      if(s.length > 23){
        res = s.slice(0,23).concat('...');
      }
  
      // Hacer las primeras letras MAYUS
      var splitStr = res.toLowerCase().split(' ');
      for (var i = 0; i < splitStr.length; i++) {
          // You do not need to check if i is larger than splitStr length, as your for does that for you
          // Assign it back to the array
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
      }
      // Directly return the joined string
      return splitStr.join(' '); 
    }*/
}
