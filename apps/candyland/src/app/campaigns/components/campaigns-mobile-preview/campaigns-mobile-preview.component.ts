import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PuzzleCollectStamp, PuzzleCollectStampState } from '../../../../../../../libs/perx-core/dist/perx-core';
import { BehaviorSubject, Observable } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'cl-campaigns-mobile-preview',
  templateUrl: './campaigns-mobile-preview.component.html',
  styleUrls: ['./campaigns-mobile-preview.component.scss']
})
export class CampaignsMobilePreviewComponent implements OnInit, OnDestroy {
  @Input() public storeTemplate$: Observable<any>;
  @Input() public tenantSettings: ITenantsProperties;
  public stamps: PuzzleCollectStamp[] = [];
  public stampsSlotNumberData = [];
  public questionData$ = new BehaviorSubject(null);
  public engagement;

  public getQuestionData(): Observable<any> {
    return this.questionData$.asObservable();
  }
  constructor(private cd: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.storeTemplate$
      .pipe(untilDestroyed(this))
      .subscribe((value => {
        this.engagement = value;
        this.prepareStampsData();
        this.setSurveyQuestion(this.engagement);
      }));
  }

  public ngOnDestroy(): void {
  }

  public getBackgroundPlugin(): string {
    if (!this.engagement) {
      return  '/assets/images/stamps/card-background/card-bg-1.png';
    }

    if (this.engagement.attributes_type === 'game' && this.engagement.game_type === 'shake') {
      return this.engagement.background_img_url;
    }
  }

  private prepareStampsData(): void {
    if (this.engagement.nb_of_slots) {
      for (let i = 0; i <= this.engagement.nb_of_slots; i++) {
        this.stamps.push({
          id: 1,
          state: PuzzleCollectStampState.redeemed
        });
        this.stampsSlotNumberData = this.engagement.slots.map((item: number) => {
          return {rewardPosition: item - 1};
        });
      }
    } else {
      this.stamps = [];
      this.stampsSlotNumberData = [];
    }
  }

  private setSurveyQuestion(data: any): void {
    if (data.attributes_type === 'survey') {
      this.questionData$.next({questions: [data.questions]});
      this.cd.detectChanges();
    }
  }

}
