import { TestBed } from '@angular/core/testing';

import { LanguageService } from './language.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '../../config/config.service';
import { of } from 'rxjs';
import { TokenStorage } from '../../auth/authentication/token-storage.service';
const tokenStorageStub = {
  getAppInfoProperty: () => null,
  setAppInfoProperty: () => { }
};
describe('LanguageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      LanguageService,
      {
        provide: ConfigService,
        useValue: {
          readAppConfig: () => of({ production: true })
        }
      },
      { provide: TokenStorage, useValue: tokenStorageStub }
    ]
  }));

  it('should be created', () => {
    const service: LanguageService = TestBed.get(LanguageService);
    expect(service).toBeTruthy();
  });
});
