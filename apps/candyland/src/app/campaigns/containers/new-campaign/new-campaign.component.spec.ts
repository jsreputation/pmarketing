import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';

import { NewCampaignComponent } from './new-campaign.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EngagementItemModule } from '@cl-shared/components/engagement-item/engagement-item.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material';

describe('NewCampaignComponent', () => {
  let component: NewCampaignComponent;
  let fixture: ComponentFixture<NewCampaignComponent>;
  let form: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        EngagementItemModule,
        HttpClientTestingModule
      ],
      declarations: [NewCampaignComponent],
      providers: [
        {provide: CampaignCreationStoreService, useValue: {
          updateCampaign: (data: any) => data,
            currentCampaign$: new Subject()}},
        {provide: StepConditionService, useValue: {
          registerStepCondition: () => ({}),
          getStepCondition: () => ({})
        }},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignComponent);
    component = fixture.componentInstance;
    form = new FormGroup({}, []);
    component.form = form;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
