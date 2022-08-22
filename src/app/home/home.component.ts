import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Evento } from '../object/Evento';
import { Libro } from '../object/Libro';
import { AutenticacionService } from '../services/autenticacion.service';
import { EventosService } from '../services/eventos.service';
import { LibrosService } from '../services/libros.service';
import { DialogoComponent } from '../dialogo/dialogo.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Autorizacion
  user:any;

  // Listas
  lista: Observable<Array<Libro>>;
  listaEventos: Observable<Array<Evento>>;

  //Calendario
  monday: number;
  dias:any;
  es: any;
  value: Date;

  // Esteticos
  contadorLibros:number;
  totalLibros:number;

  // Localstorage
  name?:string;
  email?:string;
  phone?:string;
  photo?:any;

  // Orden
  esOrdenZA:boolean;

  // Libro info
  libroSeleccionado:Libro;

  constructor(private libroService: LibrosService, private eventoService:EventosService, private router: Router, private zone: NgZone,
     private autenticacionService:AutenticacionService, public dialog: MatDialog) { 

    this.lista = this.libroService.getLibros();
    this.listaEventos = this.eventoService.getEventos();

    this.monday = 1;

    this.user = this.autenticacionService.getUser();

    // Local Storage
    if(!this.user){
      this.name = localStorage.getItem('userName')!;
      this.email = localStorage.getItem('userEmail')!;
      this.phone = localStorage.getItem('userPhone')!;
      this.photo = localStorage.getItem('userPhoto')!;
    }

    this.contadorLibros = 0;
    this.totalLibros = 69;

    this.esOrdenZA = false;

  }

  ngOnInit(): void { 
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
    }

    this.funcionContadorLibros();
  }

  funcionContadorLibros(){
    let duracion = Math.floor(3000 / this.totalLibros);
    let c = setInterval(() =>{
      this.contadorLibros += 1;
      if(this.contadorLibros == this.totalLibros){
        clearInterval(c);
      }
    }, duracion);
  }

  // Metodo de prueba, eliminar mas tarde


  // Metodo de prueba, eliminar mas tarde
  addEvento(){
    let evento = {
      id:'2',
      nombre:'Primer Evento ',
      descripcion:'Este es el primer evento de la página web'
    };

    this.eventoService.addEvento(evento);
  }

  cargarMas(){

  }

  // Eventos
  onEnter(){
    console.log('ha pulsado enter');
    const aBuscar = (<HTMLInputElement>document.getElementById("input")).value;
    this.lista = this.libroService.buscarLibros(aBuscar);
  }


  // Clicks
  clickEventos(){
    window.location.hash = "#divEventos";
  }

  clickConocenos(){
    window.location.hash = "#fooder";
  }

  clickLogo(){
    window.location.reload();
  }

  perfilClick(){
    this.zone.run(() => {
      this.router.navigate(['/perfil']);
    });
  }

  filtroClick(){
    const dialogo =this.dialog.open(DialogoComponent, {
      width: '250px'
    });

    // Vaciar lista
    this.lista.forEach((e) => e.pop());

    dialogo.afterClosed().subscribe(() => {
      let orden = dialogo.componentInstance.getOrden();

      if(orden.includes('0')){
        this.lista = this.libroService.getLibrosOrdenadosAZ();
      }else if(orden.includes('1')){
        // Solo cambia el boolean y por tanto el HTML asociado
        this.lista = this.libroService.getLibrosOrdenadosAZ();
        this.esOrdenZA = false;
      }else if(orden.includes('2')){
        this.lista = this.libroService.getLibrosNuevos();
      }
    });
  }

  buscar(){} 

  pedirClick(){}
  reservarClick(){}

  libroClick(libro:any){
    this.libroSeleccionado = libro;
    this.libroService.setLibroSeleccionado(libro);
    this.zone.run(() => {
      this.router.navigate(['/infoLibro']);
    });
  }

  // Idiomas
  valenciaClick(){}
  espanolClick(){}
  englishClick(){}

  redClick(letra:string){
    switch(letra){
      case 'f':{
        window.location.href = 'https://facebook.com';
        break;
      }
      case 'i':{
        window.location.href = 'https://instagram.com';
        break;
      }
      case 't':{
        window.location.href = 'https://twitter.com';
        break;
      }
      case 'y':{
        window.location.href = 'https://youtube.com';
        break;
      }
    }
  }

  // Esteticos 
  aplicarNombreEstetico(s:string){
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
