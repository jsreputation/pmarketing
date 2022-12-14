import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { RegistrationFormComponent } from '../../components/registration-form/registration-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlerModule } from '../../../ui/error-handler/error-handler.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationService, IProfile, ISignUpData } from '@perxtech/core';
import { of } from 'rxjs';
import { Type } from '@angular/core';

const authenticationService = {
  signup: () => of(null),
  getAppToken: () => of({}),
  getAppAccessToken: () => ''
};
const mockUser: ISignUpData = {
  phone: '111',
  firstName: 'den',
  lastName: 'gen',
  password: '666',
  passwordConfirmation: '666'
};
describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let auth: AuthenticationService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatCheckboxModule,
        MatButtonModule,
        RouterTestingModule.withRoutes([{
          path: 'sms-validation',
          component: RegistrationComponent
        }]),
        ReactiveFormsModule,
        ErrorHandlerModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        MatSelectModule
      ],
      declarations: [RegistrationComponent, RegistrationFormComponent],
      providers: [
        { provide: AuthenticationService, useValue: authenticationService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    auth = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle registration', fakeAsync(() => {
    const spy = spyOn(auth, 'signup');
    spy.and.returnValue(of({ ...mockUser, id: 1, state: '' } as IProfile));
    component.submitHandler(mockUser);
    tick();
    expect(spy).toHaveBeenCalledWith(mockUser);
  }));
});
