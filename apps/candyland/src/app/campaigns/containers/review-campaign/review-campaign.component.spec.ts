import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCampaignComponent } from './review-campaign.component';
import { ButtonModule } from '@cl-shared';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { Subject } from 'rxjs';
import { StepConditionService } from '../../services/step-condition.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReviewCampaignComponent', () => {
    let component: ReviewCampaignComponent;
    let fixture: ComponentFixture<ReviewCampaignComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ButtonModule,
                BrowserDynamicTestingModule,
                HttpClientTestingModule,
                RouterTestingModule
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
            ],
            declarations: [ReviewCampaignComponent],
            schemas: [ NO_ERRORS_SCHEMA ]
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
