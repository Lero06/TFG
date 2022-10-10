import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Database, push, ref } from '@angular/fire/database';
import { map, Observable } from 'rxjs';
import { Evento } from '../interfaces/Evento';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private eventosDB: AngularFireList<Evento>;

  constructor(private db: AngularFireDatabase, private dbFire: Database, private httpClient:HttpClient) {
    this.eventosDB = this.db.list('/eventos', (ref) =>
      ref.orderByChild('id'));
  }

  addEvento(evento: Evento){
    const doc = ref(this.dbFire, 'eventos'); // Doc = referencia a la BD + test = path
    push(doc,evento).then( (r) => console.log('evento posteado'));
  }

  addEventoHTTP(evento: Evento){
    // Hacemos un post y un put para eliminar la key por defecto
    this.httpClient.post('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/eventos/'+evento.nombre+'.json', evento)
      .subscribe(() => {
        this.httpClient.put('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/eventos/'+evento.nombre+'.json', evento)
        .subscribe((r) => console.log(r));
      });
  }

  getEventos(): Observable<Evento[]>{
    return this.eventosDB.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => this.getUserFromPayload(c.payload))
      )
    );
  }

  getUserFromPayload(payload: any): Evento{
    return {
      $key: payload.key,
      ...payload.val(),
    };
  }

  borrarEvento(id:any){
    this.httpClient.delete('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/eventos/'+id+'.json')
    .subscribe((r) => {console.log(r)});
  }
}
