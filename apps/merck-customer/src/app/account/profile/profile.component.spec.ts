import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {
  MatIconModule,
  MatToolbarModule,
  MatListModule
} from '@angular/material';
import { Location } from '@angular/common';
import { ProfileService, LoyaltyService, IProfile } from '@perxtech/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Type } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const locationStub: Partial<Location> = {
    back: () => { }
  };

  const userInfo: IProfile = {
    id: 59431,
    state: 'active',
    firstName: 'Perx',
    lastName: 'PERX',
    middleName: 'null',
    phone: 'null',
    email: 'null',
    birthDate: new Date(),
    gender: 'null',
    joinedDate: '2019-07-01T03:37:50.049Z',
    passwordExpiryDate: 'null',
    customProperties: {
      last_4: '1234'
    }
  };

  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: () => of(userInfo)
  };

  const routerStub: Partial<Router> = {
    navigate: () => new Promise<boolean>((resolve => resolve(true)))
  };

  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalty: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [MatIconModule, MatToolbarModule, MatListModule, TranslateModule.forRoot()],
      providers: [
        { provide: Location, useValue: locationStub },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubScreenNavigate', () => {
    it('should navigate to reset password screen on edit password icon click', () => {
      const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
      const routerSpy = spyOn(router, 'navigate');
      component.onSubScreenNavigate('reset-password');
      expect(routerSpy).toHaveBeenCalledWith(['reset-password']);
    });

    it('should navigate to condition screen on edit condition icon click', () => {
      const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
      const routerSpy = spyOn(router, 'navigate');
      component.onSubScreenNavigate('account/condition');
      expect(routerSpy).toHaveBeenCalledWith(['account/condition']);
    });
  });
});
