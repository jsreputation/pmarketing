import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ConditionComponent } from './condition.component';
import {
  MatIconModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatListModule,
  MatRadioModule
} from '@angular/material';
import { Location } from '@angular/common';
import { ProfileService } from '@perx/core';
import { of } from 'rxjs';
import { Type } from '@angular/core';

describe('ConditionComponent', () => {
  let component: ConditionComponent;
  let fixture: ComponentFixture<ConditionComponent>;
  const locationStub = {
    goBack: () => {}
  };

  const userInfo = {
    id: 59431,
    state: 'active',
    firstName: 'Perx',
    lastName: 'PERX',
    middleName: null,
    phone: null,
    email: null,
    birthDate: null,
    gender: null,
    joinedDate: '2019-07-01T03:37:50.049Z',
    passwordExpiryDate: null,
    customProperties: {
      last_4: '1234',
      diabetes: 'true',
      diabetesState: 'pre_diabetes', // diabetes, pre_diabetes, ""
      hypertension: 'true'
    }
  };

  const profileServiceStub = {
    whoAmI: () => of(userInfo),
    setCustomProperties: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionComponent ],
      imports: [
        MatIconModule,
        MatToolbarModule,
        MatSlideToggleModule,
        MatListModule,
        MatRadioModule
      ],
      providers: [
        { provide: Location, useValue: locationStub },
        { provide: ProfileService, useValue: profileServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return get current user info on init', fakeAsync(() => {
    const profileService: ProfileService = fixture.debugElement.injector.get<ProfileService>(ProfileService as Type<ProfileService>);
    const authSpy = spyOn(profileService, 'whoAmI').and.returnValue(of(userInfo));

    component.ngOnInit();
    tick();
    expect(authSpy).toHaveBeenCalled();
    expect(component.profile).toBe(userInfo);
  }));

  describe('toggleDiabetesButtonGroupVisibilty', () => {
    it('should update diabetes on button slide on', () => {
      component.toggleDiabetesButtonGroupVisibilty({ checked: true, source: null });
      expect(component.profile.customProperties.diabetes).toBe('true');
      expect(component.profile.customProperties.diabetesState).toBe('diabetes');
    });

    it('should update diabetes on button slide off', () => {
      component.toggleDiabetesButtonGroupVisibilty({ checked: false, source: null });
      expect(component.profile.customProperties.diabetes).toBe('false');
      expect(component.profile.customProperties.diabetesState).toBe('');
    });
  });

  describe('isDiabetesState', () => {
    it('should return true and checked pre-diabetes radiobox ', fakeAsync(() => {
      const isDiabetesState = component.isDiabetesState('pre_diabetes');
      tick();
      expect(isDiabetesState).toBe(true);
    }));

    it('should return false and NOT check diabetes radiobox ', fakeAsync(() => {
      const isDiabetesState = component.isDiabetesState('diabetes');
      tick();
      expect(isDiabetesState).toBe(false);
    }));
  });

  describe('onDiabetesConditionChanged', () => {
    it('should set diabetes state to diabetes', () => {
      component.onDiabetesConditionChanged({value: 'diabetes', source: null});
      expect(component.profile.customProperties.diabetesState).toBe('diabetes');
    });

    it('should set diabetes state to pre_diabetes', () => {
      component.onDiabetesConditionChanged({value: 'pre_diabetes', source: null});
      expect(component.profile.customProperties.diabetesState).toBe('pre_diabetes');
    });
  });

  describe('onHypertensionConditionChanged', () => {
    it('should set hypertension to string true', () => {
      component.onHypertensionConditionChanged({checked: true, source: null});
      expect(component.profile.customProperties.hypertension).toBe('true');
    });

    it('should set hypertension to string false', () => {
      component.onHypertensionConditionChanged({checked: false, source: null});
      expect(component.profile.customProperties.hypertension).toBe('false');
    });
  });

});
