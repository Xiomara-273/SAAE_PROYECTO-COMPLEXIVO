import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionJustificaciones } from './revision-justificaciones';

describe('RevisionJustificaciones', () => {
  let component: RevisionJustificaciones;
  let fixture: ComponentFixture<RevisionJustificaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisionJustificaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisionJustificaciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
