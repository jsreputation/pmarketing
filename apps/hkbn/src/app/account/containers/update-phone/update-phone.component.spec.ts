import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhoneComponent } from './update-phone.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TextMaskModule } from 'angular2-text-mask';
import { ErrorHandlerModule } from '../../../ui/error-handler/error-handler.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileService, AuthenticationService } from '@perxtech/core';
import { of } from 'rxjs';

describe('UpdatePhoneComponent', () => {
  let component: UpdatePhoneComponent;
  let fixture: ComponentFixture<UpdatePhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        RouterTestingModule,
        TextMaskModule,
        ErrorHandlerModule,
        NoopAnimationsModule,
        MatSelectModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ProfileService, useValue: { whoAmI: () => of({ phone: '12345678' }) } },
        { provide: AuthenticationService, useValue: {} }
      ],
      declarations: [UpdatePhoneComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
