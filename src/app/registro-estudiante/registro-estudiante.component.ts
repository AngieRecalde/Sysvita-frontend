import { Component } from '@angular/core';
import {Estudiante} from '../model/estudiante';
import {ReactiveFormsModule,FormGroup} from '@angular/forms';
import {EstudianteService } from './../service/estudiante.service';
import {FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-registro-estudiante',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registro-estudiante.component.html',
  styleUrl: './registro-estudiante.component.css'
})
export class RegistroEstudianteComponent {
  estudianteArray: Estudiante[] = [];
  estudianteForm : FormGroup;
  constructor(private estudianteService: EstudianteService){
    this.estudianteForm = new FormGroup({
      nombre: new FormControl('',[]),
      email: new FormControl('',[]),
      genero : new FormControl('',[]),
      password : new FormControl('',[]),
      edad : new FormControl('',[]),
      telefono: new FormControl('',[]),
      carrera: new FormControl('',[]),
      fechaRegistro: new FormControl('', [])
    });
  }

  ngOnit():void{
    this.getEstudiante();
  }

  getEstudiante():void{
    this.estudianteService.getEstudiantes().subscribe(
      (result:any)=> {
        console.log(this.estudianteForm.value);
        Swal.close();
        Swal.fire({
          icon:'success',
          title: 'registarEstudiante',
          text: 'Se ha registrado exitosamente de la estudiante',
        });
        this.estudianteArray = result.data;
      },(err:any)=> {
        console.log(err);
        Swal.close();
        Swal.fire(
         {icon:'error',
          title: 'Advertencia ....',
          text: 'Ah ocurrido un error',}
        );
      }

    )
  }

  registrarEstudiante(): void {
    this.estudianteForm.patchValue({
      fecha_registro: new Date().toISOString().split('T')[0]  // Formato YYYY-MM-DD
    });
  
    this.estudianteService.registrarEstudiante(this.estudianteForm.value).subscribe(
      (result: any) => {
        this.estudianteForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'Se registraron exitosamente los datos del estudiante'
        });
      },
      (err: any) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error al Registrar Estudiante',
          text: 'Ha ocurrido un error al registrar los datos del estudiante'
        });
      }
    );
  }
  
}
