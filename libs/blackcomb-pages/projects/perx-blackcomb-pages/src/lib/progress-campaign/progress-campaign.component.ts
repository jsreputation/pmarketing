import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  CampaignOutcomeType,
  CampaignType,
  ICampaign,
  ICampaignOutcome,
  IProgressCampaign,
  IProgressLevel,
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
export class ProgressCampaignComponent implements OnInit, OnDestroy, AfterViewInit {

  public campaign$: Observable<ICampaign>;
  public levels$: Observable<IProgressLevel[]>;
  public campaignOutcome$: Observable<ICampaignOutcome[]>;
  public progressCampaign: IProgressCampaign;

  public questCompleted: boolean = false;
  public campaignProgress: number = 0;
  public taskTotalLen: number = 0;
  public completedTaskIds: (number|undefined)[] = [];
  public questState: string = '';
  public state: typeof QuestState = QuestState;
  public outcomeType: typeof CampaignOutcomeType = CampaignOutcomeType;

  public progressConfig: ProgressProperties | undefined;
  private destroy$: Subject<void> = new Subject();
  @ViewChild('levelConnectorDiv') private levelConnectorDiv: ElementRef;

  constructor(protected route: ActivatedRoute,
              private router: Router) {}
              // private notificationService: NotificationService,
              // private campaignService: ICampaignService) { }

  public ngAfterViewInit(): void {
    // update level connector height
    this.levels$?.subscribe(
      (levels: IProgressLevel[]) => {
        const numLevels = levels.length;
        const taskCards = [...this.levelConnectorDiv.nativeElement.parentElement.children]
          .filter((child) => child.classList.contains('task-card'));
        if (taskCards.length > 1 && numLevels > 1) {
          // we want the height up to the 2nd last element
          // - 1 for 0 index conversion. i.e. taskCard.length = 3, the 2nd last index is 1;
          const numElementsForHeight = taskCards.slice(0, taskCards.length - 2).length;

          if (taskCards.length === numLevels) {
            let cumulativeHeights = 0;
            // get the heights for numElementsForHeights inclusive i.e. both 0 and 1 - from length = 2
            for (let i = 0; i <= numElementsForHeight; i++ ) {
              cumulativeHeights += taskCards[i].offsetHeight;
            }
            this.levelConnectorDiv.nativeElement.style.height = `${cumulativeHeights}px`;
          }
        }
        // else there is only 1 level, don't make a line
      }
    );
  }

  public ngOnInit(): void {
    this.route.paramMap.pipe(
      filter((params: ParamMap) => params.has('id')),
      map((params: ParamMap) => params.get('id')),
      switchMap((cid: string) => {
          const campaignId: number = Number.parseInt(cid, 10);
          return forkJoin(
            // this.campaignService.getCampaign(campaignId),
            of(mockCampaigns.filter(campaign => campaign.type === CampaignType.progress && campaign.id === campaignId)[0]),
            // this.campaignService.getCampaignOutcomes(campaignId),
            of(mockCampaignOutcomes),
            // this.questService.getQuestLevel(campaignId),
            of(mockCampaignLevels.filter(level => level.campaignId === campaignId)),
            // this.questService.getQuestFromCampaign(campaignId)
            of(mockProgressCampaigns.filter(progress => progress.campaignId === campaignId))
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

  private updateProgessBar(progressCampaign: IProgressCampaign): void {
    if (progressCampaign?.completedProgress) {
      this.campaignProgress = progressCampaign.completedProgress;
    }
  }

  public outcomeClicked(outcome: ICampaignOutcome): void {
    if (outcome.type === CampaignOutcomeType.reward) {
      this.router.navigate([ '/reward-detail', outcome.id ]);
    }
  }
}
