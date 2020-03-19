import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService, TokenStorage } from '@perxtech/core';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../header/header.component';
import { SalesContactComponent } from '../sales-contact/sales-contact.component';
import { MatToolbarModule, MatIconModule } from '@angular/material';
import { Type } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const locationStub: Partial<Location> = {
    back: () => { }
  };

  const tokenStorageStub: Partial<TokenStorage> = {
    clearAppInfoProperty: () => { }
  };

  beforeEach(async(() => {
    const routerStub = { navigate: () => ({}) };

    TestBed.configureTestingModule({
      declarations: [HomeComponent, HeaderComponent, SalesContactComponent],
      imports: [MatToolbarModule, MatIconModule, TranslateModule.forRoot()],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: Location, useValue: locationStub },
        {
          provide: AuthenticationService,
          useValue: { logout: () => null }
        },
        { provide: TokenStorage, useValue: tokenStorageStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
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
