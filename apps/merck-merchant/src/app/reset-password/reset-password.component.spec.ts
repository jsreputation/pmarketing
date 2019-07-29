import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
} from '@angular/material';
import { AuthenticationService } from '@perx/core/dist/perx-core';
import { of } from 'rxjs';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {forgotPassword: () => {}}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call forgot password on from submit', fakeAsync(() => {
    const authenticationService: AuthenticationService = fixture.debugElement.injector.get(
      AuthenticationService
    );
    const spy = spyOn(authenticationService, 'forgotPassword').and.callFake(() => of());
    component.onSubmit();
    tick();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  }));

  it('should set infoMessage to null on onCrossClicked', () => {
    component.onCrossClicked();
    expect(component.infoMessage).toBe(null);
  });

});
