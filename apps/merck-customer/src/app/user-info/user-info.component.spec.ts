import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserInfoComponent } from './user-info.component';
import { Type } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
  } from '@angular/forms';
import { ProfileModule, ProfileService } from '@perx/core';
import { environment } from '../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule
} from '@angular/material';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(async(() => {
    const routerStub = { navigateByUrl: () => ({}) };
    TestBed.configureTestingModule({
      declarations: [ UserInfoComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        ProfileModule.forRoot({ env: environment })
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        {
          provide: ProfileService,
          useValue: {setCustomProperties: () => {}}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home once user info is set', fakeAsync(() => {
    const profileService: ProfileService = fixture.debugElement.injector.get<ProfileService>(ProfileService as Type<ProfileService>);

  // TODO: The following test condition should be changed when service is implemented in ProfileService
    const profileServiceSpy = spyOn(profileService, 'setCustomProperties').and.returnValue(throwError('Not implemented yet'));
    const routerStub: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(routerStub, 'navigateByUrl').and.stub();

    component.onNext();
    tick();
    fixture.detectChanges();
    expect(profileServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith('/home');
  }));

  it('should update diabetes condition', () => {

    component.diabetesConditionUpdated(true);
    expect(component.surveyForm.get('diabetes').value).toBe('diabetes');
  });
});
