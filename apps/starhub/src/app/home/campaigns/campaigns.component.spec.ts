import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CampaignsComponent } from './campaigns.component';
import { MatCardModule, MatIconModule, MatRippleModule } from '@angular/material';
import { of } from 'rxjs';
import { ICampaignService, CampaignType, CampaignState, IGameService, ICampaign, IGame, GameType } from '@perx/core';
import { Type } from '@angular/core';
import { game } from '../../game.mock';
import { IMacaron, MacaronService } from 'src/app/services/macaron.service';

describe('CampaignsComponent', () => {
  let component: CampaignsComponent;
  let fixture: ComponentFixture<CampaignsComponent>;
  let campaigndService: ICampaignService;
  let gameService: IGameService;
  let macaronService: MacaronService;
  const campaignServiceStub = {
    getCampaigns: () => of([])
  };

  const gameServiceStub = {
    getGamesFromCampaign: () => of(game)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignsComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        MatRippleModule
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
    campaigndService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
    gameService = TestBed.get<IGameService>(IGameService as Type<IGameService>);
    macaronService = TestBed.get<MacaronService>(MacaronService as Type<MacaronService>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get all campaigns on init', fakeAsync(() => {
      const campaigns: ICampaign[] = [
        {
          id: 1,
          name: 'abc',
          description: 'abc',
          type: CampaignType.game,
          state: CampaignState.active,
          endsAt: null,
          rewards: [],
          thumbnailUrl: '',
        },
        {
          id: 2,
          name: 'abc',
          description: 'abc',
          type: CampaignType.give_reward,
          state: CampaignState.active,
          endsAt: null,
          rewards: [
            {
              id: 1,
              name: 'reward test',
              description: '',
              subtitle: '',
              validFrom: new Date(),
              validTo: new Date(),
              sellingFrom: undefined,
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
              inventory: undefined,
            }
          ],
          thumbnailUrl: '',
        }
      ];
      const campaignsServiceSpy = spyOn(campaigndService, 'getCampaigns').and.returnValue(of(campaigns));
      component.ngOnInit();
      tick();
      expect(campaignsServiceSpy).toHaveBeenCalled();
      expect(component.games).toEqual(game);
      expect(component.campaigns).toEqual([campaigns[0]]);
    }));
  });
  it('should handle ngOnInit with games', fakeAsync(() => {
    const campaigns: ICampaign[] = [
      {
        id: 1,
        name: 'abc',
        description: 'abc',
        type: CampaignType.game,
        state: CampaignState.active,
        endsAt: null,
        rewards: [],
        thumbnailUrl: '',
      }
    ];
    const games: IGame[] = [
      {
        id: 1,
        campaignId: 1,
        type: GameType.pinata,
        remainingNumberOfTries: 1,
        config: null,
        texts: {
          title: 'test'
        },
        results: {}
      }
    ];
    spyOn(campaigndService, 'getCampaigns').and.returnValue(of(campaigns));
    spyOn(gameService, 'getGamesFromCampaign').and.returnValue(of(games));
    component.ngOnInit();
    tick();
  }));

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
    component.games = [];
    component.selected(campaign);

    component.games = game;
    spyOn(component.tapped, 'emit');
    component.selected(campaign);
    expect(component.tapped.emit).toHaveBeenCalledWith(1);
  });

  it('getCampaignMacaron', fakeAsync(() => {
    const macron: IMacaron = { label: 'test', isButtonEnabled: false, class: 'test' };
    spyOn(macaronService, 'getCampaignMacaron').and.returnValue(macron);
    const result = component.getCampaignMacaron({
      id: 1,
      name: 'test',
      description: 'test',
      type: CampaignType.game,
      state: CampaignState.draft,
      endsAt: new Date()
    });
    expect(result).toEqual(macron);
  }));
});
