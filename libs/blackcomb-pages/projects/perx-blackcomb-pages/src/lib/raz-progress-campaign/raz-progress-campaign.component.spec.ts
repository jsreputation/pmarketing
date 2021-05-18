import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { RazProgressCampaignComponent } from './raz-progress-campaign.component';
import {
  ConfigService,
  ICampaignService,
  IVoucherService,
  LoyaltyService,
  ProgressBarModule,
  ProgressInfoPipe,
  RewardsModule,
  SettingsService,
  StampService,
  TransactionsService,
  UtilsModule
} from '@perxtech/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';

const campaignServiceStub: Partial<ICampaignService> = {
  getCampaign: () => of(),
};
const settingsServiceStub: Partial<SettingsService> = {
  getRemoteFlagsSettings: () => of()
};
const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of()
};
const loyaltyServiceStub: Partial<LoyaltyService> = {
  getLoyalty: () => of()
};
const stampServiceStub: Partial<StampService> = {
  getCards: () => of()
};
const voucherServiceStub: Partial<IVoucherService> = {
  getAll: () => of([])
};
const translateServiceStub: Partial<TranslateService> = {
  get: () => of()
};
const transactionServiceStub: Partial<TransactionsService> = {
  getTransactions: () => of()
};

describe('ProgressCampaignComponent', () => {
  let component: RazProgressCampaignComponent;
  let fixture: ComponentFixture<RazProgressCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazProgressCampaignComponent ],
      imports: [
		    RouterTestingModule,
        RewardsModule,
        MatCardModule,
        ProgressBarModule,
        UtilsModule
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of(convertToParamMap({ id: 1 }))
          }
        },
        { provide: ICampaignService, useValue: campaignServiceStub},
        { provide: ConfigService, useValue: configServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub },
        { provide: StampService, value: stampServiceStub },
        { provide: LoyaltyService, value: loyaltyServiceStub },
        { provide: TranslateService, useValue: translateServiceStub },
        { provide: IVoucherService, useValue: voucherServiceStub },
        { provide: TransactionsService, useValue: transactionServiceStub },
        ProgressInfoPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RazProgressCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
