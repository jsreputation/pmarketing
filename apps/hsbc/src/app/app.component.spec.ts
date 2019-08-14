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
import { AuthenticationService, ProfileModule } from '@perx/core';

describe('AppComponent', () => {
  const authenticationServiceStub = {};

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
        ProfileModule
      ],
      declarations: [
        AppComponent,
        ProfileComponent
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
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
