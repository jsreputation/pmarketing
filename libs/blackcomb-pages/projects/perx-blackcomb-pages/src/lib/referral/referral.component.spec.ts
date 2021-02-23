import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReferralComponent } from './referral.component';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigService, ICampaignService, LeaderboardCTAComponent } from '@perxtech/core';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material';

const campaignServiceStub: Partial<ICampaignService> = {
  getCampaigns: () => of([])
};

const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of({
    apiHost: '',
    production: false,
    preAuth: false,
    isWhistler: false,
    baseHref: '',
  })
};

describe('ReferralComponent', () => {
  let component: ReferralComponent;
  let fixture: ComponentFixture<ReferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReferralComponent, LeaderboardCTAComponent],
      imports: [
        MatToolbarModule,
        MatIconModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ConfigService, useValue: configServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
