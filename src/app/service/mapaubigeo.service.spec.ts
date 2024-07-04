import { TestBed } from '@angular/core/testing';

import { MapaUbigeoService } from './mapaubigeo.service';

describe('MapaubigeoService', () => {
  let service: MapaUbigeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapaUbigeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
