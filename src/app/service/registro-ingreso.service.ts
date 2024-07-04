import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroIngresoService {
  private readonly BASE_URL: string = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  registrarUsuario(userData: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/registro_routes`, userData);
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, loginData);
  }

  getDepartamentos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}/departamentos`);
  }

  getProvincias(departamento: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}/provincias/${departamento}`);
  }

  getDistritos(departamento: string, provincia: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}/distritos/${departamento}/${provincia}`);
  }

  // Mantener métodos existentes si aún son necesarios
  getEstudiantes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/listar`);
  }
}