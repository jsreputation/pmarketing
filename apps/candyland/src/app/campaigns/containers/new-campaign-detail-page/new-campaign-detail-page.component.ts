import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { CampaignCreationStoreService } from '@cl-core/services/campaigns-creation-store.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'cl-new-campaign-detail-page',
  templateUrl: './new-campaign-detail-page.component.html',
  styleUrls: ['./new-campaign-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignDetailPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  config: any;
  public visible = true;
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  labels = [
    {name: 'Label A'},
    {name: 'Label B'},
    {name: 'Label C'},
  ];

  private formChanged;

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
    private cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.config = this.store.config;
    this.initForm();
    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe(value => {
        this.formChanged = false;
        this.store.updateCampaign(value);
        // if (this.campaignInfo.get('disabledEndDate').value === false) {
        //   this.enableControl(this.campaignInfo.get('endDate'));
        //   this.enableControl(this.campaignInfo.get('endTime'));
        // } else {
        //   this.disableControl(this.campaignInfo.get('endDate'));
        //   this.disableControl(this.campaignInfo.get('endTime'));
        // }
        //
        // if (value.channel.type === 'sms') {
        //   this.enableControl(this.channel.get('message'));
        //   this.enableControl(this.schedule);
        //   if (this.schedule.get('enableRecurrence').value === true) {
        //     this.enableControl(this.recurrence);
        //     if (this.recurrence.get('period').value === 'week') {
        //       this.enableControl(this.recurrence.get('repeatOn'));
        //     } else {
        //       this.disableControl(this.recurrence.get('repeatOn'));
        //     }
        //   } else {
        //     this.disableControl(this.recurrence);
        //   }
        // } else {
        //   this.disableControl(this.channel.get('message'));
        //   this.disableControl(this.schedule);
        // }
        //
        // if (this.audience.get('type').value === 'upload') {
        //   this.enableControl(this.audience.get('file'));
        // } else {
        //   this.disableControl(this.audience.get('file'));
        // }
        console.log('update', value);
        this.toggleControls(
          this.campaignInfo.get('disabledEndDate').value === false,
          [this.campaignInfo.get('endDate'), this.campaignInfo.get('endTime')],
          true
        );

        this.toggleControls(
          this.channel.get('type').value === 'sms',
          [this.channel.get('message'), this.schedule]
        );

        this.toggleControls(
          this.schedule.get('enableRecurrence').value === true,
          [this.recurrence]
        );

        this.toggleControls(
          this.recurrence.get('period').value === 'week',
          [this.recurrence.get('repeatOn')]
        );

        this.toggleControls(
          this.audience.get('type').value === 'upload',
          [this.audience.get('file')]
        );

        if (this.formChanged) {
          this.updateForm();
        }
      });

    this.form.patchValue({
      campaignInfo: {
        disabledEndDate: false
      },
      channel: {
        type: 'weblink',
        schedule: {
          enableRecurrence: false,
        }
      }
    });
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

  private toggleControls(condition: boolean, controls: AbstractControl[], resetValue = false) {
    if (condition) {
      controls.forEach(control => this.enableControl(control));
    } else {
      controls.forEach(control => {
        this.disableControl(control, resetValue);
      });
    }
  }

  private enableControl(control: AbstractControl) {
    if (control.disabled && !(control.parent && control.parent.disabled)) {
      console.log(control.status);
      control.enable({emitEvent: false});
      this.formChanged = true;
    }
  }

  private disableControl(control: AbstractControl, resetValue = false) {
    if (control.enabled) {
      control.disable({emitEvent: false});
      if (resetValue) {
        control.reset(null, {emitEvent: false});
      }
      this.formChanged = true;
    }
  }

  private updateForm() {
    this.form.updateValueAndValidity();
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
  }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.labels.push({name: value.trim()});
    }

    if (input) {
      input.value = '';
    }
  }

  public remove(label): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }


}
