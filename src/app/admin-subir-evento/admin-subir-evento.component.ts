import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AdminComponent } from '../admin/admin.component';
import { Evento } from '../object/Evento';
import { EventosService } from '../services/eventos.service';

@Component({
  selector: 'app-admin-subir-evento',
  templateUrl: './admin-subir-evento.component.html',
  styleUrls: ['./admin-subir-evento.component.css']
})
export class AdminSubirEventoComponent implements OnInit {

  fileSeleccionado:any;
  public files: NgxFileDropEntry[] = [];

  // Validadores
  textFormControl = new FormControl('', [Validators.required]);
  textFormControl2 = new FormControl('', [Validators.required]);

  constructor(private eventoServicio:EventosService, private adminComponent:AdminComponent) { }

  ngOnInit(): void {}

  async clickSubirEvento(){

    const titulo = (<HTMLInputElement>document.getElementById("inputTituloEv")).value.toLowerCase();
    const descripcion = (<HTMLInputElement>document.getElementById("inputDescrip")).value;
    const date = new Date();

    // Imagen
    // Referencias a storage
    let evento:Evento;
    if(this.fileSeleccionado){
      const storage = getStorage();
      const storageRef = ref(storage, 'images/'+titulo);

      // Esperamos a obtener respuesta
      const res = await uploadBytes(storageRef, this.fileSeleccionado).then(() => {
        console.log('Imagen de evento subida');
      });

      let portadaImgPath = await getDownloadURL(storageRef);

      evento = {
        id:date.toISOString(),
        nombre:titulo,
        descripcion:descripcion,
        fecha:date,
        portadaImgPath:portadaImgPath
      }
    }else{
      evento = {
        id:date.toISOString(),
        nombre:titulo,
        descripcion:descripcion,
        fecha:date,
      }
    }

    this.eventoServicio.addEventoHTTP(evento);

    // Libro Subido
    alert('Se ha subido el evento con éxito');

     // Borrar inputs
     (<HTMLInputElement>document.getElementById("inputTituloEv")).value = '';
     (<HTMLInputElement>document.getElementById("inputDescrip")).value = '';
     this.fileSeleccionado= '';
     this.files = [];
  }

  atrasDesdeSubirEv(){
    this.adminComponent.subirEventoActivado = false;
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          this.fileSeleccionado = file;

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;

        this.fileSeleccionado = fileEntry;
      }
    }
  }

  public fileOver(event: any){
    console.log(event);
  }

  public fileLeave(event: any){
    console.log(event);
  }

}
