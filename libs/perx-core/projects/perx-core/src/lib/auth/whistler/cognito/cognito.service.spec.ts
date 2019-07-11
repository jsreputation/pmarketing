import { TestBed } from '@angular/core/testing';

import { CognitoService } from './cognito.service';
import { CognitoModule } from './cognito.module';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CognitoService', () => {
  const environment = {
    apiHost: 'localhost:4000',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CognitoModule.forRoot({ env: environment }),
    ],
    providers: [HttpClient, HttpHandler]
  }));

  it('should be created', () => {
    const service: CognitoService = TestBed.get(CognitoService);
    expect(service).toBeTruthy();
  });
});
