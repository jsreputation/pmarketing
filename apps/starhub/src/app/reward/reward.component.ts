import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IReward, RewardsService } from '@perx/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { filter, switchMap, map, take } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';

interface ITime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  public reward: IReward;
  public dateTime$: Observable<ITime[]>;
  public isExpired: boolean = false;
  public isExpiring: boolean = false;
  public isButtonDisabled: boolean = false;
  public macaronText: string = '';

  constructor(
    private location: Location,
    private router: Router,
    private rewardsService: RewardsService,
    private activeRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.id ? true : false),
        map((params: Params) => params.id),
        switchMap((id: number) => this.rewardsService.getReward(id))
      )
      .subscribe((reward: IReward) => this.reward = reward);

    const validTo = this.reward.validTo;

    if (!validTo) {
      return;
    }
    // set date 36 hours
    // const mockDate = new Date(validTo.setHours(validTo.getHours() + 36));

    // set date 10 seconds
    // const mockDate = new Date(validTo.setSeconds(validTo.getSeconds() + 15));
    const dateNow = new Date();

    const differenceTime = validTo.valueOf() - dateNow.valueOf();
    const differenceInHours = differenceTime / 1000 / 60 / 60;
    let convertedtoSeconds = differenceInHours * 3600;

    if (convertedtoSeconds <= 129600) {
      this.isExpiring = true;
      this.macaronText = 'Expiring';
      this.dateTime$ = timer(0, 1000).pipe(
        take(129600),
        map(() => {
          const time = Date.parse(String(validTo)) - Date.parse(String(new Date()));
          const seconds = Math.floor( (time / 1000) % 60 );
          const minutes = Math.floor( (time / 1000 / 60) % 60 );
          const hours = Math.floor( (time / (1000 * 60 * 60)) % 24 );
          const days = Math.floor( time / ( 1000 * 60 * 60 * 24) );

          if (Math.round(convertedtoSeconds) <= 0) {
            this.isExpired = true;
            this.macaronText = 'Expired';
            this.isButtonDisabled = true;
          }
          convertedtoSeconds--;
          return [{
            days,
            hours,
            minutes,
            seconds
          }];
        })
      );
    }
  }

  public back(): void {
    this.location.back();
  }

  public save(): void {
    this.router.navigate(['/home/vouchers']);
  }
}
