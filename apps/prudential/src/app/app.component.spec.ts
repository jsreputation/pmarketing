import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule, MatListModule, MatSidenavModule, MatIconModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule, CognitoModule, OauthModule, TokenStorage } from '@perx/core/dist/perx-core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('AppComponent', () => {
  let router: Router;
  let location: Location;
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

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
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it(`should have as title 'prudential'`, () => {
    expect(appComponent.title).toEqual('prudential');
  });

  it('should redirect to tnc page with replaceUrl props ', () => {
    spyOn(router, 'navigateByUrl').and.stub();
    const url = 'tnc';
    appComponent.redirectTo(url);
    expect(router.navigateByUrl).toHaveBeenCalledWith('tnc', Object({ replaceUrl: true }));
  });

  it('should redirect to contact us page with replaceUrl props ', () => {
    spyOn(router, 'navigateByUrl').and.stub();
    const url = 'contact-us';
    appComponent.redirectTo(url);
    expect(router.navigateByUrl).toHaveBeenCalledWith('contact-us', Object({ replaceUrl: true }));
  });

  it('should not redirect to any page if url is not tnc or contact us', () => {
    spyOn(router, 'navigateByUrl').and.stub();
    const url = 'test';
    appComponent.redirectTo(url);
    expect(router.navigateByUrl).not.toHaveBeenCalledWith('test');
  });

  it('show goBack to have been called once', () => {
    spyOn(location, 'back');
    appComponent.goBack();
    expect(location.back).toHaveBeenCalledTimes(1);
  });

});
