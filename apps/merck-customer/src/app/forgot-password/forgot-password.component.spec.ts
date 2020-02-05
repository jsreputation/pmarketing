import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ForgotPasswordComponent } from './forgot-password.component';
import { AuthenticationService } from '@perx/core';
import { of } from 'rxjs';
import {
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { Type } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            forgotPassword: () => of(),
            getAppToken: () => of()
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: () => {},
            getCurrentNavigation: () =>  (
              {
                extras: {
                  state: {
                    mobileNo: '1234', country: ''
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
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to enter-pin/password on fogrot password submit', fakeAsync(() => {
    const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>
    (AuthenticationService as Type<AuthenticationService>);
    const authSpy = spyOn(authenticationService, 'forgotPassword').and.returnValue(
      of({
        message: 'success'
      })
    );
    const router: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(router, 'navigate');
    component.onSubmit();
    tick();
    expect(authSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['enter-pin/password'], { state: { mobileNo: '1234' } });
  }));
});
