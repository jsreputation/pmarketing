import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthenticationService, ConfigService, TokenStorage } from '@perx/core';
import {
  MatSnackBarModule,
  MatIconModule,
  MatToolbarModule
} from '@angular/material';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

const tokenStorageStub = {
  getAppInfoProperty: () => null,
  setAppInfoProperty: () => { }
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const authenticationStub: Partial<AuthenticationService> = {
    autoLogin: () => of(),
    isAuthorized: () => of()
  };

  const routerStub = {
    navigateByUrl: () => {},
    navigate: () => {},
  };

  const locationStub: Partial<Location> = {
    back: () => {}
  };

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        MatIconModule,
        MatToolbarModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationStub },
        { provide: Router, useValue: routerStub },
        { provide: Location, useValue: locationStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: TokenStorage, useValue: tokenStorageStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should go back on onLeftActionClick', () => {
    const location: Location = fixture.debugElement.injector.get<Location>(Location as Type<Location>);
    const locationSpy = spyOn(location, 'back');
    component.onLeftActionClick();
    expect(locationSpy).toHaveBeenCalled();
  });

  describe('onTabNavigate', () => {

    it('should navigate to tab home', () => {
      const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
      const routerSpy = spyOn(router, 'navigate');
      component.onTabNavigate('home');
      expect(routerSpy).toHaveBeenCalledWith(['home']);
    });

    it('should navigate to tab find-pharmacy', () => {
      const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
      const routerSpy = spyOn(router, 'navigate');
      component.onTabNavigate('find-pharmacy');
      expect(routerSpy).toHaveBeenCalledWith(['find-pharmacy']);
    });

    it('should navigate to tab account', () => {
      const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
      const routerSpy = spyOn(router, 'navigate');
      component.onTabNavigate('account');
      expect(routerSpy).toHaveBeenCalledWith(['account']);
    });

  });

});
