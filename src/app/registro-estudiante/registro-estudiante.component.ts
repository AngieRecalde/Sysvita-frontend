import { Component } from '@angular/core';
import {Estudiante} from '../model/estudiante';
import {ReactiveFormsModule,FormGroup} from '@angular/forms';
import {EstudianteService } from './../service/estudiante.service';
import {FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import {CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-registro-estudiante',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registro-estudiante.component.html',
  styleUrl: './registro-estudiante.component.css'
})
export class RegistroEstudianteComponent {
  activarBienvenidaEstudiante: string = '';
  estudianteArray: Estudiante[] = [];
  estudianteForm : FormGroup;
  estudianteForm2: FormGroup;
  constructor(private estudianteService: EstudianteService,private router: Router){
    this.estudianteForm = new FormGroup({
      nombre: new FormControl('',[]),
      email: new FormControl('',[]),
      genero : new FormControl('',[]),
      password : new FormControl('',[]),
      edad : new FormControl('',[]),
      telefono: new FormControl('',[]),
      carrera: new FormControl('',[]),
      fecha_registro: new FormControl('', [])
    });
    this.estudianteForm2 = new FormGroup({
      email2: new FormControl('',[]),
      password2: new FormControl('',[]),
    });
  }

  ngOnInit():void{
    this.getEstudiante();
  }

  getEstudiante():void{
    this.estudianteService.getEstudiantes().subscribe(
      (result:any)=> {
        console.log(this.estudianteForm.value);
        Swal.close();
        this.estudianteArray = result.data;
      },(err:any)=> {
        console.log(err);
        Swal.close();
      }
    )
  }

  registrarEstudiante(): void {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)} ` +
                          `${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(-2)}:${('0' + now.getSeconds()).slice(-2)}`;

    
    this.estudianteForm.patchValue({
      fecha_registro: formattedDate  // Formato YYYY-MM-DD HH:MM:SS
    });
  
  
    this.estudianteService.registrarEstudiante(this.estudianteForm.value).subscribe(
      (result: any) => {
        if (result && result.status === 201) {
          this.estudianteForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso',
            text: 'Se registraron exitosamente los datos del estudiante'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al Registrar Estudiante',
            text: 'No se pudo registrar al estudiante'
          });
        }
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

  loginEstudiante(): void {
    if (this.estudianteForm2.valid) {
      const loginData = this.estudianteForm2.value;
      const loginDataFormatted = {
        email: loginData.email2,
        password: loginData.password2
      };

      console.log('Datos de inicio de sesión formateados:', loginDataFormatted);

      Swal.fire({
        title: 'Iniciando sesión...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.estudianteService.loginEstudiante(loginDataFormatted).subscribe(
        (result: any) => {
          Swal.close();
          this.estudianteForm2.reset();
          Swal.fire({
            icon: 'success',
            title: 'Ingreso Exitoso',
            text: 'Se inició sesión del estudiante'
          }).then(() => {
            this.router.navigate(['/bienvenido-estudiante']);
          });
        },
        (err: any) => {
          Swal.close();
          console.error('Error de inicio de sesión:', err);
          let errorMessage = 'Ha ocurrido un error al iniciar sesión, por favor intente nuevamente.';
          if (err.status === 401) {
            errorMessage = 'Credenciales inválidas, verifique su email y contraseña e intente nuevamente.';
          }
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: errorMessage
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulario no válido',
        text: 'Por favor, complete todos los campos requeridos antes de enviar.'
      });
    }
  }
  
}
