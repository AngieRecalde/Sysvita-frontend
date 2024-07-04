import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { BienvenidoEstudianteComponent } from './bienvenido-estudiante/bienvenido-estudiante.component';
import { BienvenidoEspecialistaComponent } from './bienvenido-especialista/bienvenido-especialista.component';
import {ResultadosTestComponent} from './resultados-test/resultados-test.component';
import { TestComponent } from './test/test.component';
import {RegistroIngresoComponent} from './registro-ingreso/registro-ingreso.component';
import {EvaluacionEspecialistaComponent} from './evaluacion-especialista/evaluacion-especialista.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'bienvenido-estudiante', component: BienvenidoEstudianteComponent },
  { path: 'bienvenido-especialista', component: BienvenidoEspecialistaComponent },
  { path: 'test/:id', component: TestComponent },
  {path: 'registro-ingreso', component: RegistroIngresoComponent },
  {path: 'resultados-test',component:ResultadosTestComponent},
  {path: 'evaluacion-especialista/:id',component:EvaluacionEspecialistaComponent},
  { path: '**', redirectTo: '' }];
@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule,CommonModule],
  declarations: [
    // ... other components
    TestComponent
  ],
  exports: [RouterModule]
}) export class AppRoutingModule { }