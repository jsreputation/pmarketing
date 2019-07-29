import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordFormComponent } from '../../components/change-password-form/change-password-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '@perx/core/dist/perx-core';
import { of } from 'rxjs';
import { ErrorHandlerModule } from '../../../ui/error-handler/error-handler.module';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ErrorHandlerModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: AuthenticationService, useValue: {changePassword: () => of(null)}}
      ],
      declarations: [ChangePasswordComponent, ChangePasswordFormComponent]
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
});
