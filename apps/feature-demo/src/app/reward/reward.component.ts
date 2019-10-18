import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RewardsService, NotificationService, IVoucherService } from '@perx/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { IReward } from '@perx/core';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  public reward$: Observable<IReward>;
  public isButtonEnable: boolean = true;

  constructor(
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private rewardsService: RewardsService,
    private vouchersService: IVoucherService,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.reward$ = this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.id), // ignore anything not related to reward id
        map((params: Params) => params.id), // get reward id
        switchMap((id: number) => this.rewardsService.getReward(id)) // get the full reward information
      );

    this.reward$.subscribe((reward: IReward) => {
      // if there is no more personnal inventory for this user disable the button
      if (reward.inventory && reward.inventory.rewardLimitPerUserBalance === 0) {
        this.isButtonEnable = false;
      }
    });
  }

  public back(): void {
    this.location.back();
  }

  public save(reward: IReward): void {
    this.vouchersService.issueReward(reward.id)
      .subscribe(
        () => this.router.navigate(['/home/vouchers']),
        () => this.notificationService.addSnack('Sorry! Could not save reward.')
      );
  }

  public setButton(isEnable: boolean): void {
    this.isButtonEnable = isEnable && this.isButtonEnable;
  }
}
