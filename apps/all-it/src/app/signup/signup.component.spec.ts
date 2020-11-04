import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatIconModule,
  MatNativeDateModule,
  MatDatepickerModule,
} from '@angular/material';
import { of } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthenticationService,
  ConfigService,
  NotificationService,
  ThemesService
} from '@perxtech/core';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  const authServiceStub: Partial<AuthenticationService> = {
    getAppAccessToken: () => 'of'
  };

  const notificationServiceStub: Partial<NotificationService> = {
    addSnack: () => { }
  };

  const themeServiceStub: Partial<ThemesService> = {
    getActiveTheme: () => of(),
    getThemeSetting: () => of()
  };

  const configServiceStub: Partial<ConfigService> = { readAppConfig: () => of() };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatIconModule,
        MatNativeDateModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: authServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: MatDatepickerModule },
        { provide: ThemesService, useValue: themeServiceStub },
        { provide: ConfigService, useValue: configServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
