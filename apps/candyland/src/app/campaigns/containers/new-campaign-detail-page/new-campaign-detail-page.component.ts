import { ChangeDetectorRef, Component, OnDestroy, OnInit, Input } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { AudiencesService } from '@cl-core-services';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ToggleControlService } from '@cl-shared/providers/toggle-control.service';
import { NewCampaignDetailFormService } from 'src/app/campaigns/services/new-campaign-detail-form.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { AbstractStepWithForm } from 'src/app/campaigns/step-page-with-form';
import { ActivatedRoute } from '@angular/router';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';

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
  @Input()
  public pools: any;

  public get campaignInfo(): AbstractControl | null {
    return this.form.get('campaignInfo');
  }

  public get channel(): AbstractControl | null {
    return this.form.get('channel');
  }

  public get channelType(): AbstractControl | null {
    return this.form.get('channel').get('type');
  }

  public get schedule(): AbstractControl | null {
    return this.form.get('channel.schedule');
  }

  public get recurrence(): AbstractControl | null {
    return this.form.get('channel.schedule.recurrence');
  }

  public get audience(): AbstractControl | null {
    return this.form.get('audience');
  }

  public get pool(): AbstractControl | null {
    return this.form.get('audience').get('select');
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
    super(2, store, stepConditionService, cd);
    this.initForm();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.channelType.valueChanges.subscribe(
      value => {
        if (value === 'sms') {
          this.pool.setValidators([Validators.required]);
        } else {
          this.pool.setValidators(null);
        }
        this.pool.updateValueAndValidity();
      }
    );

    this.campaignId = this.route.snapshot.params.id;
    this.isFirstInit = true;
    this.initPools();
    this.initData();
  }

  public ngOnDestroy(): void {
  }

  private initForm(): void {
    this.form = this.newCampaignDetailFormService.getForm();
  }

  private initData(): void {
    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        debounceTime(500)
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
        .pipe(untilDestroyed(this))
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
}
