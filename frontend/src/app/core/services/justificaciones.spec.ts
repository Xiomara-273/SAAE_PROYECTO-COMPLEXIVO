import { TestBed } from '@angular/core/testing';

import { Justificaciones } from './justificaciones';

describe('Justificaciones', () => {
  let service: Justificaciones;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Justificaciones);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
