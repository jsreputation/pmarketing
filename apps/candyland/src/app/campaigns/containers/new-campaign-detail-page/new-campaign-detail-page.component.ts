import { ChangeDetectorRef, Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { AudiencesService } from '@cl-core-services';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { debounceTime, distinctUntilChanged, takeUntil, toArray } from 'rxjs/operators';
import { ToggleControlService } from '@cl-shared/providers/toggle-control.service';
import { NewCampaignDetailFormService } from 'src/app/campaigns/services/new-campaign-detail-form.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { AbstractStepWithForm } from 'src/app/campaigns/step-page-with-form';
import { ActivatedRoute } from '@angular/router';
import { ICampaign } from '@cl-core/models/campaign/campaign';
import { Subject, range } from 'rxjs';
import Utils from '@cl-helpers/utils';

@Component({
  selector: 'cl-new-campaign-detail-page',
  templateUrl: './new-campaign-detail-page.component.html',
  styleUrls: ['./new-campaign-detail-page.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignDetailPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  public form: FormGroup;
  public config: any;
  public isFirstInit: boolean;
  public triggerLabelsChip: boolean;
  public campaignId: string;
  public audienceFiltersEnabled = false;
  protected destroy$: Subject<void> = new Subject();

  @Input()
  public pools: any;

  public get ageRange() {
    return range(1, 100).pipe(toArray());
  }

  public get campaignInfo(): AbstractControl | null {
    return this.form.get('campaignInfo');
  }

  public get channel(): AbstractControl | null {
    return this.form.get('channel');
  }

  public get channelType(): AbstractControl | null {
    return this.form.get('channel.type');
  }

  public get message(): AbstractControl | null {
    return this.form.get('channel.message');
  }

  public get schedule(): AbstractControl | null {
    return this.form.get('channel.schedule');
  }

  public get scheduleSendDate(): AbstractControl | null {
    return this.form.get('channel.schedule.sendDate');
  }

  public get recurrence(): AbstractControl | null {
    return this.form.get('channel.schedule.recurrence');
  }

  public get audience(): AbstractControl | null {
    return this.form.get('audience');
  }

  public get filters(): FormGroup | null {
    return this.form.get('audience.filters') as FormGroup;
  }

  public get ages(): FormArray | null {
    return this.form.get('audience.filters.ages') as FormArray;
  }

  public get pool(): AbstractControl | null {
    return this.form.get('audience.select');
  }

  public get datenow(): Date {
    return new Date();
  }

  constructor(
    public store: CampaignCreationStoreService,
    public stepConditionService: StepConditionService,
    private audiencesService: AudiencesService,
    private newCampaignDetailFormService: NewCampaignDetailFormService,
    public cd: ChangeDetectorRef,
    private toggleControlService: ToggleControlService,
    private route: ActivatedRoute
  ) {
    super(2, store, stepConditionService);
    this.initForm();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.channelType.valueChanges
      .pipe(takeUntil(this.destroy$)).subscribe(value => {
        if (value === 'sms') {
          this.pool.setValidators([Validators.required]);
          this.message.setValidators([Validators.required]);
          this.scheduleSendDate.setValidators([Validators.required]);
        } else {
          this.pool.setValidators(null);
          this.message.setValidators(null);
          this.scheduleSendDate.setValidators(null);
        }
        this.pool.updateValueAndValidity();
        this.message.updateValueAndValidity();
        this.scheduleSendDate.updateValueAndValidity();
      });

    this.campaignId = this.route.snapshot.params.id;
    this.isFirstInit = true;
    this.initPools();
    this.initData();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.cd.detach();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.form = this.newCampaignDetailFormService.getForm();
  }

  private initData(): void {
    if (!this.form) {
      return;
    }
    this.form.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(Utils.isEqual),
        takeUntil(this.destroy$)
      )
      .subscribe((val: ICampaign) => {
        this.store.updateCampaign(val);
        const toggleConfig = this.newCampaignDetailFormService.getToggleConfig(this.form);
        this.toggleControlService.updateFormStructure(toggleConfig);
        if (this.toggleControlService.formChanged) {
          this.updateForm();
        }
      });

    if (this.campaignId) {
      this.store.currentCampaign$
        .asObservable()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: ICampaign) => {
          if (data && data.campaignInfo && this.isFirstInit) {
            const select = data.audience.select;
            data.audience = { ...data.audience, select };
            this.form.patchValue(data);
            if (data.campaignInfo.labels) {
              this.triggerLabelsChip = true;
            }
            this.isFirstInit = false;
          }
        });
    } else {
      this.form.patchValue(this.newCampaignDetailFormService.getDefaultValue());
    }
  }

  private updateForm(): void {
    this.form.updateValueAndValidity();
    this.cd.detectChanges();
  }

  private initPools(): any {
    this.audiencesService.getAudiencesList()
      .subscribe((data: any) => {
        this.pools = data;
      });
  }

  public addAge(): void {
    this.ages.push(this.newCampaignDetailFormService.createAge());
  }
}
