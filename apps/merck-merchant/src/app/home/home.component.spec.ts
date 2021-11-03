import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService, ThemesService, TokenStorage } from '@perxtech/core';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../header/header.component';
import { SalesContactComponent } from '../sales-contact/sales-contact.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Type } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const locationStub: Partial<Location> = {
    back: () => { }
  };

  const tokenStorageStub: Partial<TokenStorage> = {
    clearAppInfoProperty: () => { }
  };
  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
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
        { provide: TokenStorage, useValue: tokenStorageStub },
        { provide: ThemesService, useValue: themesServiceStub },

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

  it('should navigate to /identify-user/order onSalesScan', () => {
    const routerStub: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(routerStub, 'navigate').and.stub();
    component.onSalesScan();
    expect(routerSpy).toHaveBeenCalledWith(['/identify-user/order']);
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
