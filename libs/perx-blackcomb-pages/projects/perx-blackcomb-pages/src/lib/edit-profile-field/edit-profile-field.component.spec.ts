import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileFieldComponent } from './edit-profile-field.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileModule, ProfileService } from '@perx/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditProfileFieldComponent', () => {
  let component: EditProfileFieldComponent;
  let fixture: ComponentFixture<EditProfileFieldComponent>;

  const profileServiceStub: Partial<ProfileService> = {
    updateUserInfo: () => of(),
    setCustomProperties: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileFieldComponent ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        ProfileModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
