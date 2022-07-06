import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CampaignOutcomeType,
  ICampaign,
  ICampaignOutcome,
  ICampaignService,
  IQuest,
  IQuestService,
  IQuestTask,
  NotificationService,
  QuestProperties,
  QuestState
} from '@perxtech/core';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { EMPTY, forkJoin, Observable, of, Subject } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { oc } from 'ts-optchain';

@Component({
  selector: 'hangseng-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit, OnDestroy {

  public quest$: Observable<IQuest>;
  public campaign$: Observable<ICampaign>;
  public tasks$: Observable<IQuestTask[]>;
  public campaignOutcome$: Observable<ICampaignOutcome[]>;

  public questCompleted: boolean = false;
  public taskProgress: number = 0;
  public taskCompletedLen: number = 0;
  public taskTotalLen: number = 0;
  public completedTaskIds: (number | undefined)[] = [];
  public isEnrolled: boolean = false;
  public questState: string = '';
  public state: typeof QuestState = QuestState;
  public outcomeType: typeof CampaignOutcomeType = CampaignOutcomeType;

  public questConfig: QuestProperties | undefined;
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
          this.campaignService.getCampaign(campaignId),
          this.campaignService.getCampaignOutcomes(campaignId),
          this.questService.getQuestTasks(campaignId),
          this.questService.getQuestFromCampaign(campaignId)
        );
      }
      ),
      switchMap(([campaign, outcomes, tasks, quests]: [ICampaign, ICampaignOutcome[], IQuestTask[], IQuest[]]) => {
        this.taskTotalLen = tasks.length;
        if (quests && quests.length > 0) {
          this.questState = quests[0].state ? quests[0].state : '';
          return this.questService.getQuestProgress(quests[0].id).pipe(
            map((quest) => [campaign, outcomes, tasks, quest])
          );
        }
        return of([campaign, outcomes, tasks, EMPTY]);
      }),
      takeUntil(this.destroy$)
    ).subscribe(([campaign, outcomes, tasks, quest]: [ICampaign, ICampaignOutcome[], IQuestTask[], IQuest]) => {
      this.updateProgessBar(quest);
      this.questConfig = oc(campaign).displayProperties.questDetails();
      this.campaign$ = of(campaign);
      this.tasks$ = of(tasks);
      this.campaignOutcome$ = of(outcomes);
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public startQuest(campaignId: number): void {
    this.campaignService.enrolIntoCampaign(campaignId).pipe(
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

  private updateProgessBar(quest: IQuest): void {
    if (quest && quest.completedTasks && quest.completedTasks.length > 0) {
      this.taskCompletedLen = quest.completedTasks.length;
      this.taskProgress = (this.taskCompletedLen / this.taskTotalLen) * 100;
      this.completedTaskIds = quest.completedTasks.map(t => t.id);
    }
  }

  public outcomeClicked(outcome: ICampaignOutcome): void {
    if (outcome.type === CampaignOutcomeType.reward) {
      this.router
        .navigate(['/reward-detail', outcome.id], { queryParams: { previewReward: true } });
    }
  }
}
