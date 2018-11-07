import { TestBed } from '@angular/core/testing';

import { HistValidatorService } from './hist-validator.service';

describe('HistValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistValidatorService = TestBed.get(HistValidatorService);
    expect(service).toBeTruthy();
  });
});
