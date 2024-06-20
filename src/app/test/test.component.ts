import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  preguntas: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Supongamos que el id_test es 1
    this.getPreguntas(1);
  }

  getPreguntas(id_test: number) {
    this.http.get(`/preguntas/${id_test}`).subscribe(
      (res: any) => {
        this.preguntas = res.preguntas;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}