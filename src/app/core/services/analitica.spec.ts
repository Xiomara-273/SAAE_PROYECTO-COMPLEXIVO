import { TestBed } from '@angular/core/testing';

import { Analitica } from './analitica';

describe('Analitica', () => {
  let service: Analitica;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Analitica);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
