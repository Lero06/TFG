import { TestBed } from '@angular/core/testing';

import { ColaReservasService } from './cola-reservas.service';

describe('ColaReservasService', () => {
  let service: ColaReservasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColaReservasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
