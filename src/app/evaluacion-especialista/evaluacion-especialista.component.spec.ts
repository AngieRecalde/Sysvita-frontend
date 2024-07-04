import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionEspecialistaComponent } from './evaluacion-especialista.component';

describe('EvaluacionEspecialistaComponent', () => {
  let component: EvaluacionEspecialistaComponent;
  let fixture: ComponentFixture<EvaluacionEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionEspecialistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
