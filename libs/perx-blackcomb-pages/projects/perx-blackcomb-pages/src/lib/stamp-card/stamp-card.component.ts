import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { StampService, IStampCard, IPopupConfig, PopupComponent } from '@perx/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-blackcomb-stamp-card',
  templateUrl: './stamp-card.component.html',
  styleUrls: ['./stamp-card.component.scss']
})

export class StampCardComponent implements OnInit, OnDestroy {
  public title: string; // = 'Scratch & Win!'
  public subTitle: string; //  = 'Collect all 10 stickers and win a reward!'
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
    this.translate.get(this.rewardSuccessPopUp.title).subscribe((text) => this.rewardSuccessPopUp.title = text);
    this.translate.get(this.errorPopUp.title).subscribe((text) => this.errorPopUp.title = text);
    this.translate.get(this.rewardSuccessPopUp.buttonTxt).subscribe((text) => this.rewardSuccessPopUp.buttonTxt = text);
    this.translate.get(this.errorPopUp.buttonTxt).subscribe((text) => this.errorPopUp.buttonTxt = text);
  }

  constructor(
    private stampService: StampService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {
  }

  public ngOnInit(): void {
    this.initTranslate();

    this.stampCard$ = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        switchMap((params: ParamMap) => {
          const id: string = params.get('id');
          const idN = Number.parseInt(id, 10);
          return this.stampService.getCurrentCard(idN);
        }),
        takeUntil(this.destroy$)
      );
    this.stampCard$.subscribe(
      (stampCard: IStampCard) => {
        this.title = stampCard.title;
        this.subTitle = stampCard.subTitle;
        this.background = stampCard.displayProperties.bgImage;
        this.cardBackground = stampCard.displayProperties.cardBgImage;
        if (stampCard.displayProperties.noRewardsPopUp) {
          this.errorPopUp.title = stampCard.displayProperties.noRewardsPopUp.headLine || this.errorPopUp.title;
          this.errorPopUp.text = stampCard.displayProperties.noRewardsPopUp.subHeadLine || this.errorPopUp.text;
          this.errorPopUp.buttonTxt = stampCard.displayProperties.noRewardsPopUp.buttonTxt || this.errorPopUp.buttonTxt;
          this.errorPopUp.imageUrl = stampCard.displayProperties.noRewardsPopUp.imageURL || this.errorPopUp.imageUrl;
        }

        if (stampCard.displayProperties.successPopUp) {
          this.rewardSuccessPopUp.title = stampCard.displayProperties.successPopUp.headLine || this.rewardSuccessPopUp.title;
          this.rewardSuccessPopUp.text = stampCard.displayProperties.successPopUp.subHeadLine || this.rewardSuccessPopUp.text;
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
        return this.popup(this.rewardSuccessPopUp);
      }
      return this.popup(this.errorPopUp);
    });
  }

  private popup(data: IPopupConfig): MatDialogRef<PopupComponent> {
    return this.dialog.open(PopupComponent, { data });
  }
}
