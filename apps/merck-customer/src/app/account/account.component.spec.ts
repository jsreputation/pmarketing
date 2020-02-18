import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import {
  MatCardModule,
  MatListModule
} from '@angular/material';
import { ProfileService, AuthenticationService, LoyaltyService, IProfile } from '@perx/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Type } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  const userInfo: IProfile = {
    id: 59431,
    state: 'active',
    firstName: 'Perx',
    lastName: 'PERX',
    middleName: undefined,
    phone: undefined,
    email: undefined,
    birthDate: undefined,
    gender: undefined,
    joinedDate: '2019-07-01T03:37:50.049Z',
    passwordExpiryDate: undefined,
    customProperties: {
      last_4: '1234'
    }
  };

  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: () => of(userInfo)
  };

  const authenticationServiceStub: Partial<AuthenticationService> = {
    logout: () => { }
  };

  const routerStub: Partial<Router> = {
    navigate: () => Promise.resolve(true)
  };

  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalty: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [
        MatCardModule,
        MatListModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return get current user info on init', fakeAsync(() => {
    const profileService: ProfileService = fixture.debugElement.injector.get<ProfileService>(ProfileService as Type<ProfileService>);
    const authSpy = spyOn(profileService, 'whoAmI').and.returnValue(of(userInfo));

    component.ngOnInit();
    tick();
    expect(authSpy).toHaveBeenCalled();
    expect(component.profile).toBe(userInfo);
  }));

  it('should redirect to login after logging out', () => {
    const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>
    (AuthenticationService as Type<AuthenticationService>);
    const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
    const logoutSpy = spyOn(authenticationService, 'logout');
    const routerSpy = spyOn(router, 'navigate');
    component.onLogout();
    expect(logoutSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['login']);
  });

  describe('onAccountScreenNavigate', () => {
    it('should navigate to profile', () => {
      const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
      const routerSpy = spyOn(router, 'navigate');
      component.onAccountScreenNavigate('profile');
      expect(routerSpy).toHaveBeenCalledWith(['profile']);
    });

    it('should navigate to transaction history', () => {
      const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
      const routerSpy = spyOn(router, 'navigate');
      component.onAccountScreenNavigate('transaction-history');
      expect(routerSpy).toHaveBeenCalledWith(['transaction-history']);
    });

    it('should navigate to transaction privacy policy', () => {
      const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
      const routerSpy = spyOn(router, 'navigate');
      component.onAccountScreenNavigate('privacy-policy');
      expect(routerSpy).toHaveBeenCalledWith(['privacy-policy']);
    });
  });

});
