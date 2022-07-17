import { TestBed } from '@angular/core/testing';

import { TuristaGuard } from './turista.guard';

describe('TuristaGuard', () => {
  let guard: TuristaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TuristaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
