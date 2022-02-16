import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CampaignsComponent } from './campaigns.component';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import {
  CampaignState,
  CampaignType,
  ConfigService,
  GameType,
  ICampaign,
  ICampaignService,
  IGame,
  IGameService,
  IQuestService,
  SettingsService
} from '@perxtech/core';
import { Type } from '@angular/core';
import { game } from '../../game.mock';
import { IMacaron, MacaronService } from '../../services/macaron.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GhostCardComponent } from '../../ghosts/card-ghost.component';

describe('CampaignsComponent', () => {
  let component: CampaignsComponent;
  let fixture: ComponentFixture<CampaignsComponent>;
  let campaigndService: ICampaignService;
  let gameService: IGameService;
  let macaronService: MacaronService;
  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of([])
  };

  const gameServiceStub: Partial<IGameService> = {
    getGamesFromCampaign: () => of(game)
  };
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of({
      apiHost: '',
      production: false,
      preAuth: false,
      isWhistler: false,
      baseHref: '',
      rssFeeds: '',
    })
  };

  const settingsServiceStub: Partial<SettingsService> = {
    getRemoteFlagsSettings: () => of()
  };

  const questServiceStub: Partial<IQuestService> = {
    getQuestFromCampaign: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignsComponent, GhostCardComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        MatRippleModule,
        InfiniteScrollModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: IGameService, useValue: gameServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub },
        { provide: IQuestService, useValue: questServiceStub }
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
              loyalty: []
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
    expect(component.tapped.emit).toHaveBeenCalledWith({itemType : CampaignType.game, itemId: 1});
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
