import { Component, OnInit } from '@angular/core';
import {
  ICampaign,
  IQuestService,
  IQuestCampaign
} from '@perxtech/core';
import { switchMap, catchError, tap, filter, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'perx-blackcomb-pages-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit {

  public quest$: Observable<IQuestCampaign>;

  public questCompleted: boolean = false;

  public taskProgress: number = 0;
  public taskCompletedLen: number = 0;
  public taskTotalLen: number = 0;

  constructor(protected questService: IQuestService,
              protected route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.quest$ = this.route.paramMap.pipe(
      filter((params: ParamMap) => params.has('id')),
      map((params: ParamMap) => params.get('id')),
      map((cid: string) => Number.parseInt(cid, 10)),
      switchMap((id: number) =>
          this.questService.getQuestsFromCampaign(id).pipe(
            tap( campaigns => {
              if (campaigns.tasks) {
              this.taskCompletedLen = campaigns.tasks.filter(t => t.completedAt).length;
              this.taskTotalLen = campaigns.tasks.length;
              this.taskProgress = (this.taskCompletedLen / this.taskTotalLen) * 100;
            }
        }))),
      switchMap((campaigns: ICampaign) => of(campaigns).pipe(catchError(err => of(err))))
    );
  }

  public startQuest(): void {
    this.quest$.subscribe(quest => {
      quest.enrolled = true;
    });
  }

}
