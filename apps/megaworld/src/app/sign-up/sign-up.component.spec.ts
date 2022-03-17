import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './sign-up.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, ConfigService, GeneralStaticDataService, ThemesService } from '@perxtech/core';
import { of } from 'rxjs';

describe('SignUpComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  const authServiceStub: Partial<AuthenticationService> = {
    getAppAccessToken: () => 'of'
  };

  const generalStaticDataServiceStub: Partial<GeneralStaticDataService> = {
    getCountriesList: () => of()
  };

  const themeServiceStub: Partial<ThemesService> = {
    getActiveTheme: () => of(),
    getThemeSetting: () => of()
  };

  const configServiceStub: Partial<ConfigService> = { readAppConfig: () => of() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatIconModule,
        MatMomentDateModule,
        MatDatepickerModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatCardModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: authServiceStub },
        { provide: GeneralStaticDataService, useValue: generalStaticDataServiceStub },
        { provide: MatDatepickerModule },
        { provide: ThemesService, useValue: themeServiceStub },
        { provide: ConfigService, useValue: configServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
