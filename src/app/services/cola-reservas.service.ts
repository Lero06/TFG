import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Cola } from '../object/Cola';

@Injectable({
  providedIn: 'root'
})
export class ColaReservasService {

  // Una vez reservado el libro se encola la peticion de resreva

  private colaDB: AngularFireList<any>;

  // Colas de reservas
  resCola:Cola[];
  colaFiltradaGlobal:Cola[];

  constructor(private httpClient:HttpClient, private db: AngularFireDatabase) {
    this.colaDB = this.db.list('/colareservas', (ref) =>
      ref.orderByChild('id'));
  }

  inicializarCola(){
    // Obtener todas las colas
    this.getColaHTTP().subscribe((r) => this.resCola = r);
  }

  /* -------------------------------------------------------------------------------------------------------- */

  addReservaCola(isbn:string, idUser:string){
    // Añade una reserva en la cola, si no hay cola la crea
    // Si la hay, la añade asi -> id User = [..., ..., ..., new]
    let estruct : Cola;

    if(this.hayCola(isbn)){
      console.log('Tipo = '+typeof this.colaFiltradaGlobal); // Tipo = Cola[]
      let array:string[] = [];
      this.colaFiltradaGlobal.forEach(e => array.push(e.idUser)); 
      console.log(array.toString());
      const s = array + ',' + idUser;
      estruct = {
        idUser : s,
        id:isbn
      }
    }else{
      estruct = {
        idUser : idUser,
        id:isbn
      }
    }
    
    this.httpClient.post('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/colareservas/'+isbn+'.json', estruct)
    .subscribe(() => {
      this.httpClient.put('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/colareservas/'+isbn+'.json', estruct)
      .subscribe(() => alert('Se ha reservado el libro con éxito'));
    });
  }
  
  getColaHTTP(): Observable<Cola[]>{
    return this.httpClient.get<Cola[]>('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/colareservas.json');
  }

  getColaInicializada(){
    return this.resCola;
  }

  /*getCola(): Observable<Cola[]>{
    return this.colaDB.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => this.getUserFromPayload(c.payload))
      )
    );
  }

  getUserFromPayload(payload: any): Cola{
    return {
      $key: payload.key,
      ...payload.val(),
    };
  }*/

  /* -------------------------------------------------------------------------------------------------------- */

  eliminarElementoColaReservas(isbn:string){
    const res = this.httpClient.get('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/colareservas/'+isbn+'/idUser.json');
    res.subscribe(r => {
      if(typeof r == 'string'){
        console.log('es string');
        // Si es un string, se debe eliminar el id de ese libro y su cola de idsUsuarios en este caso 1
      }else if(typeof r != 'string'){
        console.log(typeof r);
        // Es un array 
        console.log('es un array');
        // Si es un array, se debe desapilar un elemento de la cola de idsUsuarios
        this.desapilarElementoDeArray(r);
        // Y subir cambios a la BD
      }
    });
  }

  desapilarElementoDeArray(r:any){

  }


  hayCola(isbn:string){
    // Metodo para comprobar si hay una lista de espera agunardando la reserva del libro
    // ** const colaFiltrada = this.resCola.filter( ** no se puede hacer directamente pq es un objeto no un array
    const colaFiltrada = Object.values(this.resCola).filter(  
      reserva => reserva.id == isbn
    );

    this.colaFiltradaGlobal = colaFiltrada;
    
    if(!colaFiltrada ||  colaFiltrada.length == 0){
      console.log('No hay cola');
      console.log(colaFiltrada);
      return false;
    }else{
      console.log('Hay cola');
      console.log(colaFiltrada);
      return true;
    }
  }
}
