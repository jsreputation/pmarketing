import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';

import { NewCampaignRewardsPageComponent } from './new-campaign-rewards-page.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NewCampaignRewardsStampsFormService } from '../../services/new-campaign-rewards-stamps-form.service';


describe('NewCampaignRewardsPageComponent', () => {
  let component: NewCampaignRewardsPageComponent;
  let fixture: ComponentFixture<NewCampaignRewardsPageComponent>;
  // let form: FormGroup;
  const fb: FormBuilder = new FormBuilder();
  const NewCampaignRewardsStampsFormServiceStub: Partial<NewCampaignRewardsStampsFormService> = {
    getForm: () => (null),
    getDefaultValue: () => ({}),
    getToggleConfig: () => ([]),
    getLimitsForm: () => (fb.group({
      times: [null],
      duration: [null, [
        // Validators.required
      ]],
      id: null
    }))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
      ],
      declarations: [NewCampaignRewardsPageComponent],
      providers: [
        {
          provide: CampaignCreationStoreService, useValue: {
            updateCampaign: (data: any) => data,
            currentCampaign$: new Subject()
          }
        },
        { provide: FormBuilder, useValue: fb },
        { provide: StepConditionService, useValue: { registerStepCondition: () => ({}) } },
        { provide: NewCampaignRewardsStampsFormService, useValue: NewCampaignRewardsStampsFormServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignRewardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.form.controls['times'].setValue(0);
    expect(component).toBeTruthy();
  });
});
