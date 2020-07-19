import { TestBed } from '@angular/core/testing';

import { Workers } from './workers.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('Workers', () => {
  let service: Workers;

  beforeEach(() => {
    TestBed.configureTestingModule({providers:[HttpClient, HttpHandler]});
    service = TestBed.inject(Workers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
