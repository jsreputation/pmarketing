import { TestBed } from '@angular/core/testing';

import { ThemesService } from './themes.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../../config/config.module';

fdescribe('ThemesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ]
  }));

  it('should be created', () => {
    const service: ThemesService = TestBed.get(ThemesService);
    expect(service).toBeTruthy();
  });
});
