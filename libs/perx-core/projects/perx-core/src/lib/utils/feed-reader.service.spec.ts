import { TestBed } from '@angular/core/testing';

import { FeedReaderService } from './feed-reader.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FeedReaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: FeedReaderService = TestBed.get(FeedReaderService);
    expect(service).toBeTruthy();
  });
});
