import { Component, OnInit } from '@angular/core';
import {
  ICampaign,
  IQuestService,
  IQuest,
  NotificationService
} from '@perxtech/core';
import { switchMap, tap, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'perx-blackcomb-pages-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit {

  public quest$: Observable<IQuest>;

  public questCompleted: boolean = false;

  public taskProgress: number = 0;
  public taskCompletedLen: number = 0;
  public taskTotalLen: number = 0;

  public campaignId: number;
  public isEnrolled: boolean = false;

  constructor(protected questService: IQuestService,
              protected route: ActivatedRoute,
              private notificationService: NotificationService) { }

  public ngOnInit(): void {
    this.quest$ = this.route.paramMap.pipe(
      filter((params: ParamMap) => params.has('id')),
      map((params: ParamMap) => params.get('id')),
      map((cid: string) => Number.parseInt(cid, 10)),
      switchMap((id: number) => {
          this.campaignId = id;
          return this.questService.getQuestCampaign(id);
        }
      ),
      switchMap((campaign: ICampaign) =>
          this.questService.getQuestFromCampaign(campaign).pipe(
            tap( quest => {
              if (quest.tasks) {
              this.taskCompletedLen = quest.tasks.filter(t => t.state === 'completed').length;
              this.taskTotalLen = quest.tasks.length;
              this.taskProgress = (this.taskCompletedLen / this.taskTotalLen) * 100;
            }
        })))
    );
  }

  public startQuest(): void {
    this.questService.postEnrollQuest(this.campaignId).subscribe(() => {
      this.isEnrolled = true;
    }, error => {
      this.notificationService.addSnack(error.error.message);
    });
  }

}
