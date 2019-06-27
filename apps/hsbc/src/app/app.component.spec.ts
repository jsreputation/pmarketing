import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule, CognitoModule, OauthModule, TokenStorage } from '@perx/core/dist/perx-core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MatDialog, MatDialogModule } from '@angular/material';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        AuthenticationModule,
        MatDialogModule,
        CognitoModule.forRoot({ env: environment }),
        OauthModule.forRoot({ env: environment }),
      ],
      declarations: [
        AppComponent
      ],
      providers: [TokenStorage],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'hsbc'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('hsbc');
  });
});
