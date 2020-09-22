import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ConfigService,
  ICampaignService, ThemesService,
  UtilsModule
} from '@perxtech/core';
import { CampaignLandingPageComponent } from './campaign-landing-page.component';
import { of } from 'rxjs';

describe('CampaignLandingPageComponent', () => {
  let component: CampaignLandingPageComponent;
  let fixture: ComponentFixture<CampaignLandingPageComponent>;
  const campaignServiceStub: Partial<ICampaignService> = {};
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of({
      apiHost: '',
      production: false,
      preAuth: false,
      isWhistler: false,
      baseHref: '',
    })
  };
  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignLandingPageComponent],
      imports: [
        UtilsModule,
        MatToolbarModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: ThemesService, useValue: themesServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
