import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { Evento } from '../object/Evento';
import { Libro } from '../object/Libro';
import { AutenticacionService } from '../services/autenticacion.service';
import { EventosService } from '../services/eventos.service';
import { LibrosService } from '../services/libros.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  es: any;

  value: Date;

  user:any;

  lista: Observable<Array<Libro>>;
  listaEventos: Observable<Array<Evento>>;

  //Calendario
  monday: number;
  dias:any;

  constructor(private libroService: LibrosService, private eventoService:EventosService, private router: Router, private zone: NgZone,
     private autenticacionService:AutenticacionService) { 

    this.lista = this.libroService.getLibros();
    this.listaEventos = this.eventoService.getEventos();

    this.monday = 1;

    this.user = this.autenticacionService.getUser();

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
  }

  // Metodo de prueba, eliminar mas tarde
  // hay que ponerlos en minuscula
  addLibro(){
    let libro = {
      id:'2',
      titulo:'El',
      autor:'Yo',
      isbn:'asdfasdf',
      editorial:'asdfasdf',
      edicion:'23423',
      categoria:'sdfgsdfg',
      tipo:'sdfgsdf',
      idioma:'sdfgsdf',
      ubicacion:'sdfgsdf',
      disponible:false
    };
    this.libroService.addLibro(libro);
  }

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
  perfilClick(){
    this.zone.run(() => {
      this.router.navigate(['/perfil']);
    });


  }

  filtroClick(){}

  buscar(){}

  pedirClick(){}
  reservarClick(){}

  libroClick(){
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

}
