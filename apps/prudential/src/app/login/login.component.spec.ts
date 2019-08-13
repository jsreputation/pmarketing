import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import {
  MatCardModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule, CognitoModule, OauthModule, ProfileModule } from '@perx/core';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule,
        MatProgressSpinnerModule,
        RouterTestingModule,
        HttpClientTestingModule,
        AuthenticationModule,
        NoopAnimationsModule,
        ProfileModule.forRoot({ env: environment }),
        CognitoModule.forRoot({ env: environment }),
        OauthModule.forRoot({ env: environment }),
        FormsModule,
      ],
      declarations: [LoginComponent],
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
