import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { StampService, IStampCard, IPopupConfig, NotificationService } from '@perx/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, switchMap, takeUntil, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-blackcomb-stamp-card',
  templateUrl: './stamp-card.component.html',
  styleUrls: ['./stamp-card.component.scss']
})

export class StampCardComponent implements OnInit, OnDestroy {
  public title: string; // = 'Scratch & Win!'
  public subTitle?: string; //  = 'Collect all 10 stickers and win a reward!'
  public background: string;
  public cardBackground: string;
  public isEnabled: boolean = false;
  public stampCard$: Observable<IStampCard>;
  private destroy$: Subject<any> = new Subject();
  private rewardSuccessPopUp: IPopupConfig = {
    title: 'STAMP_SUCCESS_TITLE',
    buttonTxt: 'VIEW_REWARD'
  };
  private errorPopUp: IPopupConfig = {
    title: 'STAMP_ERROR_TITLE',
    buttonTxt: 'TRY_AGAIN'
  };

  private initTranslate(): void {
    [
      this.rewardSuccessPopUp.title,
      this.errorPopUp.title,
      this.rewardSuccessPopUp.buttonTxt,
      this.errorPopUp.buttonTxt
    ]
      .filter(k => k !== undefined && k !== null)
      .forEach((k: string) => this.translate.get(k).subscribe((text) => k = text));
  }

  constructor(
    private stampService: StampService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {
  }

  public ngOnInit(): void {
    this.initTranslate();

    this.stampCard$ = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        map((params: ParamMap) => params.get('id')),
        switchMap((id: string) => {
          const idN = Number.parseInt(id, 10);
          return this.stampService.getCurrentCard(idN);
        }),
        takeUntil(this.destroy$)
      );
    this.stampCard$.subscribe(
      (stampCard: IStampCard) => {
        this.title = stampCard.title || '';
        this.subTitle = stampCard.subTitle;
        this.background = stampCard.displayProperties.bgImage || '';
        this.cardBackground = stampCard.displayProperties.cardBgImage || '';
        if (stampCard.displayProperties.noRewardsPopUp) {
          this.errorPopUp.title = stampCard.displayProperties.noRewardsPopUp.headLine;
          this.errorPopUp.text = stampCard.displayProperties.noRewardsPopUp.subHeadLine;
          this.errorPopUp.buttonTxt = stampCard.displayProperties.noRewardsPopUp.buttonTxt || this.errorPopUp.buttonTxt;
          this.errorPopUp.imageUrl = stampCard.displayProperties.noRewardsPopUp.imageURL || this.errorPopUp.imageUrl;
        }

        if (stampCard.displayProperties.successPopUp) {
          this.rewardSuccessPopUp.title = stampCard.displayProperties.successPopUp.headLine;
          this.rewardSuccessPopUp.text = stampCard.displayProperties.successPopUp.subHeadLine;
          this.rewardSuccessPopUp.buttonTxt = stampCard.displayProperties.successPopUp.buttonTxt || this.rewardSuccessPopUp.buttonTxt;
          this.rewardSuccessPopUp.imageUrl = stampCard.displayProperties.successPopUp.imageURL || this.rewardSuccessPopUp.imageUrl;
        }
      },
      () => {
        this.router.navigate(['/wallet']);
      }
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public handleStamp(): void {
    this.stampService.play().subscribe((res) => {
      if (res) {
        this.notificationService.addPopup(this.rewardSuccessPopUp);
      } else {
        this.notificationService.addPopup(this.errorPopUp);
      }
    });
  }
}
