import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordFormComponent } from './change-password-form.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandlerModule } from '../../../ui/error-handler/error-handler.module';

describe('ChangePasswordFormComponent', () => {
  let component: ChangePasswordFormComponent;
  let fixture: ComponentFixture<ChangePasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        ErrorHandlerModule,
        NoopAnimationsModule,
      ],
      declarations: [ChangePasswordFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
