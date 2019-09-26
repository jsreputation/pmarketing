import { ChangeDetectorRef, Component, OnDestroy, OnInit, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AudiencesService } from '@cl-core-services';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ToggleControlService } from '@cl-shared/providers/toggle-control.service';
import { NewCampaignDetailFormService } from 'src/app/campaigns/services/new-campaign-detail-form.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { AbstractStepWithForm } from 'src/app/campaigns/step-page-with-form';

@Component({
  selector: 'cl-new-campaign-detail-page',
  templateUrl: './new-campaign-detail-page.component.html',
  styleUrls: ['./new-campaign-detail-page.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignDetailPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  public form: FormGroup;
  public config: any;
  @Input()
  public campaignDetail;
  public pools;

  public get campaignInfo(): AbstractControl | null {
    return this.form.get('campaignInfo');
  }

  public get channel(): AbstractControl | null {
    return this.form.get('channel');
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

  constructor(
    public store: CampaignCreationStoreService,
    public stepConditionService: StepConditionService,
    private audiencesService: AudiencesService,
    private newCampaignDetailFormService: NewCampaignDetailFormService,
    public cd: ChangeDetectorRef,
    private toggleControlService: ToggleControlService
  ) {
    super(2, store, stepConditionService, cd);
    this.initForm();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.initPools();
  }

  public ngOnDestroy(): void {
  }

  private initForm(): void {
    this.form = this.newCampaignDetailFormService.getForm();
    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe((val) => {
        this.store.updateCampaign(val);
        const toggleConfig = this.newCampaignDetailFormService.getToggleConfig(this.form);
        this.toggleControlService.updateFormStructure(toggleConfig);
        if (this.toggleControlService.formChanged) {
          this.updateForm();
        }
      });
    if (this.campaignDetail) {
      this.form.patchValue({});
    } else {
      this.form.patchValue(this.newCampaignDetailFormService.getDefaultValue());
    }
  }

  private updateForm(): void {
    this.form.updateValueAndValidity();
    this.cd.detectChanges();
  }

  private initPools(): any {
    const params: HttpParamsOptions = {
      'page[number]': '1',
      'page[size]': '20'
    };
    this.audiencesService.getAudiencesList(params)
      .subscribe((data: any) => {
        this.pools = data;
      });
  }
}
