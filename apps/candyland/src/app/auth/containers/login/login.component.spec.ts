import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../../../shared/components/button/button.module';
import { LogoModule } from '../../../shared/components/logo/logo.module';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        ButtonModule,
        LogoModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
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
