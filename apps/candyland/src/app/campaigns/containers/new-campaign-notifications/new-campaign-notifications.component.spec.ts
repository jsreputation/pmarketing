import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NewCampaignNotificationsComponent } from './new-campaign-notifications.component';
import { CampaignChannelsFormService } from '../../services/campaign-channels-form.service';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NewCampaignDetailFormService } from '../../services/new-campaign-detail-form.service';
import { StepConditionService } from '../../services/step-condition.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ICampaign } from '@cl-core/models/campaign/campaign';
import { MatCheckboxModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AudiencesService, StampsService } from '@cl-core-services';
import { MockStampsService } from '@cl-shared/test-components/providers/mock-stamps.service';
import { MockAudienceService } from '@cl-shared/test-components/providers/mock-audience.service';
import { LoyaltyCustomTierService } from '@cl-core/services/loyalty-custom-tier.service';
import { MockLoyaltyCustomTierService } from '@cl-shared/test-components/providers/mock-loyalty-custom-tier.service';

describe('NewCampaignNotificationsComponent', () => {
  let component: NewCampaignNotificationsComponent;
  let fixture: ComponentFixture<NewCampaignNotificationsComponent>;
  const campaignCreationStoreServiceStub: Partial<CampaignCreationStoreService> = {
    updateCampaign: (data: any) => data,
    resetCampaign: () => {
    },
    currentCampaign$: new BehaviorSubject<ICampaign>(null)
  };
  const stepConditionServiceStub: Partial<StepConditionService> = {
    registerStepCondition: () => ({})
  };
  const activatedRouteStub = {
    snapshot: {
      params: {
        id: 42
      }
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCampaignNotificationsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        MatCheckboxModule,
        MatSelectModule,
      ],
      providers: [
        CampaignChannelsFormService,
        NewCampaignDetailFormService,
        RouterTestingModule,
        { provide: CampaignCreationStoreService, useValue: campaignCreationStoreServiceStub },
        { provide: StepConditionService, useValue: stepConditionServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: StampsService, useClass: MockStampsService },
        { provide: AudiencesService, useClass: MockAudienceService },
        { provide: LoyaltyCustomTierService, useClass: MockLoyaltyCustomTierService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignNotificationsComponent);
    component = fixture.componentInstance;
    component.channelForm = new FormGroup({
      webNotification: new FormGroup({
        webLink: new FormControl(null),
        webLinkOptions: new FormControl(null),
        id: new FormControl(null),
      }),
      sms: new FormControl(null),
      launch: new FormArray([]),
      completed: new FormArray([]),
      campaignEnds: new FormArray([]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
