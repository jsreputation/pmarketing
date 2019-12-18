import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CampaignChannelsLaunchType } from '../../models/campaign-channels-launch-type.enum';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';

@Component({
  selector: 'cl-campaign-launch-message',
  templateUrl: './campaign-launch-message.component.html',
  styleUrls: ['./campaign-launch-message.component.scss']
})
export class CampaignLaunchMessageComponent {
  @Input() public group: FormGroup;
  @Input() public campaign: ICampaign;
  @Input() public shortCodes: any[];
  @Input() public index: number;
  @Output() public deleteGroup: EventEmitter<number> = new EventEmitter<number>();
  @Output() public sendSms: EventEmitter<any> = new EventEmitter();
  public launchType: typeof CampaignChannelsLaunchType = CampaignChannelsLaunchType;

  public get monthDay(): AbstractControl {
    return this.group.get('monthDay');
  }

  public get birthdayTime(): AbstractControl {
    return this.group.get('birthdayTime');
  }

  public getSentType(): FormControl {
    return (this.group.get('sentType') as FormControl);
  }

  public compareType(type: string): boolean {
    return this.getSentType().value === type;
  }

  public sendTestSms(): void {
    this.sendSms.emit({group: this.group, index: this.index});
  }

  public deleteLaunchGroup(): void {
    this.deleteGroup.emit(this.index);
  }

  public changeValueTime(type: string): void {
    this.handlerGroupValidation(type);
    this.resetTimeValue();
    if (type === this.launchType.launchDate) {
      this.group.get('launchDateTime').patchValue(this.campaign.campaignInfo.startTime);
    }
    this.group.markAsUntouched();
  }

  private resetTimeValue(): void {
    this.group.get('birthdayTime').reset();
    this.group.get('launchDateTime').reset();
    this.group.get('monthDay').reset();
  }

  private handlerGroupValidation(type: string): void {
    switch (type) {
      case this.launchType.launchDate: {
        this.group.get('monthDay').clearValidators();
        this.group.get('birthdayTime').clearValidators();
        this.group.get('launchDateTime').setValidators([Validators.required]);
        break;
      }

      case this.launchType.usersDateBirth: {
        this.group.get('monthDay').clearValidators();
        this.group.get('birthdayTime').setValidators([Validators.required]);
        this.group.get('launchDateTime').clearValidators();
        break;
      }

      case this.launchType.usersMonthBirth: {
        this.group.get('monthDay').setValidators([Validators.required, Validators.min(1), Validators.max(31)]);
        this.group.get('birthdayTime').setValidators([Validators.required]);
        this.group.get('launchDateTime').clearValidators();
        break;
      }
    }
    this.group.updateValueAndValidity();
  }
}
