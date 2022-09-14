import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { map, Observable } from 'rxjs';
import { Reserva } from '../object/Reserva';
import { AutenticacionService } from '../services/autenticacion.service';
import { ReservasService } from '../services/reservas.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {

  currentUserID?:any;
  reservas:Observable<Reserva[]>;
  displayedColumns: string[] = ['isbn', 'fecha inicio', 'fecha fin'];
  reservasPasadas:Reserva[] = [];
  //reservasPasadasArray:Reserva[];

  constructor(private autenticationService:AutenticacionService, private reservasService:ReservasService) {
    // Autenticacion - Obtener el usuario
    this.currentUserID = this.autenticationService.getUser()?.uid;
    let localUID = localStorage.getItem('userUID');

    if(!this.currentUserID){
      this.currentUserID = localUID;
    }

    this.reservas = this.reservasService.getReservas(this.currentUserID);
  }

  ngOnInit(): void {}

  /*comprobarReservasPasadas(){
    // reservasPasadas es un observable, hay que pasarlo a array
    this.reservasPasadas = this.reservas.pipe(map(
      reserva => reserva.filter(
        res => this.esMenorAActual(res.fechaFin))));
    this.reservasPasadas.subscribe((r) => this.reservasPasadasArray = r);
  }*/

  esMenorAActual(row:any):boolean{
    // fecha actual = 'mes/dia/año'
    let aux = new Date();
    let fechaActual = aux.toLocaleDateString();
    
    let fechaActualArray = fechaActual.split("/");
    let fechaFinArray = row.fechaFin.split("/");

    if(fechaActualArray[2] > fechaFinArray[2]){
      // El año actual es mayor que el año de devolución
      this.reservasPasadas.push(row);
      return true;
    }else if(fechaActualArray[2] == fechaFinArray[2]){
        // Mismo año
        if(fechaActualArray[0] > fechaFinArray[0]){
          // El mes actual es mayor que el mes de devolución
          this.reservasPasadas.push(row);
          return true;
        }else if(fechaActualArray[0] == fechaFinArray[0]){
          // Es el mismo mes
          if(fechaActualArray[1] > fechaFinArray[1]){
            // El dia actual es mayor que el dia de devolución
            this.reservasPasadas.push(row);
            return true;
          }
        }
    }
    return false;
  }
}
