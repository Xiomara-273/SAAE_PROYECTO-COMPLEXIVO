import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasAsistencia } from './estadisticas-asistencia';

describe('EstadisticasAsistencia', () => {
  let component: EstadisticasAsistencia;
  let fixture: ComponentFixture<EstadisticasAsistencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticasAsistencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticasAsistencia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
