import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, ConfigService, IConfig, IFlags, ILoyalty, IProfile, IStatisticCardConfig } from '@perxtech/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'dbshk-agent-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public appConfig: IConfig<void>;
  public appRemoteFlags: IFlags;
  public subTitleFn: (loyalty: ILoyalty) => Observable<string>;
  public titleFn: (profile: IProfile) => Observable<string>;
  public summaryExpiringFn: () => Observable<string>;
  public pointToFn: () => Observable<string>;
  public memberFn: () => Observable<string>;
  public membershipExpiryFn: (loyalty: ILoyalty) => Observable<string>;
  public inviteStatistics: IStatisticCardConfig;
  public performanceStatistics: IStatisticCardConfig;

  constructor(protected authService: AuthenticationService, protected configService: ConfigService, protected datePipe: DatePipe) {

    this.inviteStatistics = {
      cardTitle: 'Your invites', statistics: [{
        statisticTitle: 'Total Invites',
        value: 123,
        unit: 'invites'
      }]
    };

    this.performanceStatistics = {
      cardTitle: 'Performance by Campaign', statistics: [{
        statisticTitle: 'Mission 1',
        value: 456,
        unit: 'completed units',
        unitBeforeValue: true
      },
      {
        statisticTitle: 'Mission 2',
        value: 789,
        unit: 'completed units'
      }]
    };
  }

  public ngOnInit(): void {
    this.configService
      .readAppConfig<void>()
      .pipe(
        tap((config: IConfig<void>) => {
          this.authService.isAuthorized().subscribe((isAuth: boolean) => {
            if (isAuth && !this.configService.readAppStarted()) {
              this.configService.setAppStarted();
              this.subTitleFn = (loyalty: ILoyalty) =>
                of(`${this.datePipe.transform(
                  loyalty.endDate,
                  'mediumDate'
                )}`);
            }
          });
          this.appConfig = config;
        })
      )
      .subscribe(
        (flags: IFlags) => {
          // todo: create a function to wrap all the rest of the init calls
          this.appRemoteFlags = flags;
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
