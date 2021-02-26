import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ICampaign,
  IQuestService,
  IQuest,
  IQuestTask,
  QuestState,
  NotificationService,
  ICampaignService,
  QuestProperties
} from '@perxtech/core';
import { switchMap, filter, map, takeUntil } from 'rxjs/operators';
import { Observable, forkJoin, of, EMPTY, Subject } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { oc } from 'ts-optchain';

@Component({
  selector: 'perx-blackcomb-pages-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit, OnDestroy {

  public quest$: Observable<IQuest>;
  public campaign$: Observable<ICampaign>;
  public tasks$: Observable<IQuestTask[]>;

  public questCompleted: boolean = false;
  public taskProgress: number = 0;
  public taskCompletedLen: number = 0;
  public taskTotalLen: number = 0;
  public completedTaskIds: (number|undefined)[] = [];
  public isEnrolled: boolean = false;
  public questState: string = '';
  public state: typeof QuestState = QuestState;

  public questConfig: QuestProperties | undefined;
  private destroy$: Subject<void> = new Subject();

  constructor(protected questService: IQuestService,
              protected route: ActivatedRoute,
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
           this.questService.getQuestTasks(campaignId),
           this.questService.getQuestFromCampaign(campaignId)
          );
        }
      ),
      switchMap(([campaign, tasks, quests]: [ICampaign, IQuestTask[], IQuest[]]) => {
        this.taskTotalLen = tasks.length;
        if (quests && quests.length > 0) {
          this.questState = quests[0].state ? quests[0].state : '';
          return this.questService.getQuestProgress(quests[0].id).pipe(
            map((quest) => [campaign, tasks, quest])
          );
        }
        return of([campaign, tasks, EMPTY]);
      }),
      takeUntil(this.destroy$)
      ).subscribe(([campaign, tasks, quest]: [ICampaign, IQuestTask[], IQuest]) => {
        this.updateProgessBar(quest);
        this.questConfig = oc(campaign).displayProperties.questDetails();
        this.campaign$ = of(campaign);
        this.tasks$ = of(tasks);

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

}
