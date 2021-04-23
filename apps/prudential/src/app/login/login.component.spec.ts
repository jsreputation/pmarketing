import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileModule, AuthenticationService, ConfigService } from '@perxtech/core';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const authServiceStub: Partial<AuthenticationService> = {
    getUserAccessToken: () => '',
    getAppToken: () => of(),
    getAppAccessToken: () => 'token'
  };

  const configServiceStub = {
    readAppConfig: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        RouterTestingModule,
        NoopAnimationsModule,
        ProfileModule,
        FormsModule,
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: ConfigService, useValue: configServiceStub },
        { provide: AuthenticationService, useValue: authServiceStub }
      ]
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
