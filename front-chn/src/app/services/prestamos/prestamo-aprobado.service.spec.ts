import { TestBed } from '@angular/core/testing';

import { PrestamoAprobadoService } from './prestamo-aprobado.service';

describe('PrestamoAprobadoService', () => {
  let service: PrestamoAprobadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestamoAprobadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
