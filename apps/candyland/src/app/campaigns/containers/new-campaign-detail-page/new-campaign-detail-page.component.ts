import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CampaignCreationStoreService } from '@cl-core/services/campaigns-creation-store.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ToggleControlService } from '@cl-shared/providers/toggle-control.service';
import { NewCampaignDetailFormService } from 'src/app/campaigns/services/new-campaign-detail-form.service';

@Component({
  selector: 'cl-new-campaign-detail-page',
  templateUrl: './new-campaign-detail-page.component.html',
  styleUrls: ['./new-campaign-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignDetailPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public config: any;

  public get campaignInfo() {
    return this.form.get('campaignInfo');
  }

  public get channel() {
    return this.form.get('channel');
  }

  public get schedule() {
    return this.form.get('channel.schedule');
  }

  public get recurrence() {
    return this.form.get('channel.schedule.recurrence');
  }

  public get audience() {
    return this.form.get('audience');
  }

  constructor(
    private store: CampaignCreationStoreService,
    private newCampaignDetailFormService: NewCampaignDetailFormService,
    public cd: ChangeDetectorRef,
    private toggleControlService: ToggleControlService
  ) {
  }

  ngOnInit() {
    this.config = this.store.config;
    this.initForm();
  }

  private initForm() {
    this.form = this.newCampaignDetailFormService.getForm();
    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe(() => {
        const toggleConfig = this.newCampaignDetailFormService.getToggleConfig(this.form);
        this.toggleControlService.updateFormStructure(toggleConfig);
        if (this.toggleControlService.formChanged) {
          this.updateForm();
        }
      });
    this.form.patchValue(this.newCampaignDetailFormService.getDefaultValue());
  }

  private updateForm() {
    this.form.updateValueAndValidity();
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.cd.detach();
  }
}
