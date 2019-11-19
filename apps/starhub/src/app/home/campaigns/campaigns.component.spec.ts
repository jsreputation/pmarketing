import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CampaignsComponent } from './campaigns.component';
import { MatCardModule, MatIconModule } from '@angular/material';
import { of } from 'rxjs';
import { ICampaignService, CampaignType, CampaignState, IGameService, ICampaign } from '@perx/core';
import { Type } from '@angular/core';
import { game } from '../../game.mock';

describe('CampaignsComponent', () => {
  let component: CampaignsComponent;
  let fixture: ComponentFixture<CampaignsComponent>;
  const campaignServiceStub = {
    getCampaigns: () => of([])
  };

  const gameServiceStub = {
    getGamesFromCampaign: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsComponent ],
      imports: [
        MatCardModule,
        MatIconModule
      ],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: IGameService, useValue: gameServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get all campaigns on init', fakeAsync(() => {
      const campaigns = [
        {
          id: 1,
          name: 'abc',
          description: 'abc',
          type: CampaignType.game,
          state: CampaignState.active,
          endsAt: undefined,
          rewards: [],
          thumbnailUrl: '',
        },
        {
          id: 2,
          name: 'abc',
          description: 'abc',
          type: CampaignType.give_reward,
          state: CampaignState.active,
          endsAt: undefined,
          rewards: [
            {
              id: 1,
              name: 'reward test',
              description: '',
              subtitle: '',
              validFrom: new Date(),
              validTo: new Date(),
              sellingFrom: null,
              rewardThumbnail: '',
              rewardBanner: '',
              merchantImg: '',
              rewardPrice: [],
              merchantId: 1,
              merchantName: '',
              merchantWebsite: '',
              termsAndConditions: '',
              howToRedeem: '',
              categoryTags: [],
              inventory: null,
            }
          ],
          thumbnailUrl: '',
        }
      ];
      const campaigndService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
      const campaignsServiceSpy = spyOn(campaigndService, 'getCampaigns').and.returnValue(of(campaigns));
      component.ngOnInit();
      tick();
      expect(campaignsServiceSpy).toHaveBeenCalled();
    }));
  });

  it('should emit hasExpired with value true', () => {
    const campaign: ICampaign = {
      id: 1,
      name: 'abc',
      description: 'abc',
      type: CampaignType.game,
      state: CampaignState.active,
      endsAt: null,
      rewards: [],
      thumbnailUrl: '',
    };
    component.games = game;
    spyOn(component.tapped, 'emit');
    component.selected(campaign);
    expect(component.tapped.emit).toHaveBeenCalledWith(1);
  });
});
