import { TestBed } from '@angular/core/testing';

import { GdslistValidatorService } from './gdslist-validator.service';

describe('GdslistValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GdslistValidatorService = TestBed.get(GdslistValidatorService);
    expect(service).toBeTruthy();
  });
});
