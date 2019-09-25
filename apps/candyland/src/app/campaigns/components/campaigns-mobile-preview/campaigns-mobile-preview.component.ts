import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PuzzleCollectStamp, PuzzleCollectStampState } from '../../../../../../../libs/perx-core/dist/perx-core';
import { BehaviorSubject, Observable } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter } from 'rxjs/operators';

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
  public reward$ = new BehaviorSubject(null);
  public getQuestionData(): Observable<any> {
    return this.questionData$.asObservable();
  }
  constructor(private cd: ChangeDetectorRef) { }

  public ngOnInit(): void {
   this.subscribeToStore();
  }

  public ngOnDestroy(): void {
  }

  public getReward$(): Observable<any[]> {
    return this.reward$
      .pipe(filter(Boolean));
  }

  public getBackgroundPlugin(): string {

    if (this.engagement && this.engagement.background_img_url) {
      return this.engagement.background_img_url;
    }

    return  '/assets/images/stamps/card-background/card-bg-1.png';
  }

  private subscribeToStore(): void {
    if (this.storeTemplate$) {
      this.storeTemplate$
        .pipe(untilDestroyed(this))
        .subscribe((value => {
          this.engagement = value;
          this.prepareStampsData();
          this.setSurveyQuestion(this.engagement);
          this.setReward(this.engagement);
          this.cd.detectChanges();
        }));
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

  private setReward(data: any): void {
    if (data.attributes_type === 'instant_reward') {
      this.reward$.next([{
        id: 1,
        name: 'Reward Name',
        subtitle: 'So yummy',
        description: 'Merchant Name',
        validFrom: null,
        validTo: null,
        rewardThumbnail: 'https://picsum.photos/300/300',
        rewardBanner: 'https://picsum.photos/200/300',
        merchantImg: 'https://picsum.photos/200/300',
        termsAndConditions: '',
        howToRedeem: '',
        rewardPrice: [{
          id: 1,
          currencyCode: '44',
          price: 3
        }]
      }]);
    }
  }

}
