import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileFieldComponent, FieldType } from './edit-profile-field.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileModule, ProfileService } from '@perxtech/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';

describe('EditProfileFieldComponent', () => {
  let component: EditProfileFieldComponent;
  let fixture: ComponentFixture<EditProfileFieldComponent>;
  let router: Router;

  const profileServiceStub: Partial<ProfileService> = {
    updateUserInfo: () => of(void 0),
    setCustomProperties: () => of(void 0)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfileFieldComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        ProfileModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'profile', redirectTo: '/' }
        ])
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ type: 'email' })) } },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileFieldComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should navigate to profile onSubmit click with fieldType email', () => {
    component.fieldType = FieldType.email;
    spyOn(router, 'navigate').and.callThrough();
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['profile']);
  });

  it('should navigate to profile onSubmit click with fieldType postcode', () => {
    component.fieldType = FieldType.postcode;
    spyOn(router, 'navigate').and.callThrough();
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['profile']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
