import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'cl-review-campaign',
  templateUrl: './review-campaign.component.html',
  styleUrls: ['./review-campaign.component.scss']
})
export class ReviewCampaignComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public campaign;
  private temp = {
    campaignInfo: {
      goal: 'Acquire customers',
      startDate: '2019-08-15T05:50:59.383Z',
      startTime: '8:50 AM',
      endDate: null,
      endTime: null,
      disabledEndDate: true,
      labels: null
    },
    channel: {
      type: 'weblink',
      message: null,
      schedule: {
        sendDate: null,
        sendTime: null,
        enableRecurrence: false,
        recurrence: {times: null, period: null, repeatOn: []}
      }
    },
    audience: {type: 'none', file: null},
    template: {
      id: 324,
      name: 'caffrghe',
      status: 'pending',
      type: 'Stamp',
      image: '/assets/images/pinata-preview.png',
      begin: '2018-12-17 03:24:00',
      end: '2019-12-17 03:24:00',
      payload: {
        name: 'Stamps 1',
        headlineMessage: 'Collect stamps',
        subHeadlineMessage: 'Earn rewards!',
        stampsNumber: '10',
        stampsSlotNumber: ['2', '4', '6', '8', '10'],
        preStamp: {
          id: 1,
          type: 'pre-stamp-1',
          title: 'icon',
          img: 'assets/images/stamps/pre-stamps/pre-stamp-1.png',
          format: '.png',
          active: 'false'
        },
        rewardPreStamps: {
          id: 1,
          type: 'reward-pre-stamp-1',
          title: 'icon',
          img: 'assets/images/stamps/reward-pre-stamps/reward-pre-stamp-1.png',
          format: '.png',
          active: 'false'
        },
        postStamps: {
          id: 1,
          type: 'post-stamp-1',
          title: 'icon',
          img: 'assets/images/stamps/post-stamps/post-stamp-1.png',
          format: '.png',
          active: 'false'
        },
        rewardPostStamps: {
          id: 1,
          type: 'reward-post-stamp-1',
          title: 'icon',
          img: 'assets/images/stamps/reward-post-stamps/reward-post-stamp-1.png',
          format: '.png',
          active: 'false'
        },
        cardBackground: {
          id: 1,
          type: 'card-bg-1',
          title: 'icon',
          img: 'assets/images/stamps/card-background/card-bg-1.png',
          format: '.png',
          active: 'false'
        },
        background: {
          id: 1,
          type: 'bg-1',
          title: 'icon',
          img: 'assets/images/stamps/background/stamp-bg-1.png',
          format: '.png',
          active: 'false'
        },
        buttonText: 'see my rewards'
      }
    },
    rewardsList: [{
      stampSlotNumber: 2,
      rewardsOptions: {
        enableProbability: true,
        rewards: [{value: null, probability: 5}, {
          value: {
            id: 1,
            image: 'assets/images/mask-group.png',
            name: 'Free Coffee',
            type: 'Starbucks',
            current: 500,
            total: 1000
          }, probability: 20
        }, {
          value: {
            id: 2,
            image: 'assets/images/mask-group.png',
            name: 'Free Coffee 2',
            type: 'Starbucks',
            current: 500,
            total: 800
          }, probability: 43
        }]
      }
    }, {
      stampSlotNumber: 4,
      rewardsOptions: {
        enableProbability: false,
        rewards: [{
          value: {
            id: 1,
            image: 'assets/images/mask-group.png',
            name: 'Free Coffee',
            type: 'Starbucks',
            current: 500,
            total: 1000
          }
        }, {
          value: {
            id: 2,
            image: 'assets/images/mask-group.png',
            name: 'Free Coffee 2',
            type: 'Starbucks',
            current: 500,
            total: 800
          }
        }]
      }
    }, {
      stampSlotNumber: '6',
      rewardsOptions: {
        enableProbability: false,
        rewards: [{
          value: {
            id: 1,
            image: '/assets/images/mask-group.png',
            name: 'Free Coffee',
            type: 'Starbucks',
            category: 'Food & Beverage',
            begin: '2018-12-17T01:24:00.000Z',
            end: '2019-12-17T01:24:00.000Z',
            current: 500,
            total: 1000,
            price: '',
            description: '',
            termsCondition: ''
          }
        }]
      }
    }, {
      stampSlotNumber: '8',
      rewardsOptions: {
        enableProbability: false,
        rewards: [{
          value: {
            id: 3,
            image: '/assets/images/mask-group.png',
            name: 'Free Coke',
            type: 'Starbucks',
            category: 'Food & Beverage',
            begin: '2018-12-17T01:24:00.000Z',
            end: '2019-12-17T01:24:00.000Z',
            current: 500,
            total: 1000,
            price: '',
            description: '',
            termsCondition: ''
          }
        }]
      }
    }, {stampSlotNumber: '10', rewardsOptions: []}],
    stampsRule: {
      sequence: true,
      rules: [{ruleType: 'Referral'}, {ruleType: 'First login'}, {
        ruleType: 'transaction',
        condition: {rule: 'isMoreThan', value: 54}
      },
        {ruleType: 'Bill payment'},
        {ruleType: 'Reward redeemed'},
        {ruleType: 'Sign up'},
        {ruleType: 'Bill payment'},
        {ruleType: 'Sign up'},
        {
        ruleType: 'review',
        product: 'productB'
      }, {ruleType: 'transaction', condition: {rule: 'isMoreThan', value: 47}}]
    },
    limits: {
      enableStampCard: true,
      stampCard: {perCampaign: null, perUser: null, duration: null},
      enableStamp: true,
      stamp: {perUser: null, duration: null}
    },
    enableStampCardsValidity: null,
    stampCardsValidity: {times: null, duration: null}
  };

  constructor(private fb: FormBuilder,
              private store: CampaignCreationStoreService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  public get name(): AbstractControl {
    return this.form.get('name');
  }

  public ngOnInit(): void {
    this.store.currentCampaign$
      .asObservable()
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        this.campaign = data;
      });
    this.initForm();
    this.getIdCampaign();
    this.store.updateCampaign(this.temp);
  }

  public comeBack(): void {
    this.router.navigateByUrl('/campaigns');
  }

  public ngOnDestroy(): void {
  }
  // TODO: it need for get right data from back end in the future
  private getIdCampaign(): void {
    this.route.paramMap
      .pipe(untilDestroyed(this))
      .subscribe((param: ParamMap) => {
        console.log(param.get('id'));
      });
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [{value: 'caffrghe', disabled: true, }]
    });
  }

}
