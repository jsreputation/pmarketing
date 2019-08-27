import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IReward, RewardsService } from '@perx/core';
import { Location } from '@angular/common';
import { Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

interface ITime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit {
  public dateTime$: Observable<ITime[]>;
  public showMacaron: boolean = false;
  public isExpired: boolean = false;
  public macaronText: string = '';

  @Output()
  public hasExpired: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  public rewardId: number;

  @Input()
  public showBackButton: boolean = true;

  @Input()
  public showBannerImage: boolean = true;

  public reward: IReward;

 constructor(
    private location: Location,
    private rewardsService: RewardsService
    ) {}

  public ngOnInit(): void {

    if (this.rewardId) {
      this.rewardsService.getReward(this.rewardId)
      .subscribe((reward: IReward) => {
        this.reward = reward;
      });
    }

    if (!this.reward) {
      return;
    }
    const validTo = this.reward.validTo;

    // set date 36 hours
    // const mockDate = new Date(validTo.setHours(validTo.getHours() + 36));

    // set date 10 seconds
    // const mockDate = new Date(validTo.setSeconds(validTo.getSeconds() + 15));
    const dateNow = new Date();

    const differenceTime = validTo.valueOf() - dateNow.valueOf();
    const differenceInHours = differenceTime / 1000 / 60 / 60;
    let convertedtoSeconds = differenceInHours * 3600;

    if (Math.round(convertedtoSeconds) <= 0) {
      this.setToExpired();
      return;
    }

    if (convertedtoSeconds <= 129600) {
      this.showMacaron = true;
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
            this.setToExpired();
            return;
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

  private setToExpired(): void {
    this.showMacaron = true;
    this.hasExpired.emit(true);
    this.isExpired = true;
    this.macaronText = 'Expired';
  }

  public back(): void {
    this.location.back();
  }
}
