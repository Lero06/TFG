import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Libro } from '../../interfaces/Libro';
import { AutenticacionService } from '../../services/autenticacion.service';
import { LibrosService } from '../../services/libros.service';
import { ReservasService } from '../../services/reservas.service';
import { TitulosService } from '../../services/titulos.service';


@Component({
  selector: 'app-info-libro',
  templateUrl: './info-libro.component.html',
  styleUrls: ['./info-libro.component.css']
})
export class InfoLibroComponent implements OnInit {

  libroSeleccionado:Libro;
  currentUser?:User;

  constructor(private libroService: LibrosService, private tituloService:TitulosService,
     private reservasService:ReservasService, private autorizacionService:AutenticacionService) { 
    
    this.libroSeleccionado = this.libroService.getLibroSeleccionado();

    // Autenticacion
    this.currentUser = this.autorizacionService.getUser();

  }

  ngOnInit(): void {}

  clickPedir(){
    console.log('Pedir click');
    let libro = this.libroSeleccionado;
    let lector;
    let localUID = localStorage.getItem('userUID');

    if(this.currentUser){
      lector = this.currentUser.uid;
    }else if(localUID){
      lector = localUID;
    }

    if(lector){
      this.reservasService.addNuevaReserva(libro.isbn, lector);
      this.reservasService.cambiarEstadoaND(libro.isbn, lector);
      this.libroSeleccionado.disponible = false;
      alert('Libro pedido');
    }else{
      alert('No se ha podido completar la operación, no se detecta el usuario');
    }
  }

  aplicarEsteticos(s:string){
    return this.tituloService.aplicarNombreEstetico(s);
  }

  quitarNumsYGuion(s:string){
    return this.tituloService.quitarNumsYGuion(s);
  }

}
