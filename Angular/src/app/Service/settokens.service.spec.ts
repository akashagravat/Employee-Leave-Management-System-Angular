import { TestBed } from '@angular/core/testing';

import { SettokensService } from './settokens.service';

describe('SettokensService', () => {
  let service: SettokensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettokensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
