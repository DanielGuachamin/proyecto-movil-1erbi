import { TestBed } from '@angular/core/testing';

import { ServiceTuriscoService } from './service-turisco.service';

describe('ServiceTuriscoService', () => {
  let service: ServiceTuriscoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTuriscoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
