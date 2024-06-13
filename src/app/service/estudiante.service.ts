import { Injectable } from '@angular/core';
import { Estudiante } from '../model/estudiante';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  readonly BASE_URL: string ='http://localhost:5000/sysvita/estudiantes';

  constructor(private http: HttpClient) { }

  getEstudiantes():Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(`${this.BASE_URL}/listar`);
  }
  registrarEstudiante(form : any){
    return this.http.post<Estudiante[]>(`${this.BASE_URL}/insert`, form);
  }
  actualizarEstudiante(form : any){
    return this.http.post<Estudiante[]>(`${this.BASE_URL}/update`, form);
  }
  eliminarEstudiante(estudiante : Estudiante){
    return this.http.delete<Estudiante[]>(`${this.BASE_URL}/delete`, {body:estudiante});
  }
}