import { Component, Input, NgZone, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AdminComponent } from '../admin/admin.component';
import { Libro } from '../../interfaces/Libro';
import { LibrosService } from '../../services/libros.service';
import { ReservasService } from '../../services/reservas.service';

@Component({
  selector: 'app-admin-subir-libro',
  templateUrl: './admin-subir-libro.component.html',
  styleUrls: ['./admin-subir-libro.component.css']
})
export class AdminSubirLibroComponent implements OnInit {

  // Controlar que haya texto 
  textFormControl = new FormControl('', [Validators.required]);
  textFormControl2 = new FormControl('', [Validators.required]);
  isbnFormControl = new FormControl('', [Validators.required, Validators.max(9999999999999), Validators.min(99999999)]);
  paginasFormControl = new FormControl('', [Validators.min(1)]);

  titulo:string;
  autor:string;
  isbn:string;
  editorial:string;
  paginas:string;

  categoriaSeleccionada:any;
  tipoSeleccionado:any;
  idiomaSeleccionado:any;
  fileSeleccionado:any;

  public files: NgxFileDropEntry[] = [];

  botonActivo:boolean;

    // Material dropdown
    categorias: any[] = [
      {value: 'acción-0', viewValue: 'Acción'},
      {value: 'autobiográficos-1', viewValue: 'Autobiográficos'},
      {value: 'autoayuda-2', viewValue: 'Autoayuda'},
      {value: 'científicos-3', viewValue: 'Científicos'},
      {value: 'ciencia-ficción-4', viewValue: 'Ciencia Ficción'},
      {value: 'comic-5', viewValue: 'Comic'},
      {value: 'cuento-6', viewValue: 'Cuento'},
      {value: 'de-viaje-7', viewValue: 'De Viaje'},
      {value: 'deporte-8', viewValue: 'Deporte'},
      {value: 'erótico-9', viewValue: 'Erótico'},
      {value: 'ficción-10', viewValue: 'Ficción'},
      {value: 'historia-11', viewValue: 'Historia'},
      {value: 'humor-12', viewValue: 'Humor'},
      {value: 'infantil-20', viewValue: 'Infantil'},
      {value: 'juveniles-13', viewValue: 'Juveniles'},
      {value: 'literatura-14', viewValue: 'Literatura'},
      {value: 'nuevo-15', viewValue: 'Nuevo'},
      {value: 'poéticos-16', viewValue: 'Poéticos'},
      {value: 'religión-17', viewValue: 'Religión'},
      {value: 'romance-18', viewValue: 'Romance'},
      {value: 'suspense-19', viewValue: 'Suspense'},
    ];
  
    idiomas: any[] = [
      {value: 'espanol-0', viewValue: 'Castellano'},
      {value: 'valencia-1', viewValue: 'Valencià'},
      {value: 'english-2', viewValue: 'English'},
      {value: 'otro-3', viewValue: 'Otro*'}
    ];
  
    tipos: any[] = [
      {value: 'libro-0', viewValue: 'Libro'},
      {value: 'revista-1', viewValue: 'Revista'},
      {value: 'periodico-2', viewValue: 'Periódico'},
      {value: 'ebook-3', viewValue: 'Ebook'},
      {value: 'cd-4', viewValue: 'CD/DVD'},
      {value: 'comic-5', viewValue: 'Comic'},
    ];
    

  constructor(private libroService: LibrosService, private reservasService:ReservasService, public adminComponent: AdminComponent) { }

  ngOnInit(): void {}

  async clickSubirLibro(){
    // Conversion a number
    const paginasNum : number = +this.paginas;
    const categoria = this.categoriaSeleccionada;
    const tipo = this.tipoSeleccionado;
    const idioma = this.idiomaSeleccionado;
    const date = new Date();
    let libro:Libro;

    if(!this.editorial){
      this.editorial = '';
      console.log('No hay editorial');
    }
    // Imagen
    if(this.fileSeleccionado){

       // Referencias a storage
      const storage = getStorage();
      const storageRef = ref(storage, 'images/'+this.titulo);

      // Esperamos a obtener respuesta
      const res = await uploadBytes(storageRef, this.fileSeleccionado).then(() => {
        console.log('Imagen Subida');
      });
      let portadaImgPath = await getDownloadURL(storageRef);

      // Subir libro con imagen
      libro = {
        id:date.toISOString(),
        titulo:this.titulo.toLocaleLowerCase(),
        autor:this.autor.toLocaleLowerCase(),
        isbn:this.isbn.toLocaleLowerCase(),
        editorial:this.editorial.toLocaleLowerCase(),
        paginas:paginasNum,
        categoria:categoria,
        tipo:tipo,
        idioma:idioma,
        disponible:true,
        portadaImgPath:portadaImgPath
      }

    }else{
      // Subir libro sin imagen
      libro = {
        id:date.toISOString(),
        titulo:this.titulo.toLocaleLowerCase(),
        autor:this.autor.toLocaleLowerCase(),
        isbn:this.isbn.toLocaleLowerCase(),
        editorial:this.editorial.toLocaleLowerCase(),
        paginas:paginasNum,
        categoria:categoria,
        tipo:tipo,
        idioma:idioma,
        disponible:true
      }
    }

    

    this.libroService.addLibroHTTP(libro);

    // Cambiar añadir estado de libro nuevo a disponibilidad
    this.reservasService.addNuevaDisponibilidad(libro);


    // Libro Subido
    alert('Se ha subido el libro con éxito');

    // Borrar inputs
    this.titulo = '';
    this.autor = '';
    this.isbn = '';
    this.editorial = '';
    this.paginas = '';
    this.categoriaSeleccionada = '';
    this.tipoSeleccionado = '';
    this.idiomaSeleccionado= '';
    this.fileSeleccionado= '';

    this.files = [];
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          this.fileSeleccionado = file;

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;

        this.fileSeleccionado = fileEntry;
      }
    }
  }

  public fileOver(event: any){
    console.log(event);
  }

  public fileLeave(event: any){
    console.log(event);
  }

  atrasDesdeSubir(){
    this.adminComponent.subirLibroActivado = false;
  }

  checkearTodosLosValoresLlenos(){
    if(!this.textFormControl.errors && !this.textFormControl2.errors 
      && !this.isbnFormControl.errors && !this.paginasFormControl.errors){
        // Si hay 2 inputs rellenados y se cambia el valor de otro, el boton está activo
        // Aqui hay un bug -> si se selecciona el mismo input, se desbloquea el boton
      if(this.categoriaSeleccionada && this.idiomaSeleccionado){
        this.botonActivo = true;
      }else if(this.categoriaSeleccionada && this.tipoSeleccionado){
        this.botonActivo = true;
      }else if(this.idiomaSeleccionado && this.tipoSeleccionado){
        this.botonActivo = true;
      }
    }else{
      this.botonActivo = false;
    }
  }

}
