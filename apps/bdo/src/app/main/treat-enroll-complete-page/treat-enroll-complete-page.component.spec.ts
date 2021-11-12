import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatEnrollCompletePageComponent } from './treat-enroll-complete-page.component';
import { SharedModule } from '../../shared/shared.module';
import { TaggedItemComponent } from '../../shared/components/tagged-item/tagged-item.component';
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import {
  ICampaignService,
  RewardsService
} from '@perxtech/core';
describe('TreatEnrollCompletePageComponent', () => {
  let component: TreatEnrollCompletePageComponent;
  let fixture: ComponentFixture<TreatEnrollCompletePageComponent>;
  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaign: () => of()
  };
  const rewardServiceStub: Partial<RewardsService> = {
    getRewardsRelated: () => of([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatEnrollCompletePageComponent,TaggedItemComponent],
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: TranslateService, useValue: { get: () => of() } },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: RewardsService, useValue: rewardServiceStub },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    window.history.pushState({ promoId: '123'}, '', '');
    fixture = TestBed.createComponent(TreatEnrollCompletePageComponent);
    component = fixture.componentInstance;
    component.promo = {promoId: '123', campaignId: 81, campaignName: ''};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
