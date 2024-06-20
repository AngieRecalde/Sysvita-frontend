import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RegistroEstudianteComponent } from './registro-estudiante/registro-estudiante.component';
import { RegistroEspecialistaComponent } from './registro-especialista/registro-especialista.component';
import { InicioComponent } from './inicio/inicio.component';
import { BienvenidoEstudianteComponent } from './bienvenido-estudiante/bienvenido-estudiante.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'bienvenido-estudiante', component: BienvenidoEstudianteComponent },
  { path: 'test', component: TestComponent },
  { path: 'registro-estudiante', component: RegistroEstudianteComponent },
  { path: 'registro-especialista', component: RegistroEspecialistaComponent },
  { path: '**', redirectTo: '' }];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) export class AppRoutingModule { }