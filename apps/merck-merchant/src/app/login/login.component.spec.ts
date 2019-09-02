import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthenticationService } from '@perx/core';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from '@perx/core';
import { environment } from '../../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import {
  MatButtonModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
} from '@angular/material';
import { SalesContactComponent } from '../sales-contact/sales-contact.component';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    const routerStub = { navigateByUrl: () => ({}) };
    TestBed.configureTestingModule({
      declarations: [LoginComponent, SalesContactComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        BrowserAnimationsModule,
        AuthenticationModule.forRoot({ env: environment }),
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        {
          provide: AuthenticationService,
          useValue: {login: () => {}, getInterruptedUrl: () => null}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to reset onForgotPassword click', () => {
    const routerStub: Router = fixture.debugElement.injector.get(Router);
    spyOn(routerStub, 'navigateByUrl').and.callThrough();
    component.onForgotPassword();
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/reset');
  });

  it('should navigate to home if authenticated', fakeAsync(() => {
    const authenticationService: AuthenticationService = fixture.debugElement.injector.get(
      AuthenticationService
    );
    const authSpy = spyOn(authenticationService, 'login').and.returnValue(of({bearer_token: 'SWWERW'}));
    const routerStub: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(routerStub, 'navigateByUrl').and.stub();

    component.onSubmit();
    tick();
    fixture.detectChanges();
    expect(authSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith('/home');
  }));

});
