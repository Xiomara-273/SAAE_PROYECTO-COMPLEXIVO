import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesAnalitica } from './reportes-analitica';

describe('ReportesAnalitica', () => {
  let component: ReportesAnalitica;
  let fixture: ComponentFixture<ReportesAnalitica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesAnalitica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesAnalitica);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
