import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCampaignSelectEngagementPageComponent } from './new-campaign-select-engagement-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { MatRadioModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {StepConditionService} from "../../services/step-condition.service";
import {CampaignCreationStoreService} from "../../services/campaigns-creation-store.service";

describe('NewCampaignSelectEngagementPageComponent', () => {
  let component: NewCampaignSelectEngagementPageComponent;
  let fixture: ComponentFixture<NewCampaignSelectEngagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        StepConditionService,
        CampaignCreationStoreService
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        TableFiltersModule,
        MatRadioModule,
        MatSelectModule
      ],
      declarations: [
        NewCampaignSelectEngagementPageComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignSelectEngagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
