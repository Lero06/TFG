import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  /* En este servicio todas las llamadas se hacen con HTTP Client */

  constructor(private httpClient:HttpClient) {}

  buscarDisponibilidad(id:string){
    return this.httpClient.get<any>('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/disponibilidad/'+id+'.json');
  }

  buscarLibroPorISBN(id:string){
    return this.httpClient.get<any>('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/reservas/'+id+'.json');
  }

  /* CAMBIO DE ESTADO */
  // Disponible -> No disponible
  cambiarEstadoaND(isbnAPedir:string, lector:string){
    const now = new Date();
    const fechaIni = new Date().toLocaleDateString();
    now.setDate(now.getDate() + 15);
    const fechaFin = now.toLocaleDateString();
    const idLector = lector;

    // Construir objeto JSON a actualizar
    const objeto = {
        estado: 'No Disponible',
        isbn: isbnAPedir,
        localizacion:'En Biblioteca',
        fechaIni: fechaIni,
        fechaFin: fechaFin,
        lector:idLector
    };

    this.httpClient.put<any>('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/disponibilidad/'+isbnAPedir+'.json',objeto).subscribe((r) => console.log(r));
    console.log('cambiado');
  }

}
