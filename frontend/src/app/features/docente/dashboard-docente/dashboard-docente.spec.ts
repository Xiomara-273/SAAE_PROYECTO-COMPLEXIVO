import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDocente } from './dashboard-docente';

describe('DashboardDocente', () => {
  let component: DashboardDocente;
  let fixture: ComponentFixture<DashboardDocente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDocente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDocente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
