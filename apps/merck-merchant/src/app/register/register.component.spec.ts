import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService, IMerchantAdminService } from '@perx/core';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const merchantAdminServiceStub = {
    validateInvite: () => ({ subscribe: () => ({ add: () => ({}) }) })
  };
  beforeEach(async(() => {
    const routerStub = { navigateByUrl: () => ({}) };

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        {
          provide: AuthenticationService,
          useValue: { forgotPassword: () => { }, getAppToken: () => of({}) }
        },
        { provide: IMerchantAdminService, useValue: merchantAdminServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
