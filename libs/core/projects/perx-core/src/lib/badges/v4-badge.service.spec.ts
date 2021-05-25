import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigModule } from '../config/config.module';
import { V4BadgeService } from './v4-badge.service';

jest.mock('ngx-cacheable', () => ({
  // tslint:disable-next-line:variable-name
  Cacheable: () => (_target, _, descriptor) => {
    // save a reference to the original method
    const originalMethod = descriptor.value as () => Observable<any>;
    descriptor.value = function(...args: any): any {
      return (originalMethod.apply(this, args));
    };
    return descriptor;
  }
}));

describe('V4BadgeService', () => {
  let httpTestingController: HttpTestingController;
  const environment = {
    apiHost: 'https://api.perxtech.io',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ConfigModule.forRoot({ ...environment })
      ],
      providers: []
    });

    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: V4BadgeService = TestBed.get(V4BadgeService);
    expect(service).toBeTruthy();
  });

});
