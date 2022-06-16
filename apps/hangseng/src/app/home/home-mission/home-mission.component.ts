import { Component, Input, OnInit } from '@angular/core';
import { ICampaignCategory } from '@perxtech/core';

@Component({
  selector: 'hangseng-home-mission',
  templateUrl: './home-mission.component.html',
  styleUrls: ['./home-mission.component.scss']
})
export class HomeMissionComponent implements OnInit {
  @Input()
  public campaignCategoryChips: ICampaignCategory[] = [];


  constructor() { }

  public ngOnInit(): void {
  }
}
