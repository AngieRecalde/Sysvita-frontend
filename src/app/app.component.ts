import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RegistroIngresoComponent } from './registro-ingreso/registro-ingreso.component';
import { FormsModule } from '@angular/forms';
import { BienvenidoEstudianteComponent } from './bienvenido-estudiante/bienvenido-estudiante.component';
import{EvaluacionEspecialistaComponent} from './evaluacion-especialista/evaluacion-especialista.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistroIngresoComponent,BienvenidoEstudianteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-demo01-crud';
}