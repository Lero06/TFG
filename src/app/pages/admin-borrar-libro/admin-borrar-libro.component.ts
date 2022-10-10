import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AdminComponent } from '../admin/admin.component';
import { Libro } from '../../interfaces/Libro';
import { LibrosService } from '../../services/libros.service';
import { TitulosService } from '../../services/titulos.service';

@Component({
  selector: 'app-admin-borrar-libro',
  templateUrl: './admin-borrar-libro.component.html',
  styleUrls: ['./admin-borrar-libro.component.css']
})
export class AdminBorrarLibroComponent implements OnInit {

  libros:Observable<Libro[]>;
  librosAUX:Observable<Libro[]>;
  displayedColumns: string[] = ['título', 'autor', 'isbn', 'editorial'];
  cargado:boolean;
  filaABorrar:any;
  isbnABorrar:any;

  constructor(private libroService:LibrosService, private adminComponent:AdminComponent, private tituloService:TitulosService) { }

  ngOnInit(): void {
    // Instanciar tabla libros
    this.libros = this.libroService.getLibros();
    if(this.libros){
      this.cargado = true;
    }
    // Guardamos la lista en AUX
    this.librosAUX = this.libros;
  }

  async clickBorrarLibro(){
    // TODO BORRARLO DE LA BD
    this.libros = this.libros.pipe(map(
      libros => libros.filter(libro => libro.isbn != (this.isbnABorrar)
    )));
    this.libroService.borrarLibro(this.isbnABorrar);

    alert('Se ha borrado el libro con éxito');

    // Borrar Valor Boton
    this.filaABorrar = '';
  }

  atrasDesdeBorrar(){
    this.adminComponent.borrarLibroActivado = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ''){
      this.libros = this.librosAUX;
    }else{
    this.libros = this.libros.pipe(map(
      libros => libros.filter(libro => libro.isbn.includes(filterValue)
    ))); //= filterValue.trim().toLowerCase();
    }
  }

  filaClick(row:any){
    console.log(row.isbn);
    this.filaABorrar = row;
    this.isbnABorrar = row.isbn;
    //this.libros = this.libros.pipe(map(
      //libros => libros.filter(libro => libro.isbn.includes(filterValue)
    //)));
  }

  aplicarNombreEstetico(s:any){
    if(typeof s === 'string'){
      return this.tituloService.aplicarNombreEstetico(s);
    }else{
      return '';
    }
  }

  nombreAMayus(s:string){
    return this.tituloService.aplicarNombreEsteticoSimplificado(s);
  }

}
