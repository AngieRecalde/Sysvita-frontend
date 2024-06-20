import { Component } from '@angular/core';
import {Especialista} from '../model/especialista';
import {ReactiveFormsModule,FormGroup} from '@angular/forms';
import {EspecialistaService } from './../service/especialista.service';
import {FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-registro-especialista',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registro-especialista.component.html',
  styleUrl: './registro-especialista.component.css'
})

export class RegistroEspecialistaComponent {
  especialistaArray: Especialista[] = [];
  especialistaForm : FormGroup;
  especialistaForm2: FormGroup;
  constructor(private especialistaService: EspecialistaService){
    this.especialistaForm = new FormGroup({
      nombre: new FormControl('',[]),
      email: new FormControl('',[]),
      password : new FormControl('',[]),
      telefono: new FormControl('',[]),
      especialidad: new FormControl('',[]),
      fecha_registro: new FormControl('', [])
    });
    this.especialistaForm2 = new FormGroup({
      email2: new FormControl('',[]),
      password2: new FormControl('',[]),
    });
  }

  ngOnInit():void{
    this.getEspecialista();
  }

  getEspecialista():void{
    this.especialistaService.getEspecialista().subscribe(
      (result:any)=> {
        console.log(this.especialistaForm.value);
        Swal.close();
        this.especialistaArray = result.data;
      },(err:any)=> {
        console.log(err);
        Swal.close();
      }
    )
  }

  registrarEspecialista(): void {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)} ` +
                          `${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(-2)}:${('0' + now.getSeconds()).slice(-2)}`;

    
    this.especialistaForm.patchValue({
      fecha_registro: formattedDate  // Formato YYYY-MM-DD HH:MM:SS
    });
  
    this.especialistaService.registrarEspecialista(this.especialistaForm.value).subscribe(
      (result: any) => {
        if (result && result.status === 201) {
          this.especialistaForm.reset();
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

  loginEspecialista(): void {
    if (this.especialistaForm2.valid) {
      const loginData = this.especialistaForm2.value;
  
      // Crear un nuevo objeto con los nombres de campos correctos
      const loginDataFormatted = {
        email: loginData.email2,
        password: loginData.password2
      };
  
      console.log('Datos de inicio de sesión formateados:', loginDataFormatted);
  
      // Mostrar un indicador de carga
      Swal.fire({
        title: 'Iniciando sesión...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      this.especialistaService.loginEspecialista(loginDataFormatted).subscribe(
        (result: any) => {
          Swal.close(); // Cerrar el indicador de carga
          this.especialistaForm2.reset();
          Swal.fire({
            icon: 'success',
            title: 'Ingreso Exitoso',
            text: 'Se inició sesión del estudiante'
          });
        },
        (err: any) => {
          Swal.close(); // Cerrar el indicador de carga
          console.error('Error de inicio de sesión:', err);
  
          let errorMessage = 'Ha ocurrido un error al iniciar sesión, por favor intente nuevamente.';
  
          // Manejo específico del error 401 (Credenciales inválidas)
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
