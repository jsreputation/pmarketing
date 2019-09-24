import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMobileComponent } from './change-mobile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { AuthenticationService } from '@perx/core';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const authenticationService = {
  requestVerificationToken: () => of()
};

describe('ChangeMobileComponent', () => {
  let component: ChangeMobileComponent;
  let fixture: ComponentFixture<ChangeMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeMobileComponent],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([{
          path: 'verify_otp/mobile',
          component: ChangeMobileComponent
        }])
      ],
      providers: [
        {
          provide: AuthenticationService, useValue: authenticationService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
