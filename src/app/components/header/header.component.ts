import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Autorizacion
  user:any;

  // Localstorage
  name?:string;
  email?:string;
  phone?:string;
  photo?:any;

  constructor(private router: Router, private zone: NgZone, private autenticacionService:AutenticacionService) { 
    this.user = this.autenticacionService.getUser();

    // Local Storage
    if(!this.user){
      this.name = localStorage.getItem('userName')!;
      this.email = localStorage.getItem('userEmail')!;
      this.phone = localStorage.getItem('userPhone')!;
      this.photo = localStorage.getItem('userPhoto')!;
    }
  }

  ngOnInit(): void {
  }

  clickLogo(){
    window.location.reload();
  }

  perfilClick(){
    this.zone.run(() => {
      this.router.navigate(['/perfil']);
    });
  }

  clickMisReservas(){
    this.zone.run(() => {
      this.router.navigate(['/mis-reservas']);
    });
  }

  clickEventos(){
    if(this.esHome()){
      window.location.hash = "#divEventos";
    }else{
      this.zone.run(() => {
        this.router.navigate(['/home#divEventos']);
      });
    }
  }

  clickConocenos(){
    if(this.esHome()){
      window.location.hash = "#fooder";
    }else{
      this.router.navigate(['/home#fooder']);
    }
  }

  esHome():boolean{
    if(this.router.url === ('/home')){
      return true;
    }else{
      return false;
    }
  }

  clickReportes(){
    this.zone.run(() => {
      this.router.navigate(['/reportes']);
    });
  }

}
