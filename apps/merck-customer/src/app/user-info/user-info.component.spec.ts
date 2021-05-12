import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserInfoComponent } from './user-info.component';
import { Type } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { ProfileModule, ProfileService, ThemesService } from '@perxtech/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

const themesServiceStub: Partial<ThemesService> = {
  getThemeSetting: () => of()
};

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(async(() => {
    const routerStub = { navigateByUrl: () => ({}) };
    TestBed.configureTestingModule({
      declarations: [UserInfoComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        ProfileModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        {
          provide: ProfileService,
          useValue: { setCustomProperties: () => of(null) }
        },
        { provide: ThemesService, useValue: themesServiceStub }
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

    const profileServiceSpy = spyOn(profileService, 'setCustomProperties').and.callThrough();
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
    expect(component.surveyForm.value.diabetes).toBe('diabetes');
  });
});
