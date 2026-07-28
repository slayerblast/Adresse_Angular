import { TestBed } from '@angular/core/testing';

import { AdresseService } from './adresseService';

describe('Adresse', () => {
  let service: AdresseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdresseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
