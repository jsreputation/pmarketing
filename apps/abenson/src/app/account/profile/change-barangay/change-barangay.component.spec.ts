import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ChangeBarangayComponent } from './change-barangay.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileService } from '@perx/core';
import { of, throwError } from 'rxjs';
import { Location } from '@angular/common';
import { Type } from '@angular/core';

describe('ChangeBarangayComponent', () => {
  let component: ChangeBarangayComponent;
  let fixture: ComponentFixture<ChangeBarangayComponent>;
  let location: Location;
  let profileService: ProfileService;
  const profileServiceStub: Partial<ProfileService> = {
    setCustomProperties: () => of(void 0)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeBarangayComponent],
      imports: [
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: ProfileService,
          useValue: profileServiceStub
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBarangayComponent);
    component = fixture.componentInstance;
    location = TestBed.get<Location>(Location as Type<Location>);
    profileService = TestBed.get<ProfileService>(ProfileService as Type<ProfileService>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle submit', fakeAsync(() => {
    const locationSpy = spyOn(location, 'back');
    spyOn(profileService, 'setCustomProperties').and.callThrough();
    component.barangayChangeForm.setValue({ newBarangay: 'test' });
    component.onSubmit();
    expect(component.customProperties).toEqual({ barangay: 'test' });
    tick();
    expect(locationSpy).toHaveBeenCalled();
  }));

  it('should handle error', fakeAsync(() => {
    spyOn(profileService, 'setCustomProperties').and.returnValue(throwError('message'));
    const spyLog = spyOn(console, 'error');
    component.barangayChangeForm.setValue({ newBarangay: 'test' });
    component.onSubmit();
    tick();
    expect(spyLog).toHaveBeenCalled();
  }));

  it('should leave profileService', fakeAsync(() => {
    const spyProfile = spyOn(profileService, 'setCustomProperties');
    component.barangayChangeForm.setValue({ newBarangay: null });
    component.onSubmit();
    tick();
    expect(spyProfile).not.toHaveBeenCalled();
  }));
});
