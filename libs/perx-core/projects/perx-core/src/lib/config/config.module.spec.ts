import { TestBed, inject } from "@angular/core/testing";
import { configServiceFactory } from './config.module';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../auth/authentication/authentication.service';
import { Config } from './config';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ConfigModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: {}},
        { provide: Config, useValue: {}}
      ]
    });
  });
  it('should', inject([HttpClient, Config, AuthenticationService],(http: HttpClient, configService: Config, auth: AuthenticationService) => {
    configServiceFactory(http, configService, auth)
  }))
});
