import { TestBed } from '@angular/core/testing';

import { FeedReaderService } from './feed-reader.service';

describe('FeedReaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeedReaderService = TestBed.get(FeedReaderService);
    expect(service).toBeTruthy();
  });
});
