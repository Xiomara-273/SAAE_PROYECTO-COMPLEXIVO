import { TestBed } from '@angular/core/testing';

import { DashboardEstudiante } from './dashboard-estudiante';

describe('DashboardEstudiante', () => {
  let service: DashboardEstudiante;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardEstudiante);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
