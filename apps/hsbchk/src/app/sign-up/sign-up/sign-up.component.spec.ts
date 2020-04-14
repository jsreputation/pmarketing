import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './sign-up.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatIconModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, NotificationService, ThemesService } from '@perxtech/core';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigService } from '../../../../../../libs/perx-core/projects/perx-core/src/lib/config/config.service';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  const authServiceStub: Partial<AuthenticationService> = {
    getAppAccessToken: () => 'of'
  };

  const notificationServiceStub: Partial<NotificationService> = {
    addSnack: () => { }
  };

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of({
      redirectAfterLogin: '/home',
      apiHost: 'string',
      production: true,
      baseHref: '/',
      isWhistler: true,
      preAuth: false,
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatIconModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        TranslateModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: authServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: ConfigService, useValue: configServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
