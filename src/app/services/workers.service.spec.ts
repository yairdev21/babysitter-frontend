import { TestBed } from '@angular/core/testing';

import { Workers } from './workers.service';

describe('Workers', () => {
  let service: Workers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Workers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
