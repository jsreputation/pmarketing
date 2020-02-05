import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { NavigateToolbarComponent } from '../navigate-toolbar/navigate-toolbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, ProfileService, IVoucherService, IProfile, ProfileModule } from '@perx/core';
import { of } from 'rxjs';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  const mockProfile: IProfile = {
    id: 1,
    state: 'string',
    firstName: 'string',
    lastName: 'string',
    customProperties: {
      code: ''
    }
  };
  const profileServiceStub = {
    whoAmI: () => of(mockProfile)
  };
  const authenticationServiceStub = {};
  const vouchersServiceStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountComponent, NavigateToolbarComponent ],
      imports: [
        RouterTestingModule,
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
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
