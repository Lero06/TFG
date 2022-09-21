import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminComponent } from '../admin/admin.component';
import { Problema } from '../object/Problema';
import { ErroresService } from '../services/errores.service';
import { TitulosService } from '../services/titulos.service';

@Component({
  selector: 'app-admin-gestion-errores',
  templateUrl: './admin-gestion-errores.component.html',
  styleUrls: ['./admin-gestion-errores.component.css']
})
export class AdminGestionErroresComponent implements OnInit {

  errores:Observable<Problema[]>;
  errorSeleccionado:Problema;
  index?:number;

  constructor(private adminComponent:AdminComponent, private erroresService:ErroresService, private tituloService:TitulosService) { }

  ngOnInit(): void {
    this.errores = this.erroresService.getErrores();
    console.log(this.errores);
  }

  atrasDesdeGestion(){
    this.adminComponent.erroresActivado = false;
  }

  itemClick(error:Problema, indice:number){
    this.errorSeleccionado = error;
    console.log(indice);
    this.index = indice + 1;
  }

  aplicarNombreEstetico(s:any){
    if(!this.errorSeleccionado){return '';}
    else if(this.errorSeleccionado.msg == ''){return '';}
    return this.tituloService.aplicarNombreEstetico(s.msg);
  }

  borrar(errorSeleccionado:Problema){
    this.erroresService.borrarError(errorSeleccionado);
    delete this.index;
    this.errorSeleccionado.msg = '';
  }

}
