import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICampaignCategory } from '@perxtech/core';

@Component({
  selector: 'hangseng-home-mission',
  templateUrl: './home-mission.component.html',
  styleUrls: ['./home-mission.component.scss']
})
export class HomeMissionComponent implements OnInit {
  @Input()
  public campaignCategoryChips: ICampaignCategory[] = [];
  @Input()
  selected: ICampaignCategory;

  @Output()
  eventItemClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  public ngOnInit(): void {
  }
}
