import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { NewCampaignDetailPageComponent } from './new-campaign-detail-page.component';
import {
  MatSelectModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatOptionModule,
  MatRadioModule,
  MatCheckboxModule
} from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DatePickerModule, TimePickerModule, ChipListModule, SmsEditorModule } from '@cl-shared';
import { ReactiveFormsModule, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { BehaviorSubject } from 'rxjs';
import { StepConditionService } from '../../services/step-condition.service';
// import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NewCampaignDetailFormService } from '../../services/new-campaign-detail-form.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { ICampaign } from '@cl-core/models/campaign/campaign';
import { ActivatedRoute } from '@angular/router';

describe('NewCampaignDetailPageComponent', () => {
  let component: NewCampaignDetailPageComponent;
  let fixture: ComponentFixture<NewCampaignDetailPageComponent>;
  let newCampaignDetailFormServiceStub: Partial<NewCampaignDetailFormService>;
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
    newCampaignDetailFormServiceStub = {
      getForm: () => (null),
      getDefaultValue: () => ({}),
      getToggleConfig: () => ([])
    };

    TestBed.configureTestingModule({
      imports: [
        MatSelectModule,
        MatExpansionModule,
        MatFormFieldModule,
        BrowserDynamicTestingModule,
        MatSelectModule,
        MatOptionModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatRadioModule,
        DatePickerModule,
        TimePickerModule,
        ChipListModule,
        ReactiveFormsModule,
        SmsEditorModule,
        // RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        FormsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: CampaignCreationStoreService, useValue: campaignCreationStoreServiceStub },
        { provide: StepConditionService, useValue: stepConditionServiceStub },
        { provide: NewCampaignDetailFormService, useValue: newCampaignDetailFormServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      declarations: [NewCampaignDetailPageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(inject([FormBuilder], (fb: FormBuilder) => {
    fixture = TestBed.createComponent(NewCampaignDetailPageComponent);
    component = fixture.componentInstance;
    component.form = fb.group({
      campaignInfo: fb.group({
        goal: ['Acquire customers', [Validators.required]],
        startDate: [null, [Validators.required]],
        startTime: [null, [Validators.required]],
        endDate: [null, [Validators.required]],
        endTime: [null, [Validators.required]],
        disabledEndDate: [false],
        labels: [],
        informationCollectionSetting: ['not_required']
      }),
      audience: fb.group({
        type: ['select'],
        file: [],
        select: []
      })
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
