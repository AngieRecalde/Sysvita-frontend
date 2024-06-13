import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistroEstudianteComponent } from './registro-estudiante/registro-estudiante.component';


export const routes: Routes = [

  { path: 'registro-estudiante', component: RegistroEstudianteComponent },
  { path: '**', redirectTo: '' }


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }