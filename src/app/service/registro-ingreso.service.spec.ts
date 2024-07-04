import { TestBed } from '@angular/core/testing';

import { RegistroIngresoService } from './registro-ingreso.service';

describe('RegistroIngresoService', () => {
  let service: RegistroIngresoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroIngresoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
