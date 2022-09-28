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

  constructor(private httpClient:HttpClient, private db: AngularFireDatabase) {
    this.colaDB = this.db.list('/colareservas', (ref) =>
      ref.orderByChild('id'));
  }

  addReservaCola(isbn:string, idUser:string){
    const estruct : Cola = {
      idUser : idUser,
      id:isbn
    }
    this.httpClient.post('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/colareservas/'+isbn+'.json', estruct)
      .subscribe(() => {
        this.httpClient.put('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/colareservas/'+isbn+'.json', estruct)
        .subscribe((r) => console.log(r));
      });
  }
  
  getColaHTTP(): Observable<Cola[]>{
    return this.httpClient.get<Cola[]>('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/colareservas.json');
  }

  getCola(): Observable<Cola[]>{
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
  }

  eliminarElementoColaReservas(isbn:string){
    let array:any[];
    const res = this.httpClient.get('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/colareservas/'+isbn+'/idUser.json');
    res.subscribe(r => {
      if(typeof r == 'string'){
        console.log('es string');
      }else{
        // Es un array 
        console.log('es un array');
      }
    });
  }
}
