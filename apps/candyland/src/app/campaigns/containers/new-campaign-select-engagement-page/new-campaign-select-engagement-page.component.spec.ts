import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { NewCampaignSelectEngagementPageComponent } from './new-campaign-select-engagement-page.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { MatDialogModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from '@cl-shared/pipes/pipes.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('NewCampaignSelectEngagementPageComponent', () => {
  let component: NewCampaignSelectEngagementPageComponent;
  let fixture: ComponentFixture<NewCampaignSelectEngagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        TableFiltersModule,
        MatRadioModule,
        MatSelectModule,
        MatDialogModule,
        PipesModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      declarations: [NewCampaignSelectEngagementPageComponent],
      providers: [
        {provide: CampaignCreationStoreService, useValue: {
            updateCampaign: (data: any) => data,
            currentCampaign: {template: null},
            currentCampaign$: new Subject()}},
        {provide: StepConditionService, useValue: {registerStepCondition: () => ({}) }},
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
