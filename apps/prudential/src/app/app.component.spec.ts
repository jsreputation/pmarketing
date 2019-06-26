import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule, MatListModule, MatSidenavModule, MatIconModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule, CognitoModule, OauthModule, TokenStorage } from '@perx/core/dist/perx-core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatListModule,
        MatSidenavModule,
        MatIconModule,
        NoopAnimationsModule,
        HttpClientModule,
        AuthenticationModule,
        CognitoModule.forRoot({ env: environment }),
        OauthModule.forRoot({ env: environment }),
      ],
      declarations: [
        AppComponent
      ],
      providers: [TokenStorage]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'prudential'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('prudential');
  });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to prudential!');
  // });
});
