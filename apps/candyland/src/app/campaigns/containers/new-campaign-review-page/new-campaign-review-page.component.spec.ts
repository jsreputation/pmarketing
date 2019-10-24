import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';

import { NewCampaignReviewPageComponent } from './new-campaign-review-page.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { RouterModule } from '@angular/router';

describe('NewCampaignReviewPageComponent', () => {
  let component: NewCampaignReviewPageComponent;
  let fixture: ComponentFixture<NewCampaignReviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        BrowserDynamicTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
      ],
      declarations: [ NewCampaignReviewPageComponent ],
      providers: [
        {provide: CampaignCreationStoreService, useValue: {
            updateCampaign: (data: any) => data,
            currentCampaign$: new Subject()}},
        {provide: StepConditionService, useValue: {registerStepCondition: () => ({}) }},
        {provide: LocalStorageService, useValue: {}}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
