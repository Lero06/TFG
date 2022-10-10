import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/interfaces/Evento';
import { EventosService } from 'src/app/services/eventos.service';
import { TitulosService } from 'src/app/services/titulos.service';
import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: 'app-admin-borrar-evento',
  templateUrl: './admin-borrar-evento.component.html',
  styleUrls: ['./admin-borrar-evento.component.css']
})
export class AdminBorrarEventoComponent implements OnInit {

  eventos:Observable<Evento[]>;
  displayedColumnsEv: string[] = ['nombre', 'descripcion'];
  filaEvABorrar:any;
  idABorrar:string;

  constructor(private eventoServicio:EventosService, private adminComponent:AdminComponent, private tituloService:TitulosService) { }

  ngOnInit(): void {
    // Instanciar tabla eventos
    this.eventos = this.eventoServicio.getEventos();
  }

  async clickBorrarEvento(){
    this.eventoServicio.borrarEvento(this.idABorrar);

    alert('Se ha borrado el evento con éxito');

    // Borrar Valor Boton
    this.filaEvABorrar = '';
    this.idABorrar = '';
  }

  atrasDesdeBorrarEv(){
    this.adminComponent.borrarEventoActivado = false;
  }

  filaEvClick(row:any){
    this.filaEvABorrar = row;
    this.idABorrar = row.nombre;
  }

  aplicarNombreEstetico(s:any){
    if(typeof s === 'string'){
      return this.tituloService.aplicarNombreEstetico(s);
    }else{
      return '';
    }
  }

  nombreAMayus(s:string){
    return this.tituloService.aplicarNombreEsteticoSimplificado(s);
  }

}
