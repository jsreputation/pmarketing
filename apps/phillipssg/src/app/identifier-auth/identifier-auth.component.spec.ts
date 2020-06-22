import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifierAuthComponent } from './identifier-auth.component';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationService } from '@perxtech/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const authenticationServiceStub: Partial<AuthenticationService> = {
  getUserAccessToken: () => '',
  autoLogin: () => of(),
};
const routerStub: Partial<Router> = {
  navigate: () => Promise.resolve(true)
};

describe('IdentifierAuthComponent', () => {
  let component: IdentifierAuthComponent;
  let fixture: ComponentFixture<IdentifierAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentifierAuthComponent ],
      imports: [
        SharedModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: Router, useValue: routerStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifierAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
