import { ChangeDetectorRef, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';

export class AbstractStepWithForm implements OnInit, OnDestroy {
  public destroy$: Subject<any> = new Subject();

  public form: FormGroup;
  public config: any;
  public campaign: any;

  constructor(
    public stepIndex: number,
    public store: CampaignCreationStoreService,
    @Optional() public stepConditionService: StepConditionService,
    public cd: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.config = this.store.config;
    this.store.currentCampaign$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.campaign = data;
        this.cd.detectChanges();
      });

    if (this.stepIndex !== undefined && this.stepConditionService && this.form) {
      this.stepConditionService.registerStepCondition(this.stepIndex, this.form);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
