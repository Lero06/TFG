import { Component, OnInit } from '@angular/core';
import { Libro } from '../object/Libro';
import { LibrosService } from '../services/libros.service';


@Component({
  selector: 'app-info-libro',
  templateUrl: './info-libro.component.html',
  styleUrls: ['./info-libro.component.css']
})
export class InfoLibroComponent implements OnInit {

  libroSeleccionado:Libro;

  constructor(private libroService: LibrosService) { 
    this.libroSeleccionado = this.libroService.getLibroSeleccionado();
  }

  ngOnInit(): void {}

}
