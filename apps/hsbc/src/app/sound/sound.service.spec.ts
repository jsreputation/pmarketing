import { TestBed } from '@angular/core/testing';

import { SoundService } from './sound.service';
import { MatDialogModule } from '@angular/material';

describe('SoundService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      MatDialogModule
    ]
  }));

  it('should be created', () => {
    const service: SoundService = TestBed.get(SoundService);
    expect(service).toBeTruthy();
  });
});
