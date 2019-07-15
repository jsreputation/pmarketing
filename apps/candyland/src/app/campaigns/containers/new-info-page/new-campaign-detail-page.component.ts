import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CampaignCreationStoreService} from "@cl-core/services/campaigns-creation-store.service";

@Component({
  selector: 'cl-new-campaign-detail-page',
  templateUrl: './new-campaign-detail-page.component.html',
  styleUrls: ['./new-campaign-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignDetailPageComponent implements OnInit {
  days: OptionConfig[] = [
    {
      title: 'S',
      value: 'sunday'
    },
    {
      title: 'M',
      value: 'monday'
    },
    {
      title: 'T',
      value: 'tuesday'
    },
    {
      title: 'W',
      value: 'wednesday'
    },
    {
      title: 'T',
      value: 'thursday'
    },
    {
      title: 'F',
      value: 'friday'
    },
    {
      title: 'S',
      value: 'Saturday'
    },
  ];

  form: FormGroup;
  disableEnd = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  labels = [
    {name: 'Label A'},
    {name: 'Label B'},
    {name: 'Label C'},
  ];

  constructor(
    private store: CampaignCreationStoreService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(value => this.store.updateCampaign(value));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.labels.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(label): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }

  private initForm() {
    // this.rewardsForm = new FormGroup({
    //   endDate: new FormControl(null, []),
    //   endTime: new FormControl(null, [])
    // });

    this.form = this.fb.group({
      campaignInfo: this.fb.group({
        goal: [],
        startDate: [],
        startTime: [],
        endDate: [{value: null, disabled: this.disableEnd}],
        endTime: [{value: null, disabled: this.disableEnd}],
        labels: []
      }),
      // rewards: this.fb.array([{
      //   value: null,
      //   propability: 0
      // }]),
      // limits: this.fb.group({
      //   times: [null, [
      //     Validators.required,
      //     Validators.minLength(1),
      //     Validators.maxLength(60)
      //   ]],
      //   duration: [null, [
      //     Validators.required,
      //     Validators.minLength(1),
      //     Validators.maxLength(60)
      //   ]]
      // })
    });
    this.form.patchValue(this.store.currentCampaign);
  }

  get endDate(){
    return this.form.get('campaignInfo').get('endDate');
  }

  get startDate(){
    return this.form.get('campaignInfo').get('startDate');
  }



}
