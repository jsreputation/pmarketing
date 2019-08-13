import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService, TokenStorage, ProfileModule, AuthenticationService } from '@perx/core';
import { of, BehaviorSubject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountComponent } from './account.component';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DinamicCreateService } from '../shared/service/dinamic-create.service';

@Component({
  template: '<div>test</div>'
}) class MockComponent { }

const userInfo = {
  birthDate: null,
  customProperties: { fname: "warren", lname: "woo", password: "1234" },
  email: null,
  firstName: null,
  gender: null,
  id: 59432,
  joinedDate: "2019-07-01T04:04:34.961Z",
  lastName: "warren",
  middleName: null,
  passwordExpiryDate: null,
  phone: null,
  state: "active"
}

const profileServiceStub = {
  whoAmI: () => of(userInfo)
}
const dinamicCreateServiceStub = { createComponent: () => { 
  console.log('234')
} };
const authenticationServiceStub = { failedAuthObservable: new BehaviorSubject(true), logout: () => { } };
fdescribe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let debugElement: DebugElement;
  let authService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent, MockComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{
          path: 'login',
          component: MockComponent
        }])
      ],
      providers: [{
        provide: AuthenticationService, useValue: authenticationServiceStub
      }, {
        provide: ProfileService, useValue: profileServiceStub
      }, {
        provide: DinamicCreateService, useValue: dinamicCreateServiceStub
      }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    authService = debugElement.injector.get(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logOut', fakeAsync(() => {
    const logOut = spyOn(component, 'logOut');
    const elem = debugElement.query(By.css('#logout'));
    elem.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(logOut).toHaveBeenCalled();
  }));

  it('should call displayAgreement', fakeAsync(() => {
    const createSpy = spyOn(component, 'displayAgreement');
    const elem = debugElement.query(By.css('#agreement'));
    elem.triggerEventHandler('click', {});
    expect(createSpy).toHaveBeenCalled();
  }))

  it('should call auth service', () => {
    const logout = spyOn(authService, 'logout');
    component.logOut();
    expect(logout).toHaveBeenCalled();
  })
});
