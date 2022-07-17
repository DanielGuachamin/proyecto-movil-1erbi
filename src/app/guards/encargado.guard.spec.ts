import { TestBed } from '@angular/core/testing';

import { EncargadoGuard } from './encargado.guard';

describe('EncargadoGuard', () => {
  let guard: EncargadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EncargadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
