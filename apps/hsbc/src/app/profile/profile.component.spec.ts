import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';

import {
  ProfileService,
  AuthenticationService,
  IProfile,
  ProfileModule,
  IVoucherService,
} from '@perxtech/core';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const mockProfile: IProfile = {
    id: 1,
    state: 'string',
    firstName: 'string',
    lastName: 'string',
    customProperties: {
      code: ''
    }
  };
  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: () => of(mockProfile)
  };
  const authenticationServiceStub: Partial<AuthenticationService> = {};
  const vouchersServiceStub: Partial<IVoucherService> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        MatIconModule,
        RouterTestingModule,
        NoopAnimationsModule,
        ProfileModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: IVoucherService, useValue: vouchersServiceStub },
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
});
