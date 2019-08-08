import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import {
  MatCardModule,
  MatListModule
} from '@angular/material';
import { ProfileService, AuthenticationService } from '@perx/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  const profileServiceStub = {
    whoAmI: () => of({
      id: 59431,
      state: 'active',
      firstName: null,
      lastName: 'PERX',
      middleName: null,
      phone: null,
      email: null,
      birthDate: null,
      gender: null,
      joinedDate: '2019-07-01T03:37:50.049Z',
      passwordExpiryDate: null,
      customProperties: {
        last_4: '1234'
      }
    })
  };

  const authenticationServiceStub = {
    logout: () => {}
  };

  const routerStub = {
    navigate: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountComponent ],
      imports: [ MatCardModule, MatListModule ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: Router, useValue: routerStub }
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

});
