import { TestBed } from '@angular/core/testing';

import { TarifCommuneService } from './tarif-commune-service';

describe('TarifCommuneService', () => {
  let service: TarifCommuneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarifCommuneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
