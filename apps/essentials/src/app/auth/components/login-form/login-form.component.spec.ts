import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, LogoModule } from '@perx/candyshop';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '@es-core/services/local-storage.service';
import { SessionService } from '@es-core/services/session.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@es-core';
import { TestAuthService } from '@es-shared/test-components/providers/test-auth.service';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard/overview', redirectTo: '/' }
        ]),
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
      declarations: [ LoginFormComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
