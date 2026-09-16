import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAsistencia } from './tabla-asistencia';

describe('TablaAsistencia', () => {
  let component: TablaAsistencia;
  let fixture: ComponentFixture<TablaAsistencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaAsistencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaAsistencia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
