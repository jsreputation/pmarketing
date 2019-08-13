import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule, CognitoModule, OauthModule, TokenStorage, ProfileModule } from '@perx/core';
import { environment } from '../environments/environment';
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
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileComponent } from './profile/profile.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        AuthenticationModule,
        MatDialogModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        NoopAnimationsModule,
        SoundModule,
        ProfileModule.forRoot({ env: environment }),
        CognitoModule.forRoot({ env: environment }),
        OauthModule.forRoot({ env: environment }),
      ],
      declarations: [
        AppComponent,
        ProfileComponent
      ],
      providers: [
        TokenStorage,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'HSBC Win A Treat'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('HSBC Win A Treat');
  });
});
