import {
  async,
  fakeAsync,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import {
  Observable,
  of,
} from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import {
  AuthenticationService,
  ProfileModule,
  ProfileService,
  ThemesService,
  ConfigModule,
  IProfile,
  PagesObject,
} from '@perx/core';

import { AccountComponent } from './account.component';

import { profile } from '../mock/profile.mock';
import { pagesObject } from '../mock/pages.mock';

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
  let router: Router;
  let auth: AuthenticationService;
  const profileServiceStub = {
    whoAmI: (): Observable<IProfile> => of(profile)
  };
  const themeServiceStub = {
    getAccountSettings: (): Observable<PagesObject> => of(pagesObject)
  };
  const authenticationServiceStub = {
    logout: () => { }
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
        { provide: ThemesService, useValue: themeServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    router = TestBed.get<Router>(Router as Type<Router>);
    auth = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch profile', fakeAsync(() => {
    component.ngOnInit();
    expect(component.profile).toBe(profile);
  }));

  it('should fetch pages', fakeAsync(() => {
    component.ngOnInit();
    expect(component.pages).toBe(pagesObject.pages);
  }));

  it('should logout', () => {
    const routerSpy = spyOn(router, 'navigate');
    const authSpy = spyOn(auth, 'logout');
    component.logout();
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
    expect(authSpy).toHaveBeenCalled();
  });
});
