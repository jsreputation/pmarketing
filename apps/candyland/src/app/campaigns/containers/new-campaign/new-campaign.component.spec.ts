import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';

import { NewCampaignComponent } from './new-campaign.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EngagementItemModule } from '@cl-shared/components/engagement-item/engagement-item.module';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from '@cl-core-services';

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
        { provide: LocalStorageService, useValue: {} }
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
