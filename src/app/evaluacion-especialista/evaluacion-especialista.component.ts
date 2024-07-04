import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { TestService } from './../service/test.service';
import { CommonModule } from '@angular/common';
interface DatosPaciente {
  apellidosYNombres: string;
  tipoTest: string;
  score: number;
  nivel: string;
  edad: number;
  email:string;
  telefono:string;
}
@Component({
  selector: 'app-evaluacion-especialista',
  templateUrl: './evaluacion-especialista.component.html',
  styleUrls: ['./evaluacion-especialista.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EvaluacionEspecialistaComponent implements OnInit {
  evaluacionForm: FormGroup;
  idResultado: number;
  datosPaciente: DatosPaciente = {
    apellidosYNombres: '',
    tipoTest: '',
    score: 0,
    nivel: '',
    edad: 0,
    email: '',
    telefono: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private testService: TestService
  ) {
    this.evaluacionForm = this.fb.group({
      diagnostico: ['', Validators.required],
      fundamentacion: ['', Validators.required],
      descripcion_tratamiento: ['', Validators.required],
      recomendacion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.idResultado = +this.route.snapshot.paramMap.get('id');
    this.cargarDatosEvaluacion();
  }
  cargarDatosEvaluacion() {
    this.testService.getDetallesEvaluacion(this.idResultado).subscribe(
      (datos) => {
        this.evaluacionForm.patchValue({
          diagnostico: datos.diagnostico,
          fundamentacion: datos.fundamentacion,
          descripcion_tratamiento: datos.descripcion_tratamiento,
          recomendacion: datos.recomendacion
        });
        // Actualizar otros campos del formulario según la imagen
        this.datosPaciente = {
          apellidosYNombres: datos.apellidos_y_nombres,
          tipoTest: datos.tipo_test,
          score: datos.score,
          nivel: datos.nivel,
          edad:datos.edad,
          email:datos.email,
          telefono: datos.telefono
        };
      },
      (error) => {
        console.error('Error al cargar los datos de la evaluación', error);
      }
    );
  }

  onSubmit() {
    if (this.evaluacionForm.valid) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const idEspecialista = currentUser.userData?.id_especialista;

      const datos = {
        ...this.evaluacionForm.value,
        id_especialista: idEspecialista
      };

      this.testService.actualizarEvaluacion(this.idResultado, datos).subscribe(
        response => {
          console.log('Evaluación actualizada con éxito', response);
          this.router.navigate(['/resultados-test']);
        },
        error => {
          console.error('Error al actualizar la evaluación', error);
        }
      );
    }
  }
  notificarPaciente() {
    this.testService.notificarPaciente(this.idResultado).subscribe(
      response => {
        console.log('Notificación enviada con éxito', response);
        alert('Notificación enviada al paciente');
      },
      error => {
        console.error('Error al enviar la notificación', error);
        alert('Error al enviar la notificación: ' + error.error.message);
      }
    );
  }
}
