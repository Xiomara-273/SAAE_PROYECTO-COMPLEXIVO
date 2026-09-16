import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoPastel } from './grafico-pastel';

describe('GraficoPastel', () => {
  let component: GraficoPastel;
  let fixture: ComponentFixture<GraficoPastel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoPastel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoPastel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
