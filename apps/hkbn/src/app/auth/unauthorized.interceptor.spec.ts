import { async, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { UnauthorizedInterceptor } from './unauthorized.interceptor';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '@perx/core';
import { throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AppComponent } from '../app.component';

const authenticationServiceStub = {
  logout: (): void => { }
};

const mockRequest = new HttpRequest('GET', '');

const mockHandle: HttpHandler = {
  handle: () => throwError(new HttpResponse<HttpErrorResponse>({ status: 401 }))
};

describe('UnauthorizedInterceptor', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: AppComponent }
        ])
      ],
      providers: [
        UnauthorizedInterceptor,
        { provide: AuthenticationService, useValue: authenticationServiceStub }
      ]
    });
  }));

  it('should handle unauthorized call', fakeAsync(inject([UnauthorizedInterceptor, AuthenticationService],
    (unauthInterceptor: UnauthorizedInterceptor, authenticationService: AuthenticationService) => {
      const spy = spyOn(authenticationService, 'logout');
      unauthInterceptor.intercept(mockRequest, mockHandle).toPromise().catch((err) => {
        expect(err.status).toBe(401);
      });
      tick();
      expect(spy).toHaveBeenCalled();
    })
  ));
});
