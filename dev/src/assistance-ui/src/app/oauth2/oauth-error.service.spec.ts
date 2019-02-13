import { TestBed } from '@angular/core/testing';

import { OauthErrorService } from './oauth-error.service';

describe('OauthErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OauthErrorService = TestBed.get(OauthErrorService);
    expect(service).toBeTruthy();
  });
});
