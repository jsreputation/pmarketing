import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CampaignOutcomeType,
  CampaignType,
  ICampaign,
  ICampaignOutcome,
  ICampaignService,
  IProgressCampaign,
  IProgressLevel,
  IQuest,
  IQuestService,
  NotificationService,
  ProgressProperties,
  QuestState
} from '@perxtech/core';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { EMPTY, forkJoin, Observable, of, Subject } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  campaignLevels as mockCampaignLevels,
  campaignOutcomes as mockCampaignOutcomes,
  campaigns as mockCampaigns,
  progressCampaigns as mockProgressCampaigns
} from '../mock/campaigns.mock';

@Component({
  selector: 'perx-blackcomb-pages-progress-campaign',
  templateUrl: './progress-campaign.component.html',
  styleUrls: ['./progress-campaign.component.scss']
})
export class ProgressCampaignComponent implements OnInit, OnDestroy {

  public campaign$: Observable<ICampaign>;
  public levels$: Observable<IProgressLevel[]>;
  public campaignOutcome$: Observable<ICampaignOutcome[]>;
  public progressCampaign: IProgressCampaign;

  public questCompleted: boolean = false;
  public campaignProgress: number = 0;
  public taskCompletedLen: number = 0;
  public taskTotalLen: number = 0;
  public completedTaskIds: (number|undefined)[] = [];
  public isEnrolled: boolean = false;
  public questState: string = '';
  public state: typeof QuestState = QuestState;
  public outcomeType: typeof CampaignOutcomeType = CampaignOutcomeType;

  public progressConfig: ProgressProperties | undefined;
  private destroy$: Subject<void> = new Subject();

  constructor(protected questService: IQuestService,
              protected route: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService,
              private campaignService: ICampaignService) { }

  public ngOnInit(): void {
    this.route.paramMap.pipe(
      filter((params: ParamMap) => params.has('id')),
      map((params: ParamMap) => params.get('id')),
      switchMap((cid: string) => {
          const campaignId: number = Number.parseInt(cid, 10);
          return forkJoin(
            of(mockCampaigns.filter(campaign => campaign.type === CampaignType.progress && campaign.id === campaignId)[0]), // this.campaignService.getCampaign(campaignId),
            of(mockCampaignOutcomes), // this.campaignService.getCampaignOutcomes(campaignId),
            of(mockCampaignLevels.filter(level => level.campaignId === campaignId)), // this.questService.getQuestLevel(campaignId),
            of(mockProgressCampaigns.filter(progress => progress.campaignId === campaignId)) // this.questService.getQuestFromCampaign(campaignId)
          );
        }
      ),
      switchMap(([campaign, outcomes, levels, progress]: [ICampaign, ICampaignOutcome[], IProgressLevel[], IProgressCampaign[]]) => {
        this.taskTotalLen = levels.length;
        if (progress && progress.length > 0) {
          this.questState = progress[0].state ? progress[0].state : '';
          // return this.questService.getQuestProgress(quests[0].id).pipe(
          //   map((quest) => [campaign, outcomes, level, quest])
          // );
          return of([campaign, outcomes, levels, progress[0]]);
        }
        return of([campaign, outcomes, levels, EMPTY]);
      }),
      takeUntil(this.destroy$)
      ).subscribe(([campaign, outcomes, levels, progress]: [ICampaign, ICampaignOutcome[], IProgressLevel[], IProgressCampaign]) => {
        this.updateProgessBar(progress);
        this.progressConfig = campaign.displayProperties?.progressDetails;
        this.campaign$ = of(campaign);
        this.levels$ = of(levels);
        this.progressCampaign = progress;
        this.campaignOutcome$ = of(outcomes);
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public startQuest(campaignId: number): void {
    this.questService.postEnrollQuest(campaignId).pipe(
      switchMap((isEnrolled: boolean) => {
        if (isEnrolled) {
          this.isEnrolled = true;
          this.campaignService.clearCampaignCache();
          return this.questService.getQuestFromCampaign(campaignId);
        }
        return of(EMPTY);
    }),
    switchMap((quests: IQuest[]) => {
      if (quests && quests.length > 0) {
        this.questState = quests[0].state ? quests[0].state : this.questState;
        return this.questService.getQuestProgress(quests[0].id);
      }
      return of(EMPTY);
    }))
    .subscribe((quest: IQuest) => {
      this.updateProgessBar(quest);
    }, error => {
      this.notificationService.addSnack(error.error.message);
    });
  }

  private updateProgessBar(progressCampaign: IProgressCampaign): void {
    if (progressCampaign?.completedProgress){
      this.campaignProgress = progressCampaign.completedProgress;
    }
  }

  public outcomeClicked(outcome: ICampaignOutcome) {
    if (outcome.type === CampaignOutcomeType.reward) {
      this.router.navigate(['/reward-detail',outcome.id]);
    }
  }
}
