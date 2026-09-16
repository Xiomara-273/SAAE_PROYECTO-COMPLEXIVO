import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarJustificacion } from './solicitar-justificacion';

describe('SolicitarJustificacion', () => {
  let component: SolicitarJustificacion;
  let fixture: ComponentFixture<SolicitarJustificacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarJustificacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarJustificacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
