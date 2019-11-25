import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignRewardsStampsPageComponent } from './new-campaign-rewards-stamps-page.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatCheckboxModule } from '@angular/material';
import { ButtonModule } from '@cl-shared';
import { ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { BehaviorSubject } from 'rxjs';
import { StepConditionService } from '../../services/step-condition.service';
import { NewCampaignRewardsStampsFormService } from '../../services/new-campaign-rewards-stamps-form.service';
import { TranslateModule } from '@ngx-translate/core';

describe('NewCampaignRewardsStampsPageComponent', () => {
  let component: NewCampaignRewardsStampsPageComponent;
  let fixture: ComponentFixture<NewCampaignRewardsStampsPageComponent>;
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
          {provide: StepConditionService, useValue: {registerStepCondition: () => ({})}},
          {provide: NewCampaignRewardsStampsFormService, useValue: NewCampaignRewardsStampsFormServiceStub}
        ],
        declarations: [NewCampaignRewardsStampsPageComponent],
        schemas: [NO_ERRORS_SCHEMA]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignRewardsStampsPageComponent);
    component = fixture.componentInstance;
    NewCampaignRewardsStampsFormServiceStub = TestBed.get(NewCampaignRewardsStampsFormService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
