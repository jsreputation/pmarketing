import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, ProfileModule, ProfileService, IProfile } from '@perxtech/core';
import { of, Observable } from 'rxjs';
import { profile } from '../mock/profile.mock';
import { Router } from '@angular/router';
import { Type } from '@angular/core';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let auth: AuthenticationService;
  let router: Router;
  const authenticationServiceStub: Partial<AuthenticationService> = {
    logout: () => { }
  };

  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: (): Observable<IProfile> => of(profile)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [
        RouterTestingModule.withRoutes([{
          path: 'login',
          component: AccountComponent
        }]),
        ProfileModule
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub }
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

  it('expect recive profile', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.profile).toBe(profile);
  }));

  it('should navigate /login after log out', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.logout();
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should call log out', () => {
    const authSpy = spyOn(auth, 'logout');
    component.logout();
    expect(authSpy).toHaveBeenCalled();
  });
});
