import { TestBed, inject } from '@angular/core/testing';

import { MacaronService } from './macaron.service';
import { IReward, CampaignType, CampaignState, ICampaign } from '@perx/core';

describe('GameOutcomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MacaronService = TestBed.get(MacaronService);
    expect(service).toBeTruthy();
  });

  it('should return running out macaron', inject([MacaronService], (macaronService: MacaronService) => {
    const reward: IReward = {
      id: 1,
      name: 'Reward Test',
      description: 'Reward Description',
      subtitle: 'Reward Subtitle',
      validFrom: new Date(),
      validTo: new Date(),
      rewardBanner: '',
      termsAndConditions: '',
      howToRedeem: '',
      inventory: {
        rewardTotalBalance: 10,
        rewardTotalLimit: 100,
        rewardLimitPerUserBalance: 100
      }
    };
    const macaron = macaronService.getMacaron(reward);
    expect(macaron.label).toBe('Running out');
    expect(macaron.class).toBe('running-out');
    expect(macaron.rewardBalance).toBe(10);
    expect(macaron.isButtonEnabled).toBe(true);
  }));

  it('should return fully redeemed macaron', inject([MacaronService], (macaronService: MacaronService) => {
    const reward: IReward = {
      id: 1,
      name: 'Reward Test',
      description: 'Reward Description',
      subtitle: 'Reward Subtitle',
      validFrom: new Date(),
      validTo: new Date(),
      rewardBanner: '',
      termsAndConditions: '',
      howToRedeem: '',
      inventory: {
        rewardTotalBalance: 0,
        rewardTotalLimit: 100,
        rewardLimitPerUserBalance: 100
      }
    };
    const macaron = macaronService.getMacaron(reward);
    expect(macaron.label).toBe('Fully redeemed');
    expect(macaron.class).toBe('fully-redeemed');
    expect(macaron.isButtonEnabled).toBe(false);
  }));

  it('should return Expiring Soon macaron', inject([MacaronService], (macaronService: MacaronService) => {
    const today = new Date();
    const reward: IReward = {
      id: 1,
      name: 'Reward Test',
      description: 'Reward Description',
      subtitle: 'Reward Subtitle',
      validFrom: new Date(),
      validTo: new Date(today.setHours(today.getHours() + 32)),
      rewardBanner: '',
      termsAndConditions: '',
      howToRedeem: '',
      inventory: {
        rewardTotalBalance: 100,
        rewardTotalLimit: 100,
        rewardLimitPerUserBalance: 100
      }
    };
    const macaron = macaronService.getMacaron(reward);
    expect(macaron.label).toBe('Expiring Soon');
    expect(macaron.class).toBe('expiring');
    expect(macaron.isButtonEnabled).toBe(true);
  }));

  it('should return Expiring Soon macaron', inject([MacaronService], (macaronService: MacaronService) => {
    const today = new Date();
    const reward: IReward = {
      id: 1,
      name: 'Reward Test',
      description: 'Reward Description',
      subtitle: 'Reward Subtitle',
      validFrom: new Date(),
      sellingFrom: new Date(),
      validTo: new Date(today.setHours(today.getHours() + 70)),
      rewardBanner: '',
      termsAndConditions: '',
      howToRedeem: '',
      inventory: {
        rewardTotalBalance: 100,
        rewardTotalLimit: 100,
        rewardLimitPerUserBalance: 100
      }
    };
    const macaron = macaronService.getMacaron(reward);
    expect(macaron.label).toBe('Just added');
    expect(macaron.class).toBe('just-added');
    expect(macaron.isButtonEnabled).toBe(true);
  }));

  it('should return Expiring Soon macaron', inject([MacaronService], (macaronService: MacaronService) => {
    const today = new Date();
    const campaign: ICampaign = {
      id: 1,
      name: 'Reward Test',
      description: 'Reward Description',
      type: CampaignType.game,
      state: CampaignState.active,
      beginsAt: new Date(today.setHours(today.getHours() + 12)),
      endsAt: new Date(today.setHours(today.getHours() + 48))
    };
    const macaron = macaronService.getCampaignMacaron(campaign);
    expect(macaron.label).toBe('Coming Soon');
    expect(macaron.class).toBe('coming-soon');
    expect(macaron.isButtonEnabled).toBe(false);
  }));
});
