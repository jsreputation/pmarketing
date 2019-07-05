import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  title = 'Congratulations!';
  subTitle = 'You just won a reward from us.';

  rewardName: string;
  rewardImgUrl: string;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.rewardName = params.get('rewardName');
      this.rewardImgUrl = params.get('rewardImg');
    });
  }
}
