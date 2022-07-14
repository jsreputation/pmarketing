import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressCampaignComponent } from './progress-campaign.component';
import {
  ICampaignService,
  IPrizeSetOutcomeService,
  IVoucherService,
  NotificationService,
  ProgressCampaignService,
  UtilsModule
} from '@perxtech/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const campaignServiceStub: Partial<ICampaignService> = {};
const notificationServiceStub: Partial<NotificationService> = {};
const progressCampaignServiceStub: Partial<ProgressCampaignService> = {
  getCampaignProgressMilestones: () => of([]),
  getCampaignTotalProgress: () => of({userTotalAccumulatedCampaignPoints: 0})
};

const voucherServiceStub: Partial<IVoucherService> = {
  get: () => of()
};

const prizeSetOutcomeServiceStub: Partial<IPrizeSetOutcomeService> = {
  getPrizeSetIssuedOutcomes: () => of(),
};

describe('ProgressCampaignComponent', () => {
  let component: ProgressCampaignComponent;
  let fixture: ComponentFixture<ProgressCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressCampaignComponent ],
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        TranslateModule.forRoot(),
        UtilsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatCardModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule,
        MatListModule,
        MatTabsModule,
      ],
      providers: [
        { provide: ProgressCampaignService, useValue: progressCampaignServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: IVoucherService, useValue: voucherServiceStub },
        { provide: IPrizeSetOutcomeService, useValue: prizeSetOutcomeServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
