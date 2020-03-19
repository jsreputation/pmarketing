import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RewardsCardsComponent } from './rewards-cards.component';
import { MatIconModule, MatCardModule } from '@angular/material';
import { RewardsService, IReward } from '@perxtech/core';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { MacaronService } from 'src/app/services/macaron.service';

describe('RewardsCardsComponent', () => {
  let component: RewardsCardsComponent;
  let fixture: ComponentFixture<RewardsCardsComponent>;

  const rewards = [
    {
      id: 77,
      name: 'UAT - $1 Traditional Toast set ',
      subtitle: null,
      description: 'At just $1, enjoy Toast Box\'s signature traditional toast set with a choice of Kaya, Peanut Butter, Butter or Butter Sugar toast. It comprises a medium hot kopi/teh and two soft-boiled eggs. Limited to the first 5000 customers before 4 Nov, while stocks last.',
      rewardPrice: [
        {
          id: 76,
          currencyCode: 'MYR',
          price: '0.0',
          points: 0,
          identifier: null
        }
      ],
      rewardThumbnail: 'https://perx-cdn-staging.s3.amazonaws.com/reward/item/images/77/tb_starhub_tradkayatoastset1_315x179-1d3c3d1c-10ca-4720-b0ec-73fbc2b758af.jpg',
      rewardBanner: 'https://perx-cdn-staging.s3.amazonaws.com/reward/item/images/77/tradkaya_375x136-059c1ef8-11d3-41f4-a84e-3af32ee1a5dc.jpg',
      validFrom: new Date('2019-10-05T02:00:00.000Z'),
      validTo: new Date('2019-11-04T15:59:00.000Z'),
      sellingFrom: new Date('2019-09-05T16:00:00.000Z'),
      merchantId: 3,
      merchantName: 'Toast Box',
      merchantImg: 'https://perx-cdn-staging.s3.amazonaws.com/merchant/account/photo_url/3/toast-box-logo-4a6c93ec-db41-4c26-99d9-3187e22864ae.jpg',
      merchantWebsite: null,
      termsAndConditions: '<p><strong>Total 68 participating outlets</strong> excluding the following 9 stores below:</p>\n<ol>\n  <li>Marina Bay Sands</li>\n  <li>Resorts World Sentosa</li>\n</ol>\n<p>And our 7 stores at Food Republic/Food Opera: 313@Somerset L5, Causeway Point L4, ION, Manulife Centre, Parkway Parade, VivoCity L3 and Wisma Atria</p>\n<p><br></p>',
      categoryTags: [
        {
          id: 1,
          title: 'Eat',
          parent: null
        }
      ],
      inventory: {
        rewardTotalBalance: null,
        rewardTotalLimit: null,
        rewardLimitPerUserBalance: 0
      }
    }
  ];
  const rewardsServiceStub: Partial<RewardsService> = {
    getAllRewards: () => of()
  };
  const macaronServiceStub: Partial<MacaronService> = {
    getMacaron: () => null
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardsCardsComponent],
      imports: [
        MatIconModule,
        MatCardModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
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

  describe('onInit', () => {
    it('should call rewardsService.getAllRewards', fakeAsync(() => {
      const rewardsService = TestBed.get<RewardsService>(RewardsService as Type<RewardsService>);
      const rewardsServiceSpy = spyOn(rewardsService, 'getAllRewards').and.returnValue(of(rewards));
      component.ngOnInit();
      tick();
      expect(rewardsServiceSpy).toHaveBeenCalled();
    }));
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
