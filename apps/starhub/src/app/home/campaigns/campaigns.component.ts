import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  CampaignType,
  ConfigService,
  GameType,
  ICampaign,
  ICampaignItem,
  ICampaignService,
  IFlags,
  IGame,
  IGameService,
  IOperatingHours,
  IQuest,
  IQuestService,
  SettingsService
} from '@perxtech/core';
import { catchError, map, scan, startWith, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { IMacaron, MacaronService } from '../../services/macaron.service';
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../utils/fade-animations';

const REQ_PAGE_SIZE: number = 10;

interface ICampaignWithMacaron extends ICampaign {
  macaron?: IMacaron | null;
}
@Component({
  selector: 'app-campaigns',
  animations: [trigger('fadeOut', fadeOut()), trigger('fadeIn', fadeIn())],
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  public campaigns$: Observable<ICampaignWithMacaron[]>;
  public ghostCampaigns: any[] = new Array(3);
  public campaignsSubj: BehaviorSubject<ICampaignWithMacaron[]> = new BehaviorSubject([]);
  public games: IGame[] = [];
  public campaignsPageId: number = 1;
  public campaignsEnded: boolean = false;
  public showOperatingHours: boolean = false;

  @Output()
  public tapped: EventEmitter<ICampaignItem> = new EventEmitter();

  constructor(
    private campaignService: ICampaignService,
    private gameService: IGameService,
    protected questService: IQuestService,
    private macaronService: MacaronService,
    private configService: ConfigService,
    private settingsService: SettingsService
  ) {
    this.initCampaignsScan();
  }

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(() => {
      this.loadCampaigns();
    });
    this.settingsService.getRemoteFlagsSettings().subscribe(
      (flags: IFlags) => {
        this.showOperatingHours = flags.showHappyHourOperatingHours ? flags.showHappyHourOperatingHours : false;
      }
    );
  }

  public loadCampaigns(): void {
    let tempCampaigns;
    let gameCampaigns: ICampaign[] = [];
    let questCampaigns: ICampaign[] = [];

    this.campaignService
      .getCampaigns({ page: this.campaignsPageId })
      .pipe(
        tap((campaigns) => {
          if (campaigns.length < REQ_PAGE_SIZE) {
            // actual check here if no more campaigns then end -> ensure all pages combed
            this.campaignsEnded = true;
          }
        }),
        map((campaigns: ICampaign[]) =>
          campaigns.filter((campaign) => campaign.type === CampaignType.game || campaign.type === CampaignType.quest)
        ),
        tap((campaigns: ICampaign[]) => {
          tempCampaigns = campaigns;
          gameCampaigns = tempCampaigns.filter((campaign) => campaign.type === CampaignType.game);
          questCampaigns = tempCampaigns.filter((campaign) => campaign.type === CampaignType.quest);

        }),
        switchMap(() =>
          forkJoin(
            combineLatest(
              gameCampaigns.map(
                (campaign) => this.gameService.getGamesFromCampaign(campaign).pipe(catchError(() => of([])))
              )).pipe(startWith([]), map((games: IGame[][]) => [].concat(...(games as [])) as IGame[])),
            combineLatest(
              questCampaigns.map((campaign) =>
                this.questService.getQuestFromCampaign(campaign.id).pipe(catchError(() => of([])))
              )).pipe( startWith([]), map((quests: IQuest[][]) => [].concat(...(quests as [])) as IQuest[]))
          ))
      )
      .subscribe(
        ([games, quests]) => {
          this.games.push(...games);
          const filteredAndMacoronedCampaigns = tempCampaigns
            .filter((campaign) => {
              const currentDate = new Date();
              const isComingSoon =
                campaign.beginsAt &&
                campaign.beginsAt.getTime() > currentDate.getTime();
              return (
                isComingSoon ||
                ( campaign.type === CampaignType.quest && quests.filter((quest) => quest.campaignId === campaign.id)) ||
                ( campaign.type === CampaignType.game && games.filter((game) => game.campaignId === campaign.id).length > 0) ||
                campaign.subType === GameType.quiz
              );
            })
            .map((campaign) => {
              campaign.macaron = this.getCampaignMacaron(campaign);
              return campaign;
            });

          // ensure list of campaigns does not get stuck when not long enough to scroll to paginate
          if (!this.campaignsEnded && filteredAndMacoronedCampaigns.length < 5) {
            this.campaignsPageId++;
            this.loadCampaigns();
          }

          this.campaignsSubj.next(filteredAndMacoronedCampaigns);
          this.ghostCampaigns = [];
        },
        () => (this.ghostCampaigns = [])
      );
  }

  private initCampaignsScan(): void {
    this.campaigns$ = this.campaignsSubj
      .asObservable()
      .pipe(scan((acc, curr) => [...acc, ...(curr ? curr : [])], []));
  }

  public getCampaignMacaron(campaign: ICampaign): IMacaron | null {
    return this.macaronService.getCampaignMacaron(campaign);
  }

  public selected(campaign: ICampaignWithMacaron): void {
    if (campaign.macaron && campaign.macaron.class === 'coming-soon') {
      return;
    }
    const gameWithCampaign = this.games.find(
      (game) => game.campaignId === campaign.id
    );

    if (campaign.subType === GameType.quiz) {
      this.tapped.emit({ itemType: GameType.quiz.toString(), itemId: campaign.id });
    } else if (gameWithCampaign) {
      this.tapped.emit({ itemType: CampaignType.game, itemId: gameWithCampaign.id });
    } else if (campaign.type === CampaignType.quest) {
      this.tapped.emit({ itemType: CampaignType.quest, itemId: campaign.id });
    }
  }

  public onScroll(): void {
    if (this.campaignsEnded) {
      return;
    }
    this.campaignsPageId++;
    this.loadCampaigns();
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
    return `Campaign available during: ${days}, ${hours} ${operatingHours.formattedOffset}`;
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
