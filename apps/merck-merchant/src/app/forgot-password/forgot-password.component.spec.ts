import { Type } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatButtonModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
} from '@angular/material';

import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { IMerchantAdminService } from '@perx/core';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  const merchantAdminServiceStub = {
    forgotPassword: () => of(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForgotPasswordComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: IMerchantAdminService, useValue: merchantAdminServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call forgot password on from submit', fakeAsync(() => {
    const merchantAdminService: IMerchantAdminService = fixture.debugElement.injector.get<IMerchantAdminService>(
      IMerchantAdminService as Type<IMerchantAdminService>
    );
    const spy = spyOn(merchantAdminService, 'forgotPassword').and.callFake(() => of());
    component.onSubmit();
    tick();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  }));

});
