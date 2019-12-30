import { OnDestroy, OnInit, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CampaignCreationStoreService, ICampaignConfig } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { ICampaign } from '@cl-core/models/campaign/campaign';
import Utils from '@cl-helpers/utils';
import { CampaignChannelsLaunchType } from './models/campaign-channels-launch-type.enum';

export class AbstractStepWithForm implements OnInit, OnDestroy {
  protected destroy$: Subject<void> = new Subject();

  public form: FormGroup;
  public config: ICampaignConfig;
  public campaign: ICampaign;
  public launchType: typeof CampaignChannelsLaunchType = CampaignChannelsLaunchType;
  constructor(
    public stepIndex: number,
    public store: CampaignCreationStoreService,
    @Optional() public stepConditionService: StepConditionService,
  ) {
  }

  public ngOnInit(): void {
    this.config = this.store.config;
    this.store.currentCampaign$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => this.campaign = data
      );

    if (this.stepIndex !== undefined && this.stepConditionService && this.form) {
      this.stepConditionService.registerStepCondition(this.stepIndex, this.form);
    }
  }

  public checkSmsExist(): boolean {
    if (!this.campaign || !this.campaign.notification) {
      return false;
    }
    return Object.keys(this.campaign.notification)
      .some((key: string) => {
        if (this.campaign.notification[key] && Utils.isArray(this.campaign.notification[key])) {
          return this.campaign.notification[key].length;
        }
        return false;
      });
  }

  public getSendType(data: string): string {
    if (!data) {
      return '';
    }
    switch (data) {
      case this.launchType.launchDate: {
        return 'CAMPAIGN.CAMPAIGN_LAUNCH_DATE_AND_TIME';
      }
      case this.launchType.usersDateBirth: {
        return 'CAMPAIGN.USER_DATE_OF_BIRTH';
      }
      case this.launchType.usersMonthBirth: {
        return 'CAMPAIGN.USER_MONTH_OF_BIRTH';
      }
    }
    return data;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
