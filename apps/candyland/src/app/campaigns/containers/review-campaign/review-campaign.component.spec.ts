import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '@cl-core/services/local-storage.service';

import { ReviewCampaignComponent } from './review-campaign.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { Subject } from 'rxjs';
import { StepConditionService } from '../../services/step-condition.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('ReviewCampaignComponent', () => {
  let component: ReviewCampaignComponent;
  let fixture: ComponentFixture<ReviewCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot(),
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
        {provide: LocalStorageService, useValue: {}}
      ],
      declarations: [ReviewCampaignComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
