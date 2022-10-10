import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './home/home.component';
import { InfoLibroComponent } from './pages/info-libro/info-libro.component';
import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ReportesComponent } from './pages/reportes/reportes.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component:PerfilComponent},
  { path: 'detalles-libro', component:InfoLibroComponent},
  { path: 'admin', component:AdminComponent},
  { path: 'mis-reservas', component:MisReservasComponent},
  { path: 'reportes', component:ReportesComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
