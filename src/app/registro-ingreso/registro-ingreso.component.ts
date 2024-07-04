import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegistroIngresoService } from './../service/registro-ingreso.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro-ingreso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registro-ingreso.component.html',
  styleUrl: './registro-ingreso.component.css',
  providers: [RegistroIngresoService]
})
export class RegistroIngresoComponent {
  registroForm: FormGroup;
  loginForm: FormGroup;
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: string[] = [];
  tiposUsuario: string[] = ['Estudiante', 'Especialista'];
  carreras: string[] = [
    'Medicina Humana', 'Derecho', 'Ingeniería de Sistemas', 'Psicología',
    'Contabilidad', 'Administración', 'Economía', 'Educación',
    'Ingeniería Industrial', 'Biología', 'Química', 'Física',
    'Literatura', 'Historia', 'Sociología', 'Antropología',
    'Enfermería', 'Odontología', 'Farmacia y Bioquímica', 'Ingeniería Electrónica'
  ];

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroIngresoService,private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password_hash: ['', Validators.required],
      telefono: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(15), Validators.max(100)]],
      genero: ['', Validators.required],
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      carrera: [''],
      especialidad: ['']
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password_hash: ['', Validators.required]
    });

    this.cargarDepartamentos();
  }

  cargarDepartamentos() {
    this.registroService.getDepartamentos().subscribe({
      next: (deps) => this.departamentos = deps,
      error: (error) => {
        console.error('Error al cargar departamentos', error);
        if (error.status === 0) {
          console.error('No se pudo conectar al servidor. Verifica que el servidor backend esté en ejecución.');
        }
      }
    });
  }
  onDepartamentoChange() {
    const departamento = this.registroForm.get('departamento')?.value;
    if (departamento) {
      this.registroService.getProvincias(departamento).subscribe({
        next: (provs) => {
          this.provincias = provs;
          this.registroForm.patchValue({ provincia: '', distrito: '' });
        },
        error: (error) => console.error('Error al cargar provincias', error)
      });
    }
  }

  onProvinciaChange() {
    const departamento = this.registroForm.get('departamento')?.value;
    const provincia = this.registroForm.get('provincia')?.value;
    if (departamento && provincia) {
      this.registroService.getDistritos(departamento, provincia).subscribe({
        next: (dists) => {
          this.distritos = dists;
          this.registroForm.patchValue({ distrito: '' });
        },
        error: (error) => console.error('Error al cargar distritos', error)
      });
    }
  }

  onTipoUsuarioChange() {
    const tipoUsuario = this.registroForm.get('tipoUsuario')?.value;
    if (tipoUsuario === 'Estudiante') {
      this.registroForm.get('carrera')?.setValidators([Validators.required]);
      this.registroForm.get('especialidad')?.clearValidators();
    } else {
      this.registroForm.get('especialidad')?.setValidators([Validators.required]);
      this.registroForm.get('carrera')?.clearValidators();
    }
    this.registroForm.get('carrera')?.updateValueAndValidity();
    this.registroForm.get('especialidad')?.updateValueAndValidity();
  }

  onRegistro() {
    if (this.registroForm.valid) {
      const userData = {
        ...this.registroForm.value,
        rol: this.registroForm.get('tipoUsuario')?.value
      };
      this.registroService.registrarUsuario(userData).subscribe({
        next: (response) => {
          console.log('Usuario registrado con éxito', response);
          Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso',
            text: 'Se registraron exitosamente los datos del estudiante'
          });
          // Considerar redirigir al usuario o mostrar el formulario de login
          this.toggleForm('login');
        },
        error: (error) => {
          console.error('Error al registrar usuario', error);
          Swal.fire({
            icon: 'error',
            title: 'Error en el Registro',
            text: 'No se pudo completar el registro. Por favor, intente nuevamente.'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario Incompleto',
        text: 'Por favor, complete todos los campos requeridos.'
      });
    }
  }
  

  onLogin() {
  if (this.loginForm.valid) {
    const loginData = {
      email: this.loginForm.get('email')?.value,
      password_hash: this.loginForm.get('password_hash')?.value
    };
    this.registroService.login(loginData).subscribe({
      next: (response: any) => {
        console.log('Login exitoso', response); // Imprime la respuesta completa para depuración

        // Verifica qué campos específicos está devolviendo el servicio
        const id_usuario = response.id_usuario; // Asegúrate de que 'id_usuario' esté presente en la respuesta

        Swal.fire({
          icon: 'success',
          title: 'Login Exitoso',
          text: 'Has iniciado sesión correctamente'
        });

        const userData = {
          user_id: response.user_id,// Asigna el id_usuario desde la respuesta del servicio
          rol: response.rol,
          id_persona: response.id_persona,
          id_especialista: response.id_especialista || null,
        };
        localStorage.setItem('currentUser', JSON.stringify(userData)); // Guarda los datos en localStorage

        console.log('Usuario guardado en localStorage:', JSON.parse(localStorage.getItem('currentUser') || '{}'));
        console.log('ID de usuario:', userData.user_id); // Imprime el id_usuario en la consola

        switch(response.rol) {
          case 'Estudiante':
            this.router.navigate(['/bienvenido-estudiante']);
            break;
          case 'Especialista':
            this.router.navigate(['/bienvenido-especialista']);
            break;
          default:
            console.error('Rol de usuario no reconocido');
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Rol de usuario no reconocido'
            });
        }
      },
      error: (error) => {
        console.error('Error en el login', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de Login',
          text: 'Credenciales incorrectas o problema en el servidor'
        });
      }
    });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Formulario Incompleto',
      text: 'Por favor, complete todos los campos requeridos.'
    });
  }
}


  toggleForm(formType: 'login' | 'registro') {
    const container = document.getElementById('container');
    if (container) {
      if (formType === 'login') {
        container.classList.remove('active');
      } else {
        container.classList.add('active');
      }
    }
  }
}