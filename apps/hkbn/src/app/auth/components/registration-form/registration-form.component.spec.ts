import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormComponent } from './registration-form.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlerModule } from '../../../ui/error-handler/error-handler.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { countryCodes } from 'src/assets/mock/country-code';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ErrorHandlerModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        MatSelectModule
      ],
      declarations: [RegistrationFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    component.countryCodes = countryCodes;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit event when form invalid', () => {
    const registerSubmitSpy = spyOn(component.formSubmit, 'emit');
    component.submit();
    expect(registerSubmitSpy.calls.count()).toBe(0);
  });

  it('should emit event when form valid', () => {
    spyOn(component.formSubmit, 'emit');
    component.registrationForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      phone: '123456',
      email: 'email@gmail.com',
      password: 'qwerty123',
      password_confirmation: 'qwerty123',
      terms: true,
      promo: true,
      code: 11
    });
    fixture.detectChanges();
    component.submit();
    expect(component.formSubmit.emit).toHaveBeenCalled();
  });
});
