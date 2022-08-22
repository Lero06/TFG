import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Libro } from '../object/Libro';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Database, push, ref } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LibrosService {

  private librosDB: AngularFireList<Libro>;
  private librosDBOrdenadosAZ: AngularFireList<Libro>;

  private libroSeleccionado:Libro;

  constructor(private db: AngularFireDatabase,private dbFire: Database) {

    this.librosDB = this.db.list('/libros', (ref) =>
      ref.orderByChild('id'));
  }

   // -------------------------------------------------------------------------------------------

  addLibro(libro: Libro){
    const doc = ref(this.dbFire, 'libros'); // Doc = referencia a la BD + test = path
    push(doc,libro).then( (r) => console.log('libro posteado'));
  }


  getLibros(): Observable<Libro[]>{
    return this.librosDB.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => this.getUserFromPayload(c.payload))
      )
    );
  }

  getUserFromPayload(payload: any): Libro{
    return {
      $key: payload.key,
      ...payload.val(),
    };
  }

  // -------------------------------------------------------------------------------------------

  getLibrosOrdenadosAZ(){
    this.librosDBOrdenadosAZ = this.db.list('/libros', (ref) =>
      ref.orderByChild('titulo'));

    return this.librosDBOrdenadosAZ.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => this.getUserFromPayload(c.payload))
      )
    );
  }

  getLibrosNuevos(){
    this.librosDBOrdenadosAZ = this.db.list('/libros', (ref) =>
      ref.orderByChild('categoria')
      .startAt('nuevo-15')
      .endAt('nuevo-15'));

    return this.librosDBOrdenadosAZ.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => this.getUserFromPayload(c.payload))
      )
    );
  }


  // -------------------------------------------------------------------------------------------
  buscarLibros(aBuscar:string){
  console.log("Buscando "+ aBuscar);

   this.librosDB = this.db.list('/libros', (ref) =>
   ref.orderByChild('titulo')
   .startAt(aBuscar.toLowerCase())
   .endAt(aBuscar.toLowerCase()+"\uf8ff"));

   console.log(this.librosDB);

    return this.getLibros();
  }

  // -------------------------------------------------------------------------------------------
  setLibroSeleccionado(libro:Libro){
    this.libroSeleccionado = libro;
  }

  getLibroSeleccionado(){
    return this.libroSeleccionado;
  }
}
