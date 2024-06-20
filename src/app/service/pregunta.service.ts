import { Injectable } from '@angular/core';
import { Pregunta} from '../model/pregunta';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  readonly BASE_URL: string ='http://localhost:5000/preguntas';

  constructor(private http: HttpClient) { }
  cargarPregunta():Observable<Pregunta[]>{
    return this.http.get<Pregunta[]>(`${this.BASE_URL}/<int:id_test>`);
  }
}
