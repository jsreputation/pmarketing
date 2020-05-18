import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsCollectionComponent } from './campaigns-collection.component';
import {MatCardModule} from '@angular/material/card';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import { of } from 'rxjs';
import {
  ICampaignService,
  IGameService,
  QuizService
} from '@perxtech/core';

describe('CampaignsCollectionComponent', () => {
  let component: CampaignsCollectionComponent;
  let fixture: ComponentFixture<CampaignsCollectionComponent>;

  const gameServiceStub: Partial<IGameService> = {
    getGamesFromCampaign: () => of([])
  };

  const quizServiceStub: Partial<QuizService> = {
    getQuizFromCampaign: () => of()
  };

  const campaignServiceStub: Partial<ICampaignService> = {
    getVoucherLeftCount: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsCollectionComponent ],
      imports: [
        MatCardModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: IGameService, useValue: gameServiceStub },
        { provide: QuizService, useValue: quizServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsCollectionComponent);
    component = fixture.componentInstance;
    component.campaigns$ = of();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
