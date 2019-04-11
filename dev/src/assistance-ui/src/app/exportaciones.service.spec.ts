import { TestBed } from '@angular/core/testing';

import { ExportacionesService } from './exportaciones.service';

describe('ExportacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportacionesService = TestBed.get(ExportacionesService);
    expect(service).toBeTruthy();
  });
});
