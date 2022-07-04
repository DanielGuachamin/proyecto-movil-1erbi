import { TestBed } from '@angular/core/testing';

import { ServDetailsService } from './serv-details.service';

describe('ServDetailsService', () => {
  let service: ServDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
