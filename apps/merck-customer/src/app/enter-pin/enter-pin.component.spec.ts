import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UtilsModule, AuthenticationService } from '@perxtech/core';
import { RouterTestingModule } from '@angular/router/testing';

import { EnterPinComponent } from './enter-pin.component';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { Type } from '@angular/core';

describe('EnterPinComponent', () => {
  let component: EnterPinComponent;
  let fixture: ComponentFixture<EnterPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnterPinComponent],
      imports: [
        UtilsModule,
        RouterTestingModule.withRoutes([{
          path: 'login',
          component: EnterPinComponent
        }])
      ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: { forgotPassword: () => of() }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ type: 'password' }))
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: () => { },
            getCurrentNavigation: () => (
              {
                extras: {
                  state: {
                    mobileNo: '1234', country: 'SG'
                  }
                }
              }
            )
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onInit get pin mode on paramMap', () => {
    component.ngOnInit();
    expect(component.pinMode).toBe('password');
  });

  it('should go to reset password screen on onPinEntered', () => {
    const router: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(router, 'navigate');
    component.onPinEntered('1234');
    expect(routerSpy).toHaveBeenCalledWith(['reset-password'], { state: { mobileNo: '1234', otp: '1234' } });
  });

  it('should resend otp resendOtp', fakeAsync(() => {
    const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>
    (AuthenticationService as Type<AuthenticationService>);
    const authSpy = spyOn(authenticationService, 'forgotPassword').and.returnValue(
      of({
        message: 'success'
      })
    );
    component.resendOtp();
    tick();
    expect(authSpy).toHaveBeenCalled();
  }));
});
