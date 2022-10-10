import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {

  ordenSeleccionado:string;

  orden: any[] = [
    {value: 'az-0', viewValue: 'A-Z'},
    {value: 'za-1', viewValue: 'Z-A'},
    {value: 'new-2', viewValue: 'Solo Nuevos'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ordenCambiado(orden:any){
    this.ordenSeleccionado = orden;
  }

  getOrden(){
    return this.ordenSeleccionado;
  }

}
