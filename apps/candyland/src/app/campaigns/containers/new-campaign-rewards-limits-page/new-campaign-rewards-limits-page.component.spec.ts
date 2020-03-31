import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignRewardsLimitsPageComponent } from './new-campaign-rewards-limits-page.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatCheckboxModule } from '@angular/material';
import { ButtonModule } from '@perxtech/candyshop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { BehaviorSubject } from 'rxjs';
import { StepConditionService } from '../../services/step-condition.service';
import { NewCampaignRewardsStampsFormService } from '../../services/new-campaign-rewards-stamps-form.service';
import { TranslateModule } from '@ngx-translate/core';

describe('NewCampaignRewardsLimitsPageComponent', () => {
  let component: NewCampaignRewardsLimitsPageComponent;
  let fixture: ComponentFixture<NewCampaignRewardsLimitsPageComponent>;
  let NewCampaignRewardsStampsFormServiceStub: Partial<NewCampaignRewardsStampsFormService>;
  beforeEach(async(() => {
    NewCampaignRewardsStampsFormServiceStub = {
      getForm: () => (null),
      getDefaultValue: () => ({}),
      getToggleConfig: () => ([])
    };
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
        MatCheckboxModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: CampaignCreationStoreService, useValue: {
            updateCampaign: () => {
            },
            resetCampaign: () => {
            },
            currentCampaign$: new BehaviorSubject({})
          }
        },
        { provide: StepConditionService, useValue: { registerStepCondition: () => ({}) } },
        { provide: NewCampaignRewardsStampsFormService, useValue: NewCampaignRewardsStampsFormServiceStub }
      ],
      declarations: [NewCampaignRewardsLimitsPageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignRewardsLimitsPageComponent);
    component = fixture.componentInstance;
    NewCampaignRewardsStampsFormServiceStub = TestBed.get(NewCampaignRewardsStampsFormService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
