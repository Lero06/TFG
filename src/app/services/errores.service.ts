import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Problema } from '../interfaces/Problema';

@Injectable({
  providedIn: 'root'
})
export class ErroresService {

  erroresDB:AngularFireList<Problema>;

  constructor(private httpClient:HttpClient, private db: AngularFireDatabase) {
    this.erroresDB = this.db.list('/errores', (ref) =>
      ref.orderByChild('id'));
  }

  subirError(error:any){
    this.httpClient.post('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/errores.json',error).subscribe(r=>console.log(r));
  }

  getErrores():Observable<Problema[]>{
    return this.erroresDB.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => this.getUserFromPayload(c.payload))
      )
    );
  }

  getUserFromPayload(payload: any): Problema{
    return {
      $key: payload.key,
      ...payload.val(),
    };
  }

  borrarError(errora:Problema){
    this.httpClient.delete('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/errores/'+errora.$key+'.json')
    .subscribe(() => {alert('Error borrado')});
  }


}
