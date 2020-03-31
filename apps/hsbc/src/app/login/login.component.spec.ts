import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';
import { MatCardModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, UtilsModule, TokenStorage, ConfigService, SettingsService } from '@perxtech/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const authenticationServiceStub: Partial<AuthenticationService> = { getAppToken: () => of(), getAppAccessToken: () => 'token' };
  const tokenStorageStub = {};
  const settingsServiceStub: Partial<SettingsService> = {};
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: TokenStorage, useValue: tokenStorageStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub }
      ],
      imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        UtilsModule,
        HttpClientTestingModule
      ],
      declarations: [LoginComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
