import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RegistroEstudianteComponent} from './registro-estudiante/registro-estudiante.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistroEstudianteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-demo01-crud';
}
