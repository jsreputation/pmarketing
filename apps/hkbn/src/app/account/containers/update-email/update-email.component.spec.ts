import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UpdateEmailComponent } from './update-email.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandlerModule } from '../../../ui/error-handler/error-handler.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileService } from '@perx/core';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Type } from '@angular/core';

const profileServiceStub: Partial<ProfileService> = {
  whoAmI: () => of({ email: 'test@gmail.com' }),
  updateUserInfo: () => of(null)
};

describe('UpdateEmailComponent', () => {
  let component: UpdateEmailComponent;
  let fixture: ComponentFixture<UpdateEmailComponent>;
  let profileService: ProfileService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        ErrorHandlerModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([{
          path: 'account',
          component: UpdateEmailComponent
        }])
      ],
      providers: [{ provide: ProfileService, useValue: profileServiceStub }],
      declarations: [UpdateEmailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmailComponent);
    profileService = TestBed.get<ProfileService>(ProfileService as Type<ProfileService>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle error', fakeAsync(() => {
    const spy = spyOn(profileService, 'updateUserInfo');
    spy.and.returnValue(throwError(null));
    component.updateEmail();
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('should update email', fakeAsync(() => {
    const spy = spyOn(profileService, 'updateUserInfo');
    spy.and.returnValue(of(null));
    component.updateEmail();
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
