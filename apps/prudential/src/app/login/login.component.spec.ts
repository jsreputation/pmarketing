import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import {
  MatCardModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileModule, AuthenticationService } from '@perx/core';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const authServiceStub = {
    getUserAccessToken: () => of(),
    getAppToken: () => of({}),
    getAppAccessToken: () => 'token'
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        RouterTestingModule,
        NoopAnimationsModule,
        ProfileModule,
        FormsModule,
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthenticationService, useValue: authServiceStub }
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
