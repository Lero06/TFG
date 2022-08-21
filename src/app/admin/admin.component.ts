import { Component, OnInit } from '@angular/core';
import { Libro } from '../object/Libro';
import { LibrosService } from '../services/libros.service';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { NgxFileDropEntry } from 'ngx-file-drop';

const categorias = ['acción','autobiográficos','autoayuda',
'científicos','ciencia ficción','comic','cuento','de viaje','deporte',
'erótico','ficción','historia','humor','juveniles','literatura','nuevo',
'poéticos','religión','romance','suspense'];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  categoriaSeleccionada:any;
  tipoSeleccionado:any;
  idiomaSeleccionado:any;
  fileSeleccionado:any;

  public files: NgxFileDropEntry[] = [];



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
    {value: 'cd-4', viewValue: 'CD/DVD'}
  ];
  

  constructor(private libroService: LibrosService) { }

  ngOnInit(): void {}

  async clickSubirLibro(){
    const titulo = (<HTMLInputElement>document.getElementById("inputTitulo")).value.toLowerCase();

    const autor = (<HTMLInputElement>document.getElementById("inputAutor")).value.toLowerCase();

    const isbn = (<HTMLInputElement>document.getElementById("inputISBN")).value;

    const editorial = (<HTMLInputElement>document.getElementById("inputEditorial")).value.toLowerCase();

    const paginas = (<HTMLInputElement>document.getElementById("inputPaginas")).value;
    // Conversion a number
    const paginasNum : number = +paginas;

    const categoria = this.categoriaSeleccionada;

    const tipo = this.tipoSeleccionado;

    const idioma = this.idiomaSeleccionado;

    // Imagen
    const input = (<HTMLInputElement>document.getElementById("inputFile"));

    // Referencias a storage
    const storage = getStorage();
    const storageRef = ref(storage, 'images/'+titulo);

    // Esperamos a obtener respuesta
    const res = await uploadBytes(storageRef, this.fileSeleccionado).then(() => {
      console.log('Uploaded a fileee!');
    });

    const date = new Date();

    let portadaImgPath = await getDownloadURL(storageRef);

    const libro : Libro = {
      id:date.toISOString(),
      titulo:titulo,
      autor:autor,
      isbn:isbn,
      editorial:editorial,
      paginas:paginasNum,
      categoria:categoria,
      tipo:tipo,
      idioma:idioma,
      disponible:true,
      portadaImgPath:portadaImgPath
    }

    this.libroService.addLibro(libro);

    // Libro Subido
    alert('Se ha subido el libro con éxito');

    // Borrar inputs
    (<HTMLInputElement>document.getElementById("inputTitulo")).value = '';
    (<HTMLInputElement>document.getElementById("inputAutor")).value = '';
    (<HTMLInputElement>document.getElementById("inputISBN")).value = '';
    (<HTMLInputElement>document.getElementById("inputEditorial")).value = '';
    (<HTMLInputElement>document.getElementById("inputPaginas")).value = '';

    this.categoriaSeleccionada = '';
    this.tipoSeleccionado = '';
    this.idiomaSeleccionado= '';
    this.fileSeleccionado= '';

    this.files = [];
  }

  categoriaCambiada(categoria:any){
    this.categoriaSeleccionada = categoria;
  }

  tipoCambiado(tipo:any){
    this.tipoSeleccionado = tipo;
  }

  idiomaCambiado(idioma:any){
    this.idiomaSeleccionado = idioma;
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

}