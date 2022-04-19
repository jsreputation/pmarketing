import { Component, OnInit } from '@angular/core';
import { ICampaignService, ICampaignCategory } from '@perxtech/core';

@Component({
  selector: 'hangseng-home-mission',
  templateUrl: './home-mission.component.html',
  styleUrls: ['./home-mission.component.scss']
})
export class HomeMissionComponent implements OnInit {
  public campaignCategoryChips: ICampaignCategory[] = [];

  constructor(private campaignService: ICampaignService) { }

  public ngOnInit(): void {
    this.campaignService.getCategories().subscribe((res) => {
      console.log('getCategories: ', res);
      this.campaignCategoryChips = res;
    });
  }
}
