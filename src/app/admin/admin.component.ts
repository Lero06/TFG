import { Component, OnInit } from '@angular/core';
import { Libro } from '../object/Libro';
import { LibrosService } from '../services/libros.service';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { NgxFileDropEntry } from 'ngx-file-drop';
import { Evento } from '../object/Evento';
import { EventosService } from '../services/eventos.service';
import { map, Observable } from 'rxjs';
import { _isNumberValue } from '@angular/cdk/coercion';
import { Reserva } from '../object/Reserva';
import { ReservasService } from '../services/reservas.service';
import { AutenticacionService } from '../services/autenticacion.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  // General
  subirLibroActivado:boolean;
  borrarLibroActivado:boolean;
  subirEventoActivado:boolean;
  borrarEventoActivado:boolean;
  gestionActivado:boolean;
  erroresActivado:boolean;

  // Subir Libro
  categoriaSeleccionada:any;
  tipoSeleccionado:any;
  idiomaSeleccionado:any;
  fileSeleccionado:any;

  // Borrar Libro
  libros:Observable<Libro[]>;
  librosAUX:Observable<Libro[]>;
  displayedColumns: string[] = ['título', 'autor', 'isbn', 'editorial'];
  cargado:boolean;
  filaABorrar:any;
  isbnABorrar:any;

  // Borrar Evento
  eventos:Observable<Evento[]>;
  displayedColumnsEv: string[] = ['nombre', 'descripcion'];
  filaEvABorrar:any;
  idABorrar:string;


  // Gestión de Reservas
  subirReservaActivo:boolean;
  reservas:Observable<Reserva[]>;
  valorInputGR:string;
  valorInputUser:string;
  existeLibro:boolean;
  resDisponibilidad:any;
  usuarioEncontrado:boolean;
  resUsuario:any;

  public files: NgxFileDropEntry[] = [];

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
  

  constructor(private libroService: LibrosService, private eventoServicio: EventosService,
     private reservasService:ReservasService, private autenticacionService:AutenticacionService) { 
    this.subirLibroActivado = false;
    this.borrarLibroActivado = false;
    this.subirEventoActivado = false;
    this.borrarEventoActivado = false;
    this.gestionActivado = false;
    this.erroresActivado = false;
  }

  ngOnInit(): void {
    // Instanciar tabla libros
    this.libros = this.libroService.getLibros();
    if(this.libros){
      this.cargado = true;
    }
    // Guardamos la lista en AUX
    this.librosAUX = this.libros;

     // Instanciar tabla eventos
     this.eventos = this.eventoServicio.getEventos();
  }

  /* --------------- GENERAL ---------------*/
  activarSubirLibro(){
    this.subirLibroActivado = true;
  }

  activarBorrarLibro(){
    this.borrarLibroActivado = true;
  }

  activarSubirEvento(){
    this.subirEventoActivado = true;
  }

  activarBorrarEvento(){
    this.borrarEventoActivado = true;
  }

  activarGestion(){
    this.gestionActivado = true;
  }

  activarGestionErrores(){
    this.erroresActivado = true;
  }

  /* --------------- SUBIR LIBRO ---------------*/
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

    this.libroService.addLibroHTTP(libro);

    // Cambiar añadir estado de libro nuevo a disponibilidad
    this.reservasService.addNuevaDisponibilidad(libro);

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

  atrasDesdeSubir(){
    this.subirLibroActivado = false;
  }


  /* --------------- BORRAR LIBRO ---------------*/
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
    this.borrarLibroActivado = false;
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


  /* --------------- SUBIR EVENTO ---------------*/
  async clickSubirEvento(){

    const titulo = (<HTMLInputElement>document.getElementById("inputTituloEv")).value.toLowerCase();
    const descripcion = (<HTMLInputElement>document.getElementById("inputDescrip")).value;

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

    const evento : Evento = {
      id:date.toISOString(),
      nombre:titulo,
      descripcion:descripcion,
      fecha:date,
      portadaImgPath:portadaImgPath
    }

    this.eventoServicio.addEvento(evento);

    // Libro Subido
    alert('Se ha subido el evento con éxito');

     // Borrar inputs
     (<HTMLInputElement>document.getElementById("inputTituloEv")).value = '';
     (<HTMLInputElement>document.getElementById("inputDescrip")).value = '';
     this.fileSeleccionado= '';
     this.files = [];
  }

  atrasDesdeSubirEv(){
    this.subirEventoActivado = false;
  }

  /* --------------- BORRAR EVENTO ---------------*/


  async clickBorrarEvento(){
    this.eventoServicio.borrarEvento(this.idABorrar);

    alert('Se ha borrado el evento con éxito');

    // Borrar Valor Boton
    this.filaEvABorrar = '';
  }

  atrasDesdeBorrarEv(){
    this.borrarEventoActivado = false;
  }

  filaEvClick(row:any){
    this.filaEvABorrar = row;
    this.idABorrar = row.nombre;
  }

   /* --------------- GESTION ERRORES ---------------*/
   
  atrasDesdeErrores(){
    this.erroresActivado = false;
  }


  /* --------------- GESTION DE RESERVAS---------------*/
  atrasDesdeGestion(){
    this.gestionActivado = false;
  }

  async buscarUsuario(){
    // Checkear Inputs
    const user = await this.autenticacionService.buscarUsuariosPorID(this.valorInputUser);
    user.subscribe((r) => {
      console.log(r);
      if(r == null){
        this.usuarioEncontrado = false;
      }else{
        this.usuarioEncontrado = true;
        this.resUsuario = r;
      }
    });
  }

  async buscarDisponibilidadLibro(){
    //  isbn = this.valorInputGR;
    // Controlar errores

    const disponibilidad = await this.reservasService.buscarDisponibilidad(this.valorInputGR);
    disponibilidad.subscribe((r) => {
      console.log(r);
      if(r == null){
        this.existeLibro = false;
      }else{
        this.existeLibro = true;
        this.resDisponibilidad = r;
      }
    });
  } 

  pedirLibro(isbnAPedir:string){
    this.reservasService.cambiarEstadoaND(isbnAPedir, this.valorInputUser);
    this.resDisponibilidad.estado = 'No Disponible';
  }

  seHaDevuelto(isbnADevolver:string){
    this.reservasService.cambiarEstadoaD(isbnADevolver);
    this.resDisponibilidad.estado = 'Disponible';
  }

  /* OTROS */
    // la casa de maria -> La Casa De Maria
    nombreAMayus(s:string){
      // Hacer las primeras letras MAYUS
      var splitStr = s.toLowerCase().split(' ');
      for (var i = 0; i < splitStr.length; i++) {
          // You do not need to check if i is larger than splitStr length, as your for does that for you
          // Assign it back to the array
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
      }
      // Directly return the joined string
      return splitStr.join(' '); 
    }
  
    aplicarNombreEstetico(s:string){
      if(!s){return '';}
      let res:string;
      res = s;
      // Poner ... si el nombre es muy largo
      if(s.length > 23){
        res = s.slice(0,23).concat('...');
      }
  
      // Hacer las primeras letras MAYUS
      var splitStr = res.toLowerCase().split(' ');
      for (var i = 0; i < splitStr.length; i++) {
          // You do not need to check if i is larger than splitStr length, as your for does that for you
          // Assign it back to the array
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
      }
      // Directly return the joined string
      return splitStr.join(' '); 
    }
}
