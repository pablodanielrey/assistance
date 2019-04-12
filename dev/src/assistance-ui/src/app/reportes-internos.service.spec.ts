import { TestBed } from '@angular/core/testing';

import { ReportesInternosService } from './reportes-internos.service';

describe('ReportesInternosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportesInternosService = TestBed.get(ReportesInternosService);
    expect(service).toBeTruthy();
  });
});
