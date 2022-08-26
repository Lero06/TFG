import { Component, NgZone, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { AutenticacionService } from '../services/autenticacion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  currentUser?:User;

  // Localstorage
  name?:string;
  email?:string;
  phone?:string;
  photo?:any;
  bibliotecaFav?:string;
  segBibliotecaFav?:string;

  constructor(private autenticacionService:AutenticacionService, private router: Router, private zone: NgZone) { 
    this.currentUser = this.autenticacionService.getUser();

    // Local Storage
    if(!this.currentUser){
      this.name = localStorage.getItem('userName')!;
      this.email = localStorage.getItem('userEmail')!;
      this.phone = localStorage.getItem('userPhone')!;
      this.photo = localStorage.getItem('userPhoto')!;
      this.bibliotecaFav = localStorage.getItem('userBibio')!;
      this.segBibliotecaFav = localStorage.getItem('userBiblioFav')!;
    }
  }

  ngOnInit(): void {

  }

  async onClickGoogle(){
    const user = await this.autenticacionService.getAutenticacion();
    this.currentUser = user;

    this.comprobarAutenticacion(user);
  }

  async onClickFacebook(){
    const user = await this.autenticacionService.getAutenticacionFacebook();
    this.currentUser = user;

    this.comprobarAutenticacion(user);
  }

  comprobarAutenticacion(user: User | null | undefined){
    if(user === null || user === undefined){
      this.autenticacionCorrecta(false);
      console.log('Autenticacion Incorrecta');
    }else{
      this.autenticacionCorrecta(true);
      console.log('Autenticacion Correcta');
    }
  }

  autenticacionCorrecta(b : boolean){
    if(b){
      this.zone.run(() => {
        this.router.navigate(['/']);
      });
    } else{
      alert("Error en la autenticación de usuario");
      this.zone.run(() => {
        this.router.navigate(['/perfil']);
      });
    }
  }

  // HTML
  obtenerTelefono(){
    if(this.currentUser?.phoneNumber != undefined){
      return this.currentUser.phoneNumber;
    }else if(this.phone != 'null'){
      console.log('phone');
      return this.phone;
    }else{
      return '?';
    }
  }

  obtenerBibliotecaFav(){
    if(this.bibliotecaFav != 'null'){
      return this.bibliotecaFav;
    }else{
      return '?';
    }
  }

  cerrarSesion(){
    if(this.currentUser){
      this.autenticacionService.hacerSignOut();
    }else{
      // Borrar los valores 
      this.name = '';
      this.email = '';
      this.phone = '';
      this.photo = '';
      this.bibliotecaFav = '';
      this.segBibliotecaFav = '';

      localStorage.setItem('userName','null');
      localStorage.setItem('userEmail','null');
      localStorage.setItem('userPhone','null');
      localStorage.setItem('userPhoto','null');
      localStorage.setItem('userBibio','null');
      localStorage.setItem('userBiblioFav','null');

    }

    // Ir a home
  }

}
