import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedItemsComponent } from './tagged-items.component';
import {
  ICampaignService,
  IGameService,
  ConfigService,
  RewardsService,
  StampService,
  SettingsService
} from '@perxtech/core';

import { of } from 'rxjs';
import { game } from '../../game.mock';
import { rewards } from '../../rewards.mock';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GhostCardComponent } from '../../ghosts/card-ghost.component';


describe('TaggedItemsComponent', () => {
  let component: TaggedItemsComponent;
  let fixture: ComponentFixture<TaggedItemsComponent>;

  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of([])
  };

  const gameServiceStub: Partial<IGameService> = {
    getGamesFromCampaign: () => of(game)
  };

  const rewardsServiceStub: Partial<RewardsService> = {
    getRewards: () => of(rewards)
  };

  const stampServiceStub: Partial<StampService> = {
    getCards: () => of()
  };

  const settingsServiceStub: Partial<SettingsService> = {
    getRemoteFlagsSettings: () => of()
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaggedItemsComponent, GhostCardComponent ],
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
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: StampService, useValue: stampServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
