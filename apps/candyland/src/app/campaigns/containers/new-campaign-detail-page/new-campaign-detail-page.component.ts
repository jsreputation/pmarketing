import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CampaignCreationStoreService } from '@cl-core/services/campaigns-creation-store.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'cl-new-campaign-detail-page',
  templateUrl: './new-campaign-detail-page.component.html',
  styleUrls: ['./new-campaign-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignDetailPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public disableEnd: FormControl;
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

  public get endDate() {
    return this.form.get('campaignInfo').get('endDate');
  }

  public get endTime() {
    return this.form.get('campaignInfo').get('endTime');
  }

  public get startDate() {
    return this.form.get('campaignInfo').get('startDate');
  }

  constructor(
    private store: CampaignCreationStoreService,
    private fb: FormBuilder
  ) {
    this.initForm();
    this.disableEnd = this.fb.control([true]);
    this.config = store.config;
  }

  ngOnInit() {
    this.form.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(value => this.store.updateCampaign(value));
  }

  ngOnDestroy(): void {
  }

  public toggleEndDate(value: boolean) {
    if (value) {
      this.endDate.reset();
      this.endTime.reset();
      this.endDate.disable();
      this.endTime.disable();
    } else {
      this.endDate.enable();
      this.endTime.enable();
    }
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

  private initForm() {
    this.form = this.fb.group({
      campaignInfo: this.fb.group({
        goal: [],
        startDate: [],
        startTime: [],
        endDate: [],
        endTime: [],
        labels: []
      }),
      channel: this.fb.group({
        type: []
      })
    });
    this.form.patchValue(this.store.currentCampaign);
  }
}
