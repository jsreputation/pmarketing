import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { StampCardsComponent } from './stamp-cards.component';
import { MatCardModule, MatIconModule, MatRippleModule } from '@angular/material';
import { of } from 'rxjs';
import {
  ICampaignService,
  CampaignType,
  CampaignState,
  ICampaign,
  ConfigService,
  StampService
} from '@perxtech/core';
import { Type } from '@angular/core';
import { IMacaron, MacaronService } from '../../services/macaron.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GhostCardComponent } from '../../ghosts/card-ghost.component';

describe('StampCardsComponent', () => {
  let component: StampCardsComponent;
  let fixture: ComponentFixture<StampCardsComponent>;
  let campaigndService: ICampaignService;
  let macaronService: MacaronService;
  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of([])
  };
  const stampServiceStub: Partial<StampService> = {
    getCards: () => of()
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
      declarations: [StampCardsComponent, GhostCardComponent],
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
        { provide: StampService, useValue: stampServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StampCardsComponent);
    campaigndService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
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
          type: CampaignType.stamp,
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
    }));
  });
  it('getCampaignMacaron', fakeAsync(() => {
    const macron: IMacaron = { label: 'test', isButtonEnabled: false, class: 'test' };
    spyOn(macaronService, 'getCampaignMacaron').and.returnValue(macron);
    const result = component.getCampaignMacaron({
      id: 1,
      name: 'test',
      description: 'test',
      type: CampaignType.stamp,
      state: CampaignState.draft,
      endsAt: new Date()
    });
    expect(result).toEqual(macron);
  }));
});
