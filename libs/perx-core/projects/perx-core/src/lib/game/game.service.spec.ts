import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { HttpClientModule } from '@angular/common/http';
import { EnvConfig } from './env-config';

describe('GameService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [EnvConfig]
  }));

  it('should be created', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });
});
