import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CampaignCreationStoreService} from '@cl-core/services/campaigns-creation-store.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ToggleControlService} from "@cl-shared/providers/toggle-control.service";

@Component({
  selector: 'cl-new-campaign-detail-page',
  templateUrl: './new-campaign-detail-page.component.html',
  styleUrls: ['./new-campaign-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignDetailPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public config: any;
  // private formChanged;
  private defaultFormValue = {
    campaignInfo: {
      disabledEndDate: false
    },
    channel: {
      type: 'weblink',
      schedule: {
        enableRecurrence: false,
        recurrence: {
          repeatOn: []
        }
      }
    }
  };

  public get campaignInfo() {
    return this.form.get('campaignInfo');
  }

  public get channel() {
    return this.form.get('channel');
  }

  public get schedule() {
    return this.form.get('channel').get('schedule');
  }

  public get recurrence() {
    return this.form.get('channel').get('schedule').get('recurrence');
  }

  public get audience() {
    return this.form.get('audience');
  }

  constructor(
    private store: CampaignCreationStoreService,
    public cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private toggleControlService: ToggleControlService
  ) {
  }

  ngOnInit() {
    this.config = this.store.config;
    this.initForm();
    this.initToggleForm();
    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe(value => {
        console.log('value', value);
        this.store.updateCampaign(value);
        this.toggleControlService.updateFormStructure();
        if (this.toggleControlService.formChanged) {
          this.updateForm();
        }
      });

    this.form.patchValue(this.defaultFormValue);
  }

  private updateForm() {
    this.form.updateValueAndValidity();
    this.cd.detectChanges();
  }

  private initForm() {
    this.form = this.fb.group({
      campaignInfo: this.fb.group({
        goal: [],
        startDate: [],
        startTime: [],
        endDate: [],
        endTime: [],
        disabledEndDate: [],
        labels: []
      }),
      channel: this.fb.group({
        type: [],
        message: [],
        schedule: this.fb.group({
          sendDate: [],
          sendTime: [],
          enableRecurrence: [],
          recurrence: this.fb.group({
            times: [],
            period: [],
            repeatOn: []
          })

        })
      }),
      audience: this.fb.group({
        type: ['none'],
        file: []
      })
    });
  }

  private initToggleForm() {
    this.toggleControlService.context = this;
    this.toggleControlService.config = [
      {
        condition: () => (this.campaignInfo.get('disabledEndDate').value === false),
        controls: [this.campaignInfo.get('endDate'), this.campaignInfo.get('endTime')],
        resetValue: true
      },
      {
        condition: () => (this.channel.get('type').value === 'sms'),
        controls: [this.channel.get('message'), this.schedule],
      },
      {
        condition: () => (this.schedule.get('enableRecurrence').value === true),
        controls: [this.recurrence],
      },
      {
        condition: () => (this.recurrence.get('period').value === 'week'),
        controls: [this.recurrence.get('repeatOn')]
      },
      {
        condition: () => (this.audience.get('type').value === 'upload'),
        controls: [this.audience.get('file')]
      },
    ]
  }

  ngOnDestroy(): void {
    this.cd.detach();
  }
}
