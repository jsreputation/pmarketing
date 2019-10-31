import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-campaign-not-completed-form-group',
  templateUrl: './campaign-not-completed-form-group.component.html',
  styleUrls: ['./campaign-not-completed-form-group.component.scss']
})
export class CampaignNotCompletedFormGroupComponent {
  @Input() public group: FormGroup;
  @Input() public index: number;
  @Output() public deleteGroup: EventEmitter<number> = new EventEmitter<number>();

}
