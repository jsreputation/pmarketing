import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RewardsService } from '@cl-core/services';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'cl-edit-reward',
  templateUrl: './edit-reward.component.html',
  styleUrls: ['./edit-reward.component.scss']
})
export class EditRewardComponent implements OnInit {
  public reward$: Observable<Reward>;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private rewardsService: RewardsService) { }

  public ngOnInit(): void {
    this.reward$ = this.route.paramMap
      .pipe(
        switchMap((paramMap: ParamMap) => this.rewardsService.getSingleReward(+paramMap.get('id')))
      );
      // .subscribe(res => {
      //   console.log('for patch', res);
      // });
  }
  public handlerCancel(): void {
    this.router.navigateByUrl('/rewards');
  }
  // TODO: passed data variable it is present data from reward form
  public handlerSave(): void {
    // this.router.navigateByUrl('/rewards');
  }

}
