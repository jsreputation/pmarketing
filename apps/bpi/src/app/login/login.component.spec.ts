import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, ConfigService } from '@perxtech/core';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const authServiceStub: Partial<AuthenticationService> = {
    autoLogin: () => of(),
    getAppToken: () => of(),
    getAppAccessToken: () => 'token'
  };
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: authServiceStub },
        { provide: ConfigService, useValue: configServiceStub }
      ],
      imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
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
