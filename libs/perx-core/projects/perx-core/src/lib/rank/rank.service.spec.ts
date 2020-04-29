import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RankService} from './rank.service';
import {ConfigModule} from '../config/config.module';
import {ConfigService} from '../config/config.service';
import {of} from 'rxjs';

const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of({
    redirectAfterLogin: '/home',
    apiHost: 'https://api.perxtech.io',
    production: true,
    baseHref: '/',
    isWhistler: true,
    preAuth: false,
  })
};

describe('RankService', () => {
  const environment = {
    apiHost: 'https://api.perxtech.io',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };

  // const baseUrl = 'https://api.perxtech.io/';
  // const baseUrlForAppAccessToken = 'http://localhost:4000/';
  let service: RankService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ConfigModule.forRoot({...environment})
      ],
      providers: [
        {provide: ConfigService, useValue: configServiceStub},
      ]
    });
    service = TestBed.get(RankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
