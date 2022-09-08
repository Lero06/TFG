import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Libro } from '../object/Libro';
import { Reserva } from '../object/Reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  /* En este servicio todas las llamadas se hacen con HTTP Client */

  constructor(private httpClient:HttpClient) {}

  addNuevaReserva(id:string, lector:string){
    const now = new Date();
    const fechaIni = new Date().toLocaleDateString();
    now.setDate(now.getDate() + 15);
    const fechaFin = now.toLocaleDateString();
    const idLector = lector;

    // Construir objeto JSON a actualizar
    const reserva:Reserva = {
        isbn: id,
        fechaIni: fechaIni,
        fechaFin: fechaFin,
        lector:idLector
    };

    // Posteamos la reserva en /reservas
    this.httpClient.post<any>('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/reservas/'+lector+'.json',reserva)
    .subscribe((r) => {console.log(r)});
  }

  /* --------------------------------------------------------------------------------- */

  buscarDisponibilidad(id:string){
    return this.httpClient.get<any>('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/disponibilidad/'+id+'.json');
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
    // Cambiar estado en el atributo 'disponible' a 'no disponible' de libro
    this.httpClient.put<any>('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/libros/'+isbnAPedir+'/disponible.json',false).subscribe((r)=>console.log(r));
    console.log('cambiado');
  }

  cambiarEstadoaD(isbnAPedir:string){
    // Construir objeto JSON a actualizar
      const objeto = {
        estado: 'Disponible',
        isbn: isbnAPedir,
        localizacion:'En Biblioteca'
    };

    this.httpClient.put<any>('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/disponibilidad/'+isbnAPedir+'.json',objeto).subscribe((r) => console.log(r));
     // Cambiar estado en el atributo 'no disponible' a 'disponible' de libro
     this.httpClient.put<any>('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/libros/'+isbnAPedir+'/disponible.json',true).subscribe((r)=>console.log(r));
     console.log('cambiado');
  }

  addNuevaDisponibilidad(libro: Libro){
  const objeto = {
    estado: 'Disponible',
    isbn: libro.isbn,
    localizacion:'En Biblioteca'
  };

  this.httpClient.post<any>('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/disponibilidad/'+libro.isbn+'.json',objeto)
  .subscribe(() => {
    this.httpClient.put('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/disponibilidad/'+libro.isbn+'.json',objeto)
    .subscribe((r) => console.log(r));
  });

  }
}
