import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../../../shared/shared.module';
import { ChangeCityComponent } from './change-city.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileService } from '@perxtech/core';
import { of, throwError } from 'rxjs';
import { Location } from '@angular/common';
import { Type } from '@angular/core';

const profileServiceStub: Partial<ProfileService> = {
  setCustomProperties: () => of()
};
describe('ChangeCityComponent', () => {
  let component: ChangeCityComponent;
  let fixture: ComponentFixture<ChangeCityComponent>;
  let profileService: ProfileService;
  let spyOnProfile;
  let location: Location;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChangeCityComponent,
      ],
      imports: [
        SharedModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCityComponent);
    component = fixture.componentInstance;
    profileService = TestBed.get<ProfileService>(ProfileService as Type<ProfileService>);
    location = TestBed.get<Location>(Location as Type<Location>);
    spyOnProfile = jest.spyOn(profileService, 'setCustomProperties');
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit data', fakeAsync(() => {
    const newCity = 'Paris';
    const spyLocation = jest.spyOn(location, 'back');
    component.cityChangeForm.setValue({ newCity });
    spyOnProfile.mockReturnValue(of(null));
    component.onSubmit();
    tick();
    fixture.detectChanges();
    expect(component.customProperties.city).toBe(newCity);
    expect(spyLocation).toHaveBeenCalled();
  }));

  it('should handle error data', fakeAsync(() => {
    const newCity = 'Paris';
    component.cityChangeForm.setValue({ newCity });
    const spyLog = jest.spyOn(console, 'log');
    spyOnProfile.mockReturnValue(throwError('message'));
    component.onSubmit();
    tick();
    fixture.detectChanges();
    expect(spyLog).toHaveBeenCalled();
  }));

  it('should leave profileSerive', fakeAsync(() => {
    component.cityChangeForm.setValue({ newCity: null });
    component.onSubmit();
    tick();
    expect(spyOnProfile).not.toHaveBeenCalled();
  }));
});
