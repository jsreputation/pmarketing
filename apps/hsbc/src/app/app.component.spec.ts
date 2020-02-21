import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';
import { SoundModule } from './sound/sound.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationService, ProfileModule, ThemesService, ConfigService } from '@perx/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AppComponent', () => {
  const authenticationServiceStub: Partial<AuthenticationService> = {};
  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        NoopAnimationsModule,
        SoundModule,
        ProfileModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        ProfileComponent
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: ConfigService, useValue: configServiceStub}
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
