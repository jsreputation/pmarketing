import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToggleControlConfig } from 'src/app/core/models/toggle-control-config.interface';
import * as moment from 'moment';

@Injectable()
export class NewCampaignDetailFormService {
  constructor(private fb: FormBuilder) {
  }
//tslint:disable
  //TODO: need use momentJs for date handler
  public getForm(): FormGroup {
    return this.fb.group({
      campaignInfo: this.fb.group({
        goal: ['Acquire customers', [Validators.required]],
        startDate: [null, [Validators.required]],
        startTime: [null, [Validators.required]],
        endDate: [null, [Validators.required]],
        endTime: [null, [Validators.required]],
        disabledEndDate: [false],
        labels: [],
        informationCollectionSetting: ['not_required'],
      }),
      channel: this.fb.group({
        eventId: [],
        templateId: [],
        type: ['weblink', [Validators.required]],
        message: [],
        schedule: this.fb.group({
          sendDate: [],
          sendTime: [],
          // enableRecurrence: [],
          // recurrence: this.fb.group({
          //   times: [],
          //   period: [],
          //   repeatOn: []
          // })
        })
      }),
      audience: this.fb.group({
        type: ['select'],
        file: [],
        select: []
      })
    });
  }

  public getToggleConfig(form: FormGroup): ToggleControlConfig[] {
    return [
      {
        condition: form.get('campaignInfo.disabledEndDate').value === false,
        controls: [form.get('campaignInfo.endDate'), form.get('campaignInfo.endTime')],
        resetValue: true
      },
      {
        condition: form.get('channel.type').value === 'sms',
        controls: [form.get('channel.message'), form.get('channel.schedule')]
      },
      {
        condition: form.get('channel.type').value === 'weblink',
        controls: [form.get('campaignInfo.informationCollectionSetting')]
      },
      // {
      //   condition: form.get('channel.schedule.enableRecurrence').value === true,
      //   controls: [form.get('channel.schedule.recurrence')]
      // },
      // {
      //   condition: form.get('channel.schedule.enableRecurrence').value === true,
      //   controls: [form.get('channel.schedule.recurrence')]
      // },
      // {
      //   condition: form.get('channel.schedule.recurrence.period').value === 'week',
      //   controls: [form.get('channel.schedule.recurrence.repeatOn')]
      // },
      {
        condition: form.get('audience.type').value === 'upload',
        controls: [form.get('audience.file')]
      },
      {
        condition: form.get('audience.type').value === 'select',
        controls: [form.get('audience.select')]
      }
    ];
  }

  public getDefaultValue(): { [key: string]: any } {
    return {
      campaignInfo: {
        startTime: moment().format('LT'),
        startDate: new Date(),
        goal: 'Acquire customers',
        disabledEndDate: true
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
  }
}
