import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
// import { AuthenticationModule, CognitoModule, OauthModule, ProfileModule } from '@perx/core';
// import { environment } from '../../environments/environment';
import { AuthenticationService } from '@perx/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const authServiceStub = {

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: authServiceStub }
      ],
      imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        // AuthenticationModule,
        // ProfileModule.forRoot({ env: environment }),
        // CognitoModule.forRoot({ env: environment }),
        // OauthModule.forRoot({ env: environment }),
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
