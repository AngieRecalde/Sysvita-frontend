import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidoEspecialistaComponent } from './bienvenido-especialista.component';

describe('BienvenidoEspecialistaComponent', () => {
  let component: BienvenidoEspecialistaComponent;
  let fixture: ComponentFixture<BienvenidoEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BienvenidoEspecialistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienvenidoEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
