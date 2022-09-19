import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: 'app-admin-gestion-errores',
  templateUrl: './admin-gestion-errores.component.html',
  styleUrls: ['./admin-gestion-errores.component.css']
})
export class AdminGestionErroresComponent implements OnInit {

  constructor(private adminComponent:AdminComponent) { }

  ngOnInit(): void {}

  atrasDesdeGestion(){
    this.adminComponent.erroresActivado = false;
  }

}
