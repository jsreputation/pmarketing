import { async, ComponentFixture, fakeAsync, TestBed, tick, } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { of, throwError } from 'rxjs';

import { ProfileService } from '@perxtech/core';

import { ChangeStreetAddressComponent } from './change-street-address.component';
import { Type } from '@angular/core';
import { Location } from '@angular/common';

describe('ChangeStreetAddressComponent', () => {
  let component: ChangeStreetAddressComponent;
  let fixture: ComponentFixture<ChangeStreetAddressComponent>;
  let profileSpy;
  let location: Location;
  const profileServiceStub: Partial<ProfileService> = {
    setCustomProperties: () => of(),
    whoAmI: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeStreetAddressComponent],
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
    fixture = TestBed.createComponent(ChangeStreetAddressComponent);
    component = fixture.componentInstance;
    const profileService: ProfileService = TestBed.get<ProfileService>(ProfileService as Type<ProfileService>);
    location = TestBed.get<Location>(Location as Type<Location>);
    profileSpy = jest.spyOn(profileService, 'setCustomProperties');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call setCustomProperties if we have void street', fakeAsync(() => {
    component.streetAddressChangeForm.setValue({ newStreetAddress: null });
    component.onSubmit();
    tick(50);
    expect(profileSpy).not.toHaveBeenCalled();
  }));

  it('should call all submit flow', fakeAsync(() => {
    const locationSpy = jest.spyOn(location, 'back');
    component.streetAddressChangeForm.setValue({ newStreetAddress: 'street' });
    profileSpy.mockReturnValue(of(null));
    component.onSubmit();
    tick(50);
    expect(locationSpy).toHaveBeenCalled();
  }));

  it('should handle error', fakeAsync(() => {
    const spyLog = jest.spyOn(console, 'error');
    component.streetAddressChangeForm.setValue({ newStreetAddress: 'street' });
    profileSpy.mockReturnValue(throwError('error'));
    component.onSubmit();
    tick(50);
    expect(spyLog).toHaveBeenCalled();
  }));
});
