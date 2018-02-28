import { TestBed, inject } from '@angular/core/testing';

import { AssistanceService } from './assistance.service';

describe('AssistanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssistanceService]
    });
  });

  it('should be created', inject([AssistanceService], (service: AssistanceService) => {
    expect(service).toBeTruthy();
  }));
});
