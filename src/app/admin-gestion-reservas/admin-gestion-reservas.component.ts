import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  // Obtener la cola de reservas
  obsCola?:Observable<Cola[]>;
  // Se debe ir actualizando su valor
  // ColaAUX = cola con todo
  colaAux:Cola[];

  constructor(private autenticacionService:AutenticacionService, private reservasService:ReservasService,
              private adminComponent:AdminComponent, private colaService:ColaReservasService) {
               }

  ngOnInit(): void {
    this.actualizarCola();
  }

  actualizarCola(){
    // Obtenemos todas las colas de los libros que luego filtraremos
    delete this.obsCola;
    this.obsCola = this.colaService.getColaHTTP();
    this.obsCola.subscribe(r => {console.log(r);this.colaAux = r});
  }

  // -------------------------------------------------------------------------------

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
    // Pides un libro segun los valores del input
    // Pides un libro cuando está disponible
    this.reservasService.cambiarEstadoaND(isbnAPedir, this.valorInputUser);
    this.resDisponibilidad.estado = 'No Disponible';
    this.reservasService.addNuevaReserva(isbnAPedir, this.valorInputUser);
  }

  seHaDevuelto(isbnADevolver:string){
    try{
      if(this.colaService.hayColaEnBD(this.colaAux)){
        // Hay cola
        console.log('Hay cola');
        if(this.colaService.hayColaParaElLibro(isbnADevolver, this.colaAux)){
          // Eliminar cola reservas
          this.colaService.eliminarElementoColaReservas(isbnADevolver);
          // Crear nueva reserva
          if(!this.colaService.noQuedanUsuarios){
            // Si (no*no) quedan usuarios, hay que desplazar el usuario y crear nueva reserva
            // OJOOO RE HACER // TODO
            this.reservasService.cambiarEstadoaND(isbnADevolver, this.valorInputUser);
            this.resDisponibilidad.estado = 'No Disponible';
            //this.reservasService.addNuevaReserva(isbnADevolver, this.valorInputUser);
          }else{
            this.reservasService.cambiarEstadoaD(isbnADevolver);
            this.resDisponibilidad.estado = 'Disponible';
          }
        }else{
          // No hay cola para ese libro
          // Volver a ponerlo disponible
          // Se deja la reserva
          this.reservasService.cambiarEstadoaD(isbnADevolver);
          this.resDisponibilidad.estado = 'Disponible';
        }
      }else{
        // No hay cola
        console.log('No hay cola filtrada');
        // Volver a ponerlo disponible
        // Se deja la reserva
        this.reservasService.cambiarEstadoaD(isbnADevolver);
        this.resDisponibilidad.estado = 'Disponible';
      }
      alert('Se ha devuelto el libro con éxito');
    }catch(exception){
      alert('Ha habido un error en la devolución del libro -> '+exception);
    }finally{
      this.actualizarCola();
    }
  }

  reservarLibro(isbnADevolver:string){
    // Añadimos la reserva y actualizamos el valor de colaAUX
    console.log('Cola aux da');
    console.log(this.colaAux);
    try{
      this.colaService.addReservaCola(isbnADevolver, this.valorInputUser, this.colaAux);
    }catch(e){console.log(e); console.log('No se ha podido actualizar aux');
    }finally{
      this.actualizarCola();
    }
  }

}
