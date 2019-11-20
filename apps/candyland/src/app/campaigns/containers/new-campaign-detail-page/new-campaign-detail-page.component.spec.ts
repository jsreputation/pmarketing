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
import { Subject } from 'rxjs';
import { StepConditionService } from '../../services/step-condition.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NewCampaignDetailFormService } from '../../services/new-campaign-detail-form.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

describe('NewCampaignDetailPageComponent', () => {
  let component: NewCampaignDetailPageComponent;
  let fixture: ComponentFixture<NewCampaignDetailPageComponent>;
  let newCampaignDetailFormServiceStub: Partial<NewCampaignDetailFormService>;

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
          RouterTestingModule,
          HttpClientTestingModule,
          BrowserAnimationsModule,
          NoopAnimationsModule,
          FormsModule,
          TranslateModule.forRoot()
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
          {provide: NewCampaignDetailFormService, useValue: newCampaignDetailFormServiceStub}
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
      channel: fb.group({
        eventId: [],
        templateId: [],
        type: ['weblink', [Validators.required]],
        message: [],
        schedule: fb.group({
          sendDate: [],
          sendTime: [],
          enableRecurrence: [],
          recurrence: fb.group({
            times: [],
            period: [],
            repeatOn: []
          })

        })
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
