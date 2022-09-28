import { Component, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { AdminComponent } from '../admin/admin.component';
import { Cola } from '../object/Cola';
import { Reserva } from '../object/Reserva';
import { AutenticacionService } from '../services/autenticacion.service';
import { ColaReservasService } from '../services/cola-reservas.service';
import { ReservasService } from '../services/reservas.service';

@Component({
  selector: 'app-admin-gestion-reservas',
  templateUrl: './admin-gestion-reservas.component.html',
  styleUrls: ['./admin-gestion-reservas.component.css']
})
export class AdminGestionReservasComponent implements OnInit {

  subirReservaActivo:boolean;
  reservas:Observable<Reserva[]>;
  valorInputGR:string;
  valorInputUser:string;
  existeLibro:boolean;
  resDisponibilidad:any;
  usuarioEncontrado:boolean;
  resUsuario:any;

  // Colas de reservas
  resCola:Cola[];

  constructor(private autenticacionService:AutenticacionService, private reservasService:ReservasService,
              private adminComponent:AdminComponent, private colaService:ColaReservasService) { }

  ngOnInit(): void {
    // Obtener todas las colas
    this.colaService.getColaHTTP().subscribe((r) => {this.resCola = r, console.log(r)});
  }

  atrasDesdeGestion(){
    this.adminComponent.gestionActivado = false;
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
    if(this.hayCola(isbnADevolver)){
      // Hay cola
      // Eliminar cola reservas
      this.colaService.eliminarElementoColaReservas(isbnADevolver);
      // Crear nueva reserva
      //this.reservasService.cambiarEstadoaND(isbnADevolver, this.valorInputUser);
      //this.resDisponibilidad.estado = 'No Disponible';
      //this.reservasService.addNuevaReserva(isbnADevolver, this.valorInputUser);

    }else{
      // No hay cola
      // Volver a ponerlo disponible
      //this.reservasService.cambiarEstadoaD(isbnADevolver);
      //this.resDisponibilidad.estado = 'Disponible';
  }
  }

  hayCola(isbn:string){
    // Metodo para comprobar si hay una lista de espera agunardando la reserva del libro
    // ** const colaFiltrada = this.resCola.filter( ** no se puede hacer directamente pq es un objeto no un array
    const colaFiltrada = Object.values(this.resCola).filter(  
      reserva => reserva.id == isbn
    );
    
    if(!colaFiltrada){
      console.log('No hay cola');
      console.log(colaFiltrada);
      return false;
    }else{
      console.log('Hay cola');
      console.log(colaFiltrada);
      return true;
    }
  }

  reservarLibro(isbnADevolver:string){
    this.colaService.addReservaCola(isbnADevolver, this.valorInputUser);
  }

}
