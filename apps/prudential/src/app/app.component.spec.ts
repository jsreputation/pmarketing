import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule, MatListModule, MatSidenavModule, MatIconModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileModule, AuthenticationService, ConfigService } from '@perx/core';
import { DebugElement, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let router: Router;

  const authServiceStub: Partial<AuthenticationService> = {
    $failedAuth: of(true)
  };
  const locationStub = {
    back: () => { }
  };
  const configServiceStub = {
    readAppConfig: () => of()
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
        ProfileModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: authServiceStub
        },
        { provide: Location, useValue: locationStub },
        { provide: ConfigService, useValue: configServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    debugElement = fixture.debugElement;
    router = debugElement.injector.get<Router>(Router as Type<Router>);
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
    const location: Location = fixture.debugElement.injector.get<Location>(Location as Type<Location>);
    const locationSpy = spyOn(location, 'back').and.stub();
    appComponent.goBack();
    expect(locationSpy).toHaveBeenCalled();
  });

});
