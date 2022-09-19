import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitulosService {

  constructor() { }

  // la casa de pepe el de los palotes -> La Casa De Pepe El...
  aplicarNombreEstetico(s:string){
    if(s==''){return '';}
    else if(!s){return ''}

    let res:string;
    res = s;
    // Poner ... si el nombre es muy largo
    if(s.length > 23){
      res = s.slice(0,23).concat('...');
    }

    // Hacer las primeras letras MAYUS
    var splitStr = res.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
  }

   // la casa de pepe -> La Casa De Pepe
  aplicarNombreEsteticoSimplificado(s:string){
    if(s==''){return '';}
    else if(!s){return ''}
    
    // Hacer las primeras letras MAYUS
    var splitStr = s.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
  }

  // Comic-91 -> Comic
  quitarNumsYGuion(s:string){
    let res = s.split('-');
    return res[0];
  }
}
