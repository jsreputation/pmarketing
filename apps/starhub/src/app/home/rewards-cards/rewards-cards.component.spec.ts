import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RewardsCardsComponent } from './rewards-cards.component';
import { MatIconModule, MatCardModule } from '@angular/material';
import { RewardsService, IReward, ConfigService } from '@perxtech/core';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { rewards } from '../../rewards.mock';
import { MacaronService } from '../../services/macaron.service';
import {GhostsModule} from '../../ghosts/ghosts.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RewardsCardsComponent', () => {
  let component: RewardsCardsComponent;
  let fixture: ComponentFixture<RewardsCardsComponent>;

  const rewardsServiceStub: Partial<RewardsService> = {
    getRewards: () => of(rewards)
  };
  const macaronServiceStub: Partial<MacaronService> = {
    getMacaron: () => null
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
      declarations: [RewardsCardsComponent],
      imports: [
        MatIconModule,
        MatCardModule,
        InfiniteScrollModule,
        NoopAnimationsModule,
        GhostsModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: MacaronService, useValue: macaronServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call macaronService.getMacaron getMacaron', () => {
    const macaronService = TestBed.get<MacaronService>(MacaronService as Type<MacaronService>);
    const macaronServiceSpy = spyOn(macaronService, 'getMacaron').and.returnValue(null);
    const macaron = component.getMacaron({} as IReward);
    expect(macaron).toBe(null);
    expect(macaronServiceSpy).toHaveBeenCalled();
  });

  it('should emit tapped on selected', () => {
    const reward = {
      id: 1,
      name: 'Get a Free Coke',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      subtitle: 'string',
      validFrom: new Date('2018-12-16T03:24:00'),
      validTo: new Date('2019-11-17T03:24:00'),
      rewardThumbnail: 'https://picsum.photos/300/200?random=1',
      rewardBanner: 'https://picsum.photos/300/200?random=2',
      merchantImg: 'https://picsum.photos/300/200?random=3',
      merchantName: 'Pizza Hut',
      termsAndConditions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      howToRedeem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      merchantId: 2
    };

    spyOn(component.tapped, 'emit');
    component.selected(reward);
    expect(component.tapped.emit).toHaveBeenCalledWith(reward);
  });

});
