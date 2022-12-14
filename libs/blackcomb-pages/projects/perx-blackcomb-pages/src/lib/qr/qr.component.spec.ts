import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActivatedRoute,
  convertToParamMap,
} from '@angular/router';
import { Location } from '@angular/common';
import { Type } from '@angular/core';

import { of } from 'rxjs';
import { QRCodeModule } from 'angularx-qrcode';
import { TranslateModule } from '@ngx-translate/core';

import { ProfileService, ThemesService, ConfigService } from '@perxtech/core';

import { QRComponent } from './qr.component';

describe('QrComponent', () => {
  let component: QRComponent;
  let fixture: ComponentFixture<QRComponent>;
  const locationStub: Partial<Location> = {
    back: () => { }
  };

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of({ name: '', properties: { '--background': '', '--font_color': '' } })
  };

  const activatedRouteStub = {
    paramMap: of(convertToParamMap({ rewardId: 1 })),
    snapshot: {
      paramMap: convertToParamMap({ rewardId: 1 })
    }
  };

  const profileServiceStub: Partial<ProfileService> = { whoAmI: () => of({ id: 2, firstName: '', lastName: '' }) };

  const configServiceStub: Partial<ConfigService> = { readAppConfig: () => of() };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QRComponent],
      imports: [
        RouterTestingModule,
        QRCodeModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Location, useValue: locationStub },
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: ConfigService, useValue: configServiceStub }

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set rewardId and reward details onInit', fakeAsync(() => {
    const profileService: ProfileService = fixture.debugElement.injector.get<ProfileService>(ProfileService as Type<ProfileService>);
    const profileSpy = spyOn(profileService, 'whoAmI').and.returnValue(
      of({
        id: 1,
        state: 'active',
        firstName: 'Jane',
        lastName: 'Doe',
      })
    );
    component.ngOnInit();
    tick();
    expect(profileSpy).toHaveBeenCalled();
    expect(component.rewardId).toBe(1);
    expect(component.rewardDetails).toBe('{"id":1,"name":"Doe"}');
  }));

  it('should go back onCancel', () => {
    const location: Location = fixture.debugElement.injector.get<Location>(Location as Type<Location>);
    const locationSpy = spyOn(location, 'back');
    component.onCancel();
    expect(locationSpy).toHaveBeenCalled();
  });
});
