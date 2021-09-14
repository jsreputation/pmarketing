import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from '@perxtech/core';
import { LandingPageComponent } from './landing-page.component';
import { MatIconModule } from '@angular/material/icon';
import { Type } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  const locationStub: Partial<Location> = {
    back: () => { }
  };

  beforeEach(async(() => {
    const routerStub = { navigate: () => ({}) };

    TestBed.configureTestingModule({
      declarations: [LandingPageComponent],
      imports: [ MatIconModule, TranslateModule.forRoot()],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: Location, useValue: locationStub },
        {
          provide: AuthenticationService,
          useValue: { logout: () => null }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /qrscanner/order onSalesScan', () => {
    const routerStub: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(routerStub, 'navigate').and.stub();
    component.onSalesScan();
    expect(routerSpy).toHaveBeenCalledWith(['/qrscanner/order']);
  });

  it('should navigate to /qrscanner/redeem onRedemption', () => {
    const routerStub: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(routerStub, 'navigate').and.stub();
    component.onRedemption();
    expect(routerSpy).toHaveBeenCalledWith(['/qrscanner/redeem']);
  });

  it('should navigate to login onLogOut click', () => {
    const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
      AuthenticationService as Type<AuthenticationService>
    );
    const logoutSpy = spyOn(authenticationService, 'logout');
    const routerStub: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(routerStub, 'navigate').and.stub();

    component.onLogOut();
    expect(logoutSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });

});
