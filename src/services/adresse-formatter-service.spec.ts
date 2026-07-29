import { TestBed } from '@angular/core/testing';

import { AdresseFormatterService } from './adresse-formatter-service';

describe('AdresseFormatterService', () => {
  let service: AdresseFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdresseFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
