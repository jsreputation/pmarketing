import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../../config/config.module';
import { WhistlerThemesService } from './whistler-themes.service';

describe('ThemesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ]
  }));

  it('should be created', () => {
    const service: WhistlerThemesService = TestBed.get(WhistlerThemesService);
    expect(service).toBeTruthy();
  });
});
