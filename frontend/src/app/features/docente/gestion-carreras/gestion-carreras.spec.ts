import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCarreras } from './gestion-carreras';

describe('GestionCarreras', () => {
  let component: GestionCarreras;
  let fixture: ComponentFixture<GestionCarreras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCarreras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCarreras);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
