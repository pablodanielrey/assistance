import { TestBed } from '@angular/core/testing';

import { PermissionAuthGuardService } from './permission-auth-guard.service';

describe('PermissionAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermissionAuthGuardService = TestBed.get(PermissionAuthGuardService);
    expect(service).toBeTruthy();
  });
});
