import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { MatIconModule } from '@angular/material/icon';
import { AdminComponent } from './admin/admin.component'
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { DatabaseModule } from '@angular/fire/database';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfilComponent } from './perfil/perfil.component';
import { InfoLibroComponent } from './info-libro/info-libro.component';
import { DialogoComponent } from './dialogo/dialogo.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { NgxFileDropModule } from 'ngx-file-drop';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component';
import { HeaderComponent } from './header/header.component';
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import { ReportesComponent } from './reportes/reportes.component';
import { AdminSubirLibroComponent } from './admin-subir-libro/admin-subir-libro.component';
import { AdminBorrarLibroComponent } from './admin-borrar-libro/admin-borrar-libro.component';
import { AdminSubirEventoComponent } from './admin-subir-evento/admin-subir-evento.component';
import { AdminBajarEventoComponent } from './admin-bajar-evento/admin-bajar-evento.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    PerfilComponent,
    InfoLibroComponent,
    DialogoComponent,
    MisReservasComponent,
    HeaderComponent,
    ReportesComponent,
    AdminSubirLibroComponent,
    AdminBorrarLibroComponent,
    AdminSubirEventoComponent,
    AdminBajarEventoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule, 
    HttpClientModule,
    DatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule, ReactiveFormsModule,
    CalendarModule,
    MatFormFieldModule, MatSelectModule, MatSliderModule, MatInputModule,
    ButtonModule, RippleModule,
    NgxFileDropModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule, MatProgressSpinnerModule, MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
