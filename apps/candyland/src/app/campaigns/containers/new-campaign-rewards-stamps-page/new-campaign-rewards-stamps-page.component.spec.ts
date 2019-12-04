import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignRewardsStampsPageComponent } from './new-campaign-rewards-stamps-page.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatCheckboxModule, MatSelectModule, MatSlideToggleModule, MatInputModule } from '@angular/material';
import { ButtonModule } from '@cl-shared';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { BehaviorSubject } from 'rxjs';
import { StepConditionService } from '../../services/step-condition.service';
import { NewCampaignRewardsStampsFormService } from '../../services/new-campaign-rewards-stamps-form.service';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('NewCampaignRewardsStampsPageComponent', () => {
  let component: NewCampaignRewardsStampsPageComponent;
  let fixture: ComponentFixture<NewCampaignRewardsStampsPageComponent>;
  let NewCampaignRewardsStampsFormServiceStub: Partial<NewCampaignRewardsStampsFormService>;
  const fb: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    NewCampaignRewardsStampsFormServiceStub = {
      getForm: () => (null),
      getDefaultValue: () => ({}),
      getToggleConfig: () => ([]),
      getLimitsForm: () => (fb.group({
        stampsRule: fb.group({
          sequence: [],
          rules: fb.array([
            fb.control(null)
          ])
        }),
        limits: fb.group({
          enableStampCard: [false],
          stampCard: fb.group({
            perCampaign: [null],
            perUser: [null],
            duration: []
          }),
          enableStamp: [false],
          stamp: fb.group({
            perUser: [null],
            duration: []
          })
        }),
        enableStampCardsValidity: [],
        stampCardsValidity: fb.group({
          times: [],
          duration: []
        })
      }))
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
        MatCheckboxModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatInputModule,
        ButtonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: CampaignCreationStoreService, useValue: {
            updateCampaign: () => {
            },
            resetCampaign: () => {
            },
            currentCampaign$: new BehaviorSubject({}),
            currentCampaign: () => ({
              template: {
                nb_of_slots: 0
              }
            })
          }
        },
        { provide: StepConditionService, useValue: { registerStepCondition: () => ({}) } },
        { provide: FormBuilder, useValue: fb },
        { provide: NewCampaignRewardsStampsFormService, useValue: NewCampaignRewardsStampsFormServiceStub }
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
