import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import {
  AuthenticationService,
  ProfileModule,
  ProfileService,
  ThemesService,
  ConfigModule,
} from '@perx/core';

import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  const environment = {
    apiHost: 'https://api.perxtech.io',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  const authenticationServiceStub = {};
  const profileServiceStub = {
    whoAmI: () => of()
  };
  const themeSvcStub = {
    getAccountSettings: () => of()
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [
        RouterTestingModule,
        ProfileModule,
        TranslateModule.forRoot(),
        ConfigModule.forRoot({ ...environment })
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ThemesService, useValue: themeSvcStub }
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
