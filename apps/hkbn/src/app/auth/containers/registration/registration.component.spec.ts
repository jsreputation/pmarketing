import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { RegistrationFormComponent } from '../../components/registration-form/registration-form.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlerModule } from '../../../ui/error-handler/error-handler.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationService } from '@perx/core';
import { of } from 'rxjs';

const authenticationService = {
  signup: () => of(null)
};

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatCheckboxModule,
        MatButtonModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ErrorHandlerModule,
        NoopAnimationsModule,
        TranslateModule.forRoot()
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
