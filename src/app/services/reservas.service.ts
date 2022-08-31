import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  /* En este servicio todas las llamadas se hacen con HTTP Client */

  constructor(private httpClient:HttpClient) {}

  buscarUsuariosPorID(id:string){
    return this.httpClient.get<any>('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/reservas/'+id+'.json');
  }

  buscarDisponibilidad(id:string){
    return this.httpClient.get<any>('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/disponibilidad/'+id+'.json');
  }

  buscarLibroPorISBN(id:string){
    return this.httpClient.get<any>('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/reservas/'+id+'.json');
  }

}
