import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '@cl-core/services/local-storage.service';

import { ReviewCampaignComponent } from './review-campaign.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { Subject } from 'rxjs';
import { StepConditionService } from '../../services/step-condition.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CampaignsService, EngagementsService, RewardsService, TenantStoreService } from '@cl-core-services';
import { TenantMockStore } from '@cl-shared/test-components/tenant-mock-store/tenant-mock-store';
import { MockCampaignService } from '@cl-shared/test-components/providers/mock-campaign.service';
import { MockEngagementsService } from '@cl-shared/test-components/providers/mock-engagements.service';
import { MockRewardsServices } from '@cl-shared/test-components/providers/mock-rewards.services';

describe('ReviewCampaignComponent', () => {
  let component: ReviewCampaignComponent;
  let fixture: ComponentFixture<ReviewCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: CampaignCreationStoreService, useValue: {
            updateCampaign: (data: any) => data,
            resetCampaign: () => {
            },
            currentCampaign$: new Subject()
          }
        },
        {provide: StepConditionService, useValue: {registerStepCondition: () => ({})}},
        {provide: LocalStorageService, useValue: {}},
        { provide: TenantStoreService, useClass: TenantMockStore },
        { provide: CampaignsService, useClass: MockCampaignService },
        { provide: EngagementsService, useClass: MockEngagementsService },
        { provide: RewardsService, useClass: MockRewardsServices },
      ],
      declarations: [ReviewCampaignComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
