import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSurveyCampaignsComponent } from './quiz-survey-campaigns.component';
import { CampaignServiceModule, ICampaignService } from '@perxtech/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GhostCardComponent } from '../../ghosts/card-ghost.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('QuizSURVEYCampaignsComponent', () => {
  let component: QuizSurveyCampaignsComponent;
  let fixture: ComponentFixture<QuizSurveyCampaignsComponent>;
  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizSurveyCampaignsComponent, GhostCardComponent ],
      imports: [
        CampaignServiceModule.forRoot(),
        MatCardModule,
        MatIconModule,
        InfiniteScrollModule,
        HttpClientTestingModule,
        MatRippleModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSurveyCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
