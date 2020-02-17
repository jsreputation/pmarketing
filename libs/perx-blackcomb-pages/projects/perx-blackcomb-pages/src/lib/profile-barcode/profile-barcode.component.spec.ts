import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBarcodeComponent } from './profile-barcode.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { TranslateModule } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { ProfileService, ThemesService, ConfigService } from '@perx/core';
import { of } from 'rxjs';

describe('ProfileBarcodeComponent', () => {
  let component: ProfileBarcodeComponent;
  let fixture: ComponentFixture<ProfileBarcodeComponent>;
  const locationStub: Partial<Location> = {
    back: () => { }
  };

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of({ name: '', properties: { '--background': '', '--font_color': '' } })
  };

  const profileServiceStub: Partial<ProfileService> = { whoAmI: () => of({ id: 2, firstName: '', lastName: '' }) };

  const configServiceStub: Partial<ConfigService> = { readAppConfig: () => of() };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxBarcodeModule,
        TranslateModule.forRoot()
      ],
      declarations: [ ProfileBarcodeComponent ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: ConfigService, useValue: configServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
