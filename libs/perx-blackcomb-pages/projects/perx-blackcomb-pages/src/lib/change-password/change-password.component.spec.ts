import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from '@perx/core';
import { Type } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  const notificationServiceStub = { addSnack: () => {} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordComponent ],
      imports: [
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatInputModule,
        NoopAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: NotificationService, useValue: notificationServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fail password matching and call addSnack', () => {
    component.changePasswordForm.controls.newPassword.setValue(1234);
    component.changePasswordForm.controls.confirmPassword.setValue(123);
    const notificationService: NotificationService = fixture.debugElement.injector.get<NotificationService>
    (NotificationService as Type<NotificationService>);
    const notificationServiceSpy = spyOn(notificationService, 'addSnack');
    component.onSubmit();
    expect(notificationServiceSpy).toHaveBeenCalledWith('Passwords do not match.');
  });
});
