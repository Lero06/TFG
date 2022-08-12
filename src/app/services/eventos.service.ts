import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Database, push, ref } from '@angular/fire/database';
import { map, Observable } from 'rxjs';
import { Evento } from '../object/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private eventosDB: AngularFireList<Evento>;

  constructor(private db: AngularFireDatabase, private dbFire: Database) {
    this.eventosDB = this.db.list('/eventos', (ref) =>
      ref.orderByChild('id'));
  }

  addEvento(evento: Evento){
    const doc = ref(this.dbFire, 'eventos'); // Doc = referencia a la BD + test = path
    push(doc,evento).then( (r) => console.log('evento posteado'));
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

}
