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
import { ProfileService } from '@perx/core';
import { of, throwError } from 'rxjs';
import { Location } from '@angular/common';
import { Type } from '@angular/core';

const profileServiceStub = {
  setCustomProperties: () => of(null)
};
describe('ChangeCityComponent', () => {
  let component: ChangeCityComponent;
  let fixture: ComponentFixture<ChangeCityComponent>;
  let profileService: ProfileService;
  let spyOnProfile: jasmine.Spy;
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
    spyOnProfile = spyOn(profileService, 'setCustomProperties');
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit data', fakeAsync(() => {
    const newCity = 'Paris';
    const spyLocation = spyOn(location, 'back');
    component.cityChangeForm.setValue({ newCity });
    spyOnProfile.and.returnValue(of(null));
    component.onSubmit();
    tick();
    fixture.detectChanges();
    expect(component.customProperties.city).toBe(newCity);
    expect(spyLocation).toHaveBeenCalled();
  }));

  it('should handle error data', fakeAsync(() => {
    const newCity = 'Paris';
    component.cityChangeForm.setValue({ newCity });
    const spyLog = spyOn(console, 'log');
    spyOnProfile.and.returnValue(throwError('message'));
    component.onSubmit();
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
