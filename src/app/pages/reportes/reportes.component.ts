import { Component, OnInit } from '@angular/core';
import { ErroresService } from '../../services/errores.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  inputText:string;

  constructor(private erroresService:ErroresService) { }

  ngOnInit(): void {
  }

  enviarClick(){
    // Construir error en JSON
    let error={
      id:Date.now(),
      msg:this.inputText
    };
    this.erroresService.subirError(error);
    alert('Tu mensaje se ha enviado correctamente. Muchas gracias');
  }

}
