import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ubigeo } from '../model/ubigeo';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class MapaUbigeoService {
  private apiUrl = 'http://localhost:5000/mapacalor';

  constructor(private http: HttpClient) { }

  getHeatmapData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
