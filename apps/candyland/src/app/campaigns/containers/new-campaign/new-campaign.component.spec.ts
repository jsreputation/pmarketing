import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';

import { NewCampaignComponent } from './new-campaign.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EngagementItemModule } from '@cl-shared/components/engagement-item/engagement-item.module';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService, TenantStoreService } from '@cl-core-services';
import { CampaignChannelsFormService } from '../../services/campaign-channels-form.service';
import { TenantMockStore } from '@cl-shared/test-components/tenant-mock-store/tenant-mock-store';

describe('NewCampaignComponent', () => {
  let component: NewCampaignComponent;
  let fixture: ComponentFixture<NewCampaignComponent>;
  let form: FormGroup;
  const msgSvcStub: Partial<MessageService> = {
    show: () => ({})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        EngagementItemModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      declarations: [NewCampaignComponent],
      providers: [
        {
          provide: CampaignCreationStoreService, useValue: {
            updateCampaign: (data: any) => data,
            resetCampaign: () => {},
            currentCampaign$: new Subject()
          }
        },
        {
          provide: StepConditionService, useValue: {
            registerStepCondition: () => ({}),
            getStepCondition: () => ({})
          }
        },
        {
          provide: MessageService, useValue: msgSvcStub
        },
        { provide: LocalStorageService, useValue: {} },
        { provide: CampaignChannelsFormService, useValue: {
            getForm () {
              return new FormGroup({});
            }
          } },
        { provide: TenantStoreService, useClass: TenantMockStore }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignComponent);
    component = fixture.componentInstance;
    form = new FormGroup({
      name: new FormControl()
    }, []);
    component.form = form;
    component.channelForm = new FormGroup({
      webNotification: new FormGroup({
        webLink: new FormControl(null),
        webLinkOptions: new FormControl(null),
        id: new FormControl(null),
      }),
      sms: new FormControl(null),
      launch: new FormArray([]),
      completed: new FormArray([]),
      campaignEnds: new FormArray([]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
