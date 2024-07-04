import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Test {
  id: number;
  nombre: string;
}
export interface ResultadoTest {
  id_resultado: number;
  email: string;
  nombres: string;
  apellidos: string;
  fecha_realizacion: string;
  nombre_test:string;
  tipo_test:string;
  id_ubigeo: string;
  ubigeo: string;
  puntaje: number;
  nivel: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestService {
  readonly BASE_URL :string ='http://localhost:5000';

  constructor(private http: HttpClient) { }
  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.BASE_URL}/obtener_tests`).pipe(
      catchError(this.handleError)
    );
    
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de red
      console.error('An error occurred:', error.error.message);
    } else {
      // El backend retornó un código de respuesta sin éxito.
      // El cuerpo de la respuesta puede contener pistas sobre lo que salió mal.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Retorna un observable con un mensaje de error orientado al usuario
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }



  cargarTest(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/cargar_test/${id}`);
  }
  
  enviarRespuestas(id_test: number, data: { id_usuario: number, respuestas: string }): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/respuestas/${id_test}`, data);
  }
  getResultadosEspecialista(): Observable<ResultadoTest[]> {
    return this.http.get<ResultadoTest[]>(`${this.BASE_URL}/resultados_especialista`)
      .pipe(catchError(this.handleError));
  }

  actualizarEvaluacion(id_resultado: number, datos: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/actualizar_evaluacion/${id_resultado}`, datos);
  }
  getDetallesEvaluacion(id_resultado: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/obtener_evaluacion/${id_resultado}`);
  }
  notificarPaciente(idResultado: number): Observable<any> {
    return this.http.post(`${this.BASE_URL}/notificar_paciente/${idResultado}`, {});
  }
}
