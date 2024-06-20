import { Injectable } from '@angular/core';
import { Especialista} from '../model/especialista';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {
  readonly BASE_URL: string ='http://localhost:5000/especialista_routes';

  constructor(private http: HttpClient) { }
  getEspecialista():Observable<Especialista[]>{
    return this.http.get<Especialista[]>(`${this.BASE_URL}/listar`);
  }

  registrarEspecialista(form : any){
    return this.http.post<Especialista[]>(`${this.BASE_URL}/insert`, form);
  }
  
  loginEspecialista(form : any){
    return this.http.post<Especialista[]>(`${this.BASE_URL}/login`, form);
  }
  actualizarEspecialista(form : any){
    return this.http.post<Especialista[]>(`${this.BASE_URL}/update`, form);
  }
  eliminarEspecialista(especialista : Especialista){
    return this.http.delete<Especialista[]>(`${this.BASE_URL}/delete`, {body:especialista});
  }
}
