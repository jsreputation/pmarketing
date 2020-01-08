import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@perx/candyshop';
import { LogoModule } from '../../../shared/components/logo/logo.module';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '@cl-core-services';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { SessionService } from '@cl-core/services/session.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

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
      providers: [ AuthService, LocalStorageService, SessionService ],
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
