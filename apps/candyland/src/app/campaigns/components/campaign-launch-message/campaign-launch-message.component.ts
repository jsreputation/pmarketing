import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CampaignChannelsLaunchType } from '../../models/campaign-channels-launch-type.enum';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';

@Component({
  selector: 'cl-campaign-launch-message',
  templateUrl: './campaign-launch-message.component.html',
  styleUrls: ['./campaign-launch-message.component.scss']
})
export class CampaignLaunchMessageComponent   {
  @Input() public group: FormGroup;
  @Input() public campaign: ICampaign;
  @Input() public shortCodes: any[];
  @Input() public index: number;
  @Output() public deleteGroup: EventEmitter<number> = new EventEmitter<number>();
  public launchType: typeof CampaignChannelsLaunchType = CampaignChannelsLaunchType;

  public getSentType(): FormControl {
    return (this.group.get('sentType') as FormControl);
  }

  public compareType(type: string): boolean {
    return this.getSentType().value === type;
  }

  public sendTestSms(): void {
    console.log('sendTestSms');
  }

  public deleteLaunchGroup(): void {
    this.deleteGroup.emit(this.index);
  }
}
