import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../service/test.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  test: any;
  respuestas: { [key: number]: number } = {};
  cargando = true;
  error = false;
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.respuestas = {};
  
    // Verificar si localStorage está disponible (esto generalmente no es necesario en navegadores modernos)
    if (typeof localStorage !== 'undefined') {
      const currentUserString = localStorage.getItem('currentUser');
      if (currentUserString) {
        try {
          this.currentUser = JSON.parse(currentUserString);
          // Verificar si el usuario tiene un id válido
          if (!this.currentUser.user_id) {
            console.error('ID de usuario no encontrado en localStorage');
            this.router.navigate(['/login']);
            return;
          }
        } catch (error) {
          console.error('Error al parsear la información del usuario', error);
          this.router.navigate(['/login']);
          return;
        }
      } else {
        console.log('No se encontró información del usuario en localStorage');
        this.router.navigate(['/login']);
        return;
      }
    } else {
      // Este caso es muy improbable en navegadores modernos
      console.warn('localStorage no está disponible, usando usuario de demostración');
      this.currentUser = { id_usuario: 1, username: 'demo_user' };
    }
  
    // Obtener el ID del test de los parámetros de la ruta
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarTest(+id); // El '+' convierte el string a número
    } else {
      console.error('No se proporcionó ID del test en la URL');
      this.error = true;
      this.cargando = false;
    }
  }

  cargarTest(id: number) {
    this.cargando = true;
  this.error = false;
  this.respuestas = {}; // Reiniciar las respuestas para el nuevo test

  this.testService.cargarTest(id).subscribe({
    next: (data) => {
      this.test = data;
      this.cargando = false;
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Error al cargar el test:', error);
      this.error = true;
      this.cargando = false;
      this.cdr.detectChanges();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al cargar el siguiente test. Por favor, intenta de nuevo.'
      });
    }
  });
  }

  enviarRespuestas() {
    const totalPreguntas = this.test.preguntas.length;
    const totalRespuestas = Object.keys(this.respuestas).length;
  
    if (totalRespuestas !== totalPreguntas) {
      Swal.fire({
        icon: 'warning',
        title: 'Faltan preguntas por responder',
        text: 'Por favor, responde todas las preguntas antes de terminar el test.'
      });
    } else {
      let respuestasString = '';
      for (let i = 1; i <= totalPreguntas; i++) {
        respuestasString += this.respuestas[i];
      }
  
      // Obtener la información del usuario del localStorage
      const currentUserString = localStorage.getItem('currentUser');
      if (!currentUserString) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se encontró información del usuario. Por favor, inicia sesión nuevamente.'
        });
        this.router.navigate(['/login']);
        return;
      }
  
      const currentUser = JSON.parse(currentUserString);
      const id_usuario = currentUser.user_id; // Asegúrate de que la clave sea correcta
  
      if (!id_usuario) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente.'
        });
        this.router.navigate(['/login']);
        return;
      }
  
      const requestData = {
        id_usuario: id_usuario,
        respuestas: respuestasString
      };
  
      this.testService.enviarRespuestas(this.test.id_test, requestData).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Test completado',
            text: `Tipo: ${response.tipo_nivel} Nivel: ${response.nivel}.`
          }).then(() => {
            this.redirigirSiguienteTest();
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al procesar el test. Por favor, intenta de nuevo.'
          });
        }
      });
    }
  }
  
  redirigirSiguienteTest() {
    // Suponiendo que tienes un array con los IDs de los tests
  const todosLosTests = [1, 2, 3, 4]; // Ajusta esto según tus necesidades
  const indexActual = todosLosTests.indexOf(this.test.id_test);
  
  if (indexActual < todosLosTests.length - 1) {
    // Hay más tests por completar
    const siguienteTestId = todosLosTests[indexActual + 1];
    this.cargarTest(siguienteTestId);
  } else {
    // Todos los tests han sido completados
    Swal.fire({
      icon: 'success',
      title: 'Todos los tests completados',
      text: 'Has finalizado todos los tests disponibles.'
    }).then(() => {
      this.router.navigate(['/bienvenido-estudiante']); // O cualquier otra ruta que desees
    });
  }
  
  }



}