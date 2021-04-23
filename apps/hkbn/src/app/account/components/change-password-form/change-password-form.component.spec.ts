import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordFormComponent } from './change-password-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandlerModule } from '../../../ui/error-handler/error-handler.module';
import { TranslateModule } from '@ngx-translate/core';

describe('ChangePasswordFormComponent', () => {
  let component: ChangePasswordFormComponent;
  let fixture: ComponentFixture<ChangePasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        ErrorHandlerModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ChangePasswordFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit event when form invalid', () => {
    const passwordChangeSpy = spyOn(component.passwordChange, 'emit');
    component.submit();
    expect(passwordChangeSpy.calls.count()).toBe(0);
  });

  it('should emit event when form valid', () => {
    spyOn(component.passwordChange, 'emit');
    component.changePasswordForm.setValue({
      oldPassword: 'qwerty123',
      newPassword: '123qwerty',
      passwordConfirmation: '123qwerty'
    });
    fixture.detectChanges();
    component.submit();
    expect(component.passwordChange.emit).toHaveBeenCalled();
  });
});
