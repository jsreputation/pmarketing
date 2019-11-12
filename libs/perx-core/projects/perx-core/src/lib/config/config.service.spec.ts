import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthenticationService} from '../auth/authentication/authentication.service';
import { Type } from '@angular/core';
import { of } from 'rxjs';

const authenticationServiceStub = {
  getAppToken: () => of()
};

describe('ConfigService', () => {
  let httpTestingController: HttpTestingController;
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: AuthenticationService,
        useValue: authenticationServiceStub
      }]
    });
    // httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    service = TestBed.get(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should readAppConfig', (done: DoneFn) => {
    service.readAppConfig()
      .subscribe((res) => {
        expect(res.test).toBe('test');
        done();
      });

    const req = httpTestingController.expectOne('assets/config/app-config.json');

    expect(req.request.method).toEqual('GET');

    req.flush({
      test: 'test'
    });

    httpTestingController.verify();
  });

});
