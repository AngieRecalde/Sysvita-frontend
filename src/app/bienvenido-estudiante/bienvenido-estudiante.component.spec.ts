import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidoEstudianteComponent } from './bienvenido-estudiante.component';

describe('BienvenidoEstudianteComponent', () => {
  let component: BienvenidoEstudianteComponent;
  let fixture: ComponentFixture<BienvenidoEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BienvenidoEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienvenidoEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
