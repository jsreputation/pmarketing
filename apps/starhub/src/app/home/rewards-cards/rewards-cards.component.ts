import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {
  ConfigService,
  IReward,
  RewardsService,
  IConfig,
  IFlags,
  SettingsService,
  IOperatingHours
} from '@perxtech/core';
import {
  forkJoin,
  Observable,
  of
} from 'rxjs';
import {
  IMacaron,
  MacaronService
} from '../../services/macaron.service';
import {
  finalize,
  map,
  tap
} from 'rxjs/operators';
import { trigger } from '@angular/animations';
import {
  fadeIn,
  fadeOut
} from '../../utils/fade-animations';
import { IStarhubConfig } from '../home/home.component';

const REQ_PAGE_SIZE: number = 20;

@Component({
  selector: 'app-rewards-cards',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn())
  ],
  templateUrl: './rewards-cards.component.html',
  styleUrls: [ './rewards-cards.component.scss' ]
})
export class RewardsCardsComponent implements OnInit {
  private currentRewardsSnappingPage: number = 0;
  private currentRewardsFeaturedPage: number = 0;

  // bools set to public so that unit tests can manipulate them
  public rewardsSnappingCompleted: boolean = false;
  public rewardsFeaturedCompleted: boolean = false;
  public rewardsSnapping$: Observable<IReward[]>;
  public rewardsFeatured$: Observable<IReward[]>;
  public ghostRewardsSnapping: any[] = new Array(3); // 3 to cover screen width while loading
  public ghostRewardsFeatured: any[] = new Array(3); // 3 to cover screen width while loading
  public showOperatingHours: boolean = false;

  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();
  public showAllSnappingSaturdayItems: boolean;

  constructor(
    private rewardsService: RewardsService,
    private macaronService: MacaronService,
    private configService: ConfigService,
    private settingsService: SettingsService
  ) {
  }

  public ngOnInit(): void {
    this.configService.readAppConfig<IStarhubConfig>().subscribe(
      (config: IConfig<IStarhubConfig>) => {
        this.showAllSnappingSaturdayItems = config.custom ? config.custom.showAllSnappingSaturdayItems : false;
        this.initRewards();
    });
    this.settingsService.getRemoteFlagsSettings().subscribe(
      (flags: IFlags) => {
        this.showOperatingHours = flags.showHappyHourOperatingHours ? flags.showHappyHourOperatingHours : false;
      }
    );
  }

  private initRewards(): void {
    this.getRewardsSnapping().subscribe((rewards: IReward[]) => {
      this.rewardsSnapping$ = of(rewards);
    });
    this.getRewardsFeatured().subscribe((rewards: IReward[]) => {
      this.rewardsFeatured$ = of(rewards);
    });
  }

  private sortRewards(rewards: IReward[]): IReward[] {
    return rewards.sort((a: IReward, b: IReward) => {
      if (! a.sellingFrom) {
        return 1;
      }
      if (! b.sellingFrom) {
        return -1;
      }
      return a.sellingFrom.getTime() - b.sellingFrom.getTime();
    });
  }

  public getMacaron(reward: IReward): IMacaron | null {
    return this.macaronService.getMacaron(reward);
  }

  public selected(reward: IReward): void {
    this.tapped.emit(reward);
  }

  public getRewardsSnapping(): Observable<IReward[]> {
    if (this.rewardsSnappingCompleted) {
      return of([]);
    }
    this.currentRewardsSnappingPage++;
    return this.rewardsService.getRewards(this.currentRewardsSnappingPage, REQ_PAGE_SIZE, [ 'snapping' ], undefined)
      .pipe(
        tap((rewards: IReward[]) => this.rewardsSnappingCompleted = rewards.length < REQ_PAGE_SIZE),
        map((rewards: IReward[]) => this.sortRewards(rewards)),
        finalize(() => this.ghostRewardsSnapping = [])
      );
  }

  public getRewardsFeatured(): Observable<IReward[]> {
    if (this.rewardsFeaturedCompleted) {
      return of([]);
    }
    this.currentRewardsFeaturedPage++;
    return this.rewardsService.getRewards(this.currentRewardsFeaturedPage, REQ_PAGE_SIZE, [ 'featured' ], undefined)
      .pipe(
        tap((rewards: IReward[]) => this.rewardsFeaturedCompleted = rewards.length < REQ_PAGE_SIZE),
        map((rewards: IReward[]) => this.sortRewards(rewards)),
        finalize(() => this.ghostRewardsFeatured = [])
      );
  }

  public onRewardsSnappingScroll(): void {
    if (!this.rewardsSnappingCompleted) {
      forkJoin(this.rewardsSnapping$, this.getRewardsSnapping()).subscribe(val => {
        if (! val[1].length && val[1].length < REQ_PAGE_SIZE) {
          this.rewardsSnappingCompleted = true;
        }
        this.rewardsSnapping$ = of([ ...val[0], ...val[1] ]);
      });
      return;
    }
    ++this.currentRewardsSnappingPage;
  }

  public onRewardsFeaturedScroll(): void {
    if (!this.rewardsFeaturedCompleted) {
      forkJoin(this.rewardsFeatured$, this.getRewardsFeatured()).subscribe(val => {
        if (! val[1].length && val[1].length < REQ_PAGE_SIZE) {
          this.rewardsFeaturedCompleted = true;
        }
        this.rewardsFeatured$ = of([ ...val[0], ...val[1] ]);
      });
      return;
    }
    ++this.currentRewardsFeaturedPage;
  }

  public getOperatingHours(operatingHours: IOperatingHours): string {

    const daysMapArr = [ false, false, false, false, false, false, false ]; // index 0 is sunday

    for (const dayIndex in operatingHours.days) {
      if (dayIndex) { // guard-for-in
        daysMapArr[operatingHours.days[dayIndex]] = true;
      }
    }
    const days: string = this.dayArrToIntuitiveStringDayRange(daysMapArr);
    const hours: string = `${operatingHours.opensAt?.substr(0, 5)} - ${operatingHours.closesAt?.substr(0, 5)}`;
    return `Collect a voucher during: ${days}, ${hours} ${operatingHours.formattedOffset}`;
  }

  private dayOfWeekAsString(dayIndex: number): string {
    return [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ][dayIndex];
  }

  // works but can't wrap sat and sun
  private dayArrToIntuitiveStringDayRange(daysMapArr: boolean[]): string {
    let dayRange = '', multiDayRange = '';
    let findingRange = false;

    for (let i = 0; i <= daysMapArr.length; i++) {
      if (daysMapArr[i]) {
        if (dayRange.length > 0 && !findingRange) {
          findingRange = true;
        } else if (dayRange.length === 0) { // first item in current range.
          dayRange = `${this.dayOfWeekAsString(i)}`;
        }
      } else if (dayRange.length > 0 && ! daysMapArr[i]) { // first part of range already identified
        if (this.dayOfWeekAsString(i - 1) !== dayRange) {
          dayRange = `${dayRange} - ${this.dayOfWeekAsString(i - 1)}`;
        }
        if (multiDayRange.length === 0) {
          multiDayRange = dayRange;
        } else {
          multiDayRange = `${multiDayRange}, ${dayRange}`;
        }
        dayRange = ''; // reset for more ranges;
        findingRange = false;
      }
    }
    return multiDayRange;
  }
}
