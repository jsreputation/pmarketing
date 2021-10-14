import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perxtech/core';

@Component({
  selector: 'bdo-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})

export class SearchComponent implements OnInit {
  public searchValue = '';
  public searchResult: IReward[] = [];
  constructor(private activeRoute: ActivatedRoute, private rewardsService: RewardsService) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((param) => {
      this.searchValue = param.text;
      this.rewardsService.searchRewards(this.searchValue).subscribe(rewards=>{
        this.searchResult = rewards;
      })
    });
  }
}
