import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErroresService {

  constructor(private httpClient:HttpClient) { }

  subirError(error:any){
    this.httpClient.post('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/errores.json',error).subscribe(r=>console.log(r));
  }
}
