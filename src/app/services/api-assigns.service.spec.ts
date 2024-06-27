import { TestBed } from '@angular/core/testing';

import { AssignsService } from './api-assigns.service';

describe('AssignsService', () => {
  let service: AssignsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
