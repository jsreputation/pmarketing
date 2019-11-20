import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignRewardsSurveyPageComponent } from './new-campaign-rewards-survey-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NewCampaignRewardsFormGroupComponent } from '../../components/new-campaign-rewards-form-group/new-campaign-rewards-form-group.component';
import {
  MatCardModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatRippleModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule
} from '@angular/material';
import { ButtonComponent } from '@cl-shared/components/button/button.component';
import { RewardItemComponent } from '../../components/reward-item/reward-item.component';
import { ProgressBarModule } from '@cl-shared/components/progress-bar/progress-bar.module';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { StepConditionService } from '../../services/step-condition.service';
import { BehaviorSubject } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CampaignsMobilePreviewComponent } from '../../components/campaigns-mobile-preview/campaigns-mobile-preview.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('NewCampaignRewardsSurveyPageComponent', () => {
  let component: NewCampaignRewardsSurveyPageComponent;
  let fixture: ComponentFixture<NewCampaignRewardsSurveyPageComponent>;
  const campaignCreationStoreServiceStub = {
    currentCampaign$: (new BehaviorSubject<any>(null))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewCampaignRewardsSurveyPageComponent,
        NewCampaignRewardsFormGroupComponent,
        ButtonComponent,
        RewardItemComponent,
        CampaignsMobilePreviewComponent,
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatRippleModule,
        MatDialogModule,
        ProgressBarModule,
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
      ],
      providers: [
        {provide: CampaignCreationStoreService, useValue: campaignCreationStoreServiceStub},
        {provide: StepConditionService, useValue: {registerStepCondition: () => ({})}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignRewardsSurveyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
