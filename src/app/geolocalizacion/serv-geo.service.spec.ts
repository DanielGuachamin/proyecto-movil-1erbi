import { TestBed } from '@angular/core/testing';

import { ServGeoService } from './servgeo.service';

describe('ServGeoService', () => {
  let service: ServGeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServGeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
