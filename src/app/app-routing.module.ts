import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { InfoLibroComponent } from './info-libro/info-libro.component';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'perfil', component:PerfilComponent},
  { path: 'infoLibro', component:InfoLibroComponent},
  { path: 'admin', component:AdminComponent},
  { path: 'mis-reservas', component:MisReservasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
