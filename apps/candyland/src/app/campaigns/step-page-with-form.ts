import { OnDestroy, OnInit, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CampaignCreationStoreService, ICampaignConfig } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';

export class AbstractStepWithForm implements OnInit, OnDestroy {
  protected destroy$: Subject<void> = new Subject();

  public form: FormGroup;
  public config: ICampaignConfig;
  public campaign: ICampaign;

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
      .subscribe(data => this.campaign = data);

    if (this.stepIndex !== undefined && this.stepConditionService && this.form) {
      this.stepConditionService.registerStepCondition(this.stepIndex, this.form);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
