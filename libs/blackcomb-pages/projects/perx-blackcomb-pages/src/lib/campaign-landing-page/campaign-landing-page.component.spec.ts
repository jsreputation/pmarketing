import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { ICampaignService, UtilsModule } from '@perxtech/core';
import { CampaignLandingPageComponent } from './campaign-landing-page.component';

describe('CampaignLandingPageComponent', () => {
  let component: CampaignLandingPageComponent;
  let fixture: ComponentFixture<CampaignLandingPageComponent>;
  const campaignServiceStub: Partial<ICampaignService> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignLandingPageComponent],
      imports: [
        UtilsModule,
        MatToolbarModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub }
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
