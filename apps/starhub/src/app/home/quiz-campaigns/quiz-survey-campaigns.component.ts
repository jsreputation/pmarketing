import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameType, ICampaign, ICampaignService, IGame } from '@perxtech/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../utils/fade-animations';

const REQ_PAGE_SIZE: number = 10;

@Component({
  selector: 'app-quiz-survey-campaigns',
  animations: [trigger('fadeOut', fadeOut()), trigger('fadeIn', fadeIn())],
  templateUrl: './quiz-survey-campaigns.component.html',
  styleUrls: ['./quiz-survey-campaigns.component.scss']
})
export class QuizSurveyCampaignsComponent implements OnInit {
  public campaigns$: Observable<ICampaign[] | {}>;
  public ghostCampaigns: any[] = new Array(3);
  public games: IGame[];
  public campaignsPageId: number = 1;
  public campaignsEnded: boolean = false;

  @Input()
  public switchToSurvey: boolean = false;

  @Output()
  public tapped: EventEmitter<number> = new EventEmitter();

  constructor(
    private campaignService: ICampaignService,
  ) {
  }

  public ngOnInit(): void {
    this.loadCampaigns();
  }

  public loadCampaigns(): void {
    this.campaigns$ = this.campaignService
      .getCampaigns({
        gameType: this.switchToSurvey ? GameType.survey : GameType.quiz
        , page: this.campaignsPageId })
      .pipe(
        tap((campaigns) => {
          this.ghostCampaigns = [];
          if (campaigns.length < REQ_PAGE_SIZE) {
            // actual check here if no more campaigns then end -> ensure all pages combed
            this.campaignsEnded = true;
          }
        }),
        catchError(err => {
          this.ghostCampaigns = [];
          return err;
        })
      );
  }

  public selected(campaign: ICampaign): void {
    this.tapped.emit(campaign.id);
  }

  public onScroll(): void {
    if (this.campaignsEnded) {
      return;
    }
    this.campaignsPageId++;
    this.loadCampaigns();
  }
}
