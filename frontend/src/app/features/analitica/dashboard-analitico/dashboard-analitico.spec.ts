import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAnalitico } from './dashboard-analitico';

describe('DashboardAnalitico', () => {
  let component: DashboardAnalitico;
  let fixture: ComponentFixture<DashboardAnalitico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAnalitico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAnalitico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
