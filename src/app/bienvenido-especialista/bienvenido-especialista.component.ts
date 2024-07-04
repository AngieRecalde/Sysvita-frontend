import { Component, OnInit,inject } from '@angular/core';
import { TestService} from './../service/test.service';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Test {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-bienvenido-especialista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bienvenido-especialista.component.html',
  styleUrl: './bienvenido-especialista.component.css'
})
export class BienvenidoEspecialistaComponent implements OnInit {
  private http = inject(HttpClient);
  tests: Test[] = [];
  constructor(private testService: TestService) { }
  ngOnInit(): void {
    this.getTests();
  }
  getTests(): void {
    this.testService.getTests().subscribe({
      next: (data) => {
        this.tests = data;
        console.log('Tests cargados:', this.tests);
      },
      error: (error) => {
        console.error('Error al cargar los tests:', error);
        if (error instanceof HttpErrorResponse) {
          console.error('Status:', error.status);
          console.error('Body:', error.error);
        }
      }
    });
  }


}
