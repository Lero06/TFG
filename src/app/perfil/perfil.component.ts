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

  currentUser:User;

  constructor(private autenticacionService:AutenticacionService, private router: Router, private zone: NgZone) { 
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

}
