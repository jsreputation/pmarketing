import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignDetailPageComponent } from './new-campaign-detail-page.component';
import { MatSelectModule, MatExpansionModule, MatFormFieldModule, MatOptionModule, MatRadioModule, MatCheckboxModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DatePickerModule, TimePickerModule, ChipListModule, SmsEditorModule } from '@cl-shared';
import { ReactiveFormsModule } from '@angular/forms';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { Subject } from 'rxjs';
import { StepConditionService } from '../../services/step-condition.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NewCampaignDetailFormService } from '../../services/new-campaign-detail-form.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

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
                NoopAnimationsModule
            ],
            providers: [
            {
                provide: CampaignCreationStoreService, useValue: {
                updateCampaign: (data: any) => data,
                resetCampaign: () => {},
                currentCampaign$: new Subject()
                }
            },
            { provide: StepConditionService, useValue: {registerStepCondition: () => ({}) }},
            { provide: NewCampaignDetailFormService, useValue: newCampaignDetailFormServiceStub },
            ],
            declarations: [NewCampaignDetailPageComponent],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewCampaignDetailPageComponent);
        component = fixture.componentInstance;
        newCampaignDetailFormServiceStub = TestBed.get(NewCampaignDetailFormService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
