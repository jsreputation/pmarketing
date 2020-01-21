import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, LogoModule } from '@perx/candyshop';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, SessionService, LocalStorageService } from '@es-core';
import { TestAuthService } from '@es-shared/test-components/providers/test-auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          ReactiveFormsModule,
          BrowserAnimationsModule,
          ButtonModule,
          LogoModule,
          MatFormFieldModule,
          MatInputModule,
          MatIconModule,
          HttpClientModule,
          TranslateModule.forRoot()
        ],
        providers: [
          LocalStorageService,
          SessionService,
          {
            provide: AuthService,
            useClass: TestAuthService
          }
        ],
        declarations: [
          LoginComponent,
          LoginFormComponent
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
