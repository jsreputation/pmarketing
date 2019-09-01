import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule, MatListModule, MatSidenavModule, MatIconModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileModule, AuthenticationService } from '@perx/core';
import { environment } from '../environments/environment';
import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let router: Router;
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const authServiceStub = {
    $failedAuth: of(true)
  };
  const routerStub = {
    navigateByUrl: () => {}
  };
  const locationStub = {
    back: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatListModule,
        MatSidenavModule,
        MatIconModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        ProfileModule.forRoot({ env: environment })
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: authServiceStub
        },
        { provide: Router, useValue: routerStub },
        { provide: Location, useValue: locationStub }
      ]
    }).compileComponents();
    router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
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
    const routerSpy = spyOn(router, 'navigateByUrl');
    const url = 'tnc';
    appComponent.redirectTo(url);
    expect(routerSpy).toHaveBeenCalledWith('tnc', Object({ replaceUrl: true }));
  });

  it('should redirect to contact us page with replaceUrl props ', () => {
    const routerSpy = spyOn(router, 'navigateByUrl');
    const url = 'contact-us';
    appComponent.redirectTo(url);
    expect(routerSpy).toHaveBeenCalledWith('contact-us', Object({ replaceUrl: true }));
  });

  it('should not redirect to any page if url is not tnc or contact us', () => {
    const routerSpy = spyOn(router, 'navigateByUrl');
    const url = 'test';
    appComponent.redirectTo(url);
    expect(routerSpy).not.toHaveBeenCalledWith('test');
  });

  it('show goBack to have been called once', () => {
    const location: Location = fixture.debugElement.injector.get<Location>(Location as Type<Location>);
    const locationSpy = spyOn(location, 'back');
    spyOn(location, 'back');
    appComponent.goBack();
    expect(locationSpy).toHaveBeenCalled();
  });

});
