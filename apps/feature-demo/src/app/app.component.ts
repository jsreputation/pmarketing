import { Component, OnInit } from '@angular/core';
import {
  AuthenticationService,
  NotificationService,
  PopupComponent,
  IPopupConfig,
  PopUpClosedCallBack,
  ICampaignService,
  // ICampaign,
  // CampaignType,
  IReward,
  // IGameService,
  IGame,
  TokenStorage
} from '@perx/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { RewardPopupComponent } from './reward-popup/reward-popup.component';
import {
  // switchMap,
  filter,
  map,
  catchError
} from 'rxjs/operators';
import {
  // combineLatest,
  of
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, PopUpClosedCallBack {
  private reward: IReward = null;
  private game: IGame = null;

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private activeRoute: ActivatedRoute,
    private campaignService: ICampaignService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private tokenStorage: TokenStorage
  ) { }

  public ngOnInit(): void {
    this.notificationService.$popup.subscribe((data: IPopupConfig) => this.dialog.open(PopupComponent, { data }));

    this.notificationService.$snack.subscribe((msg: string) => this.snackBar.open(msg, 'x', { duration: 2000 }));

    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.token),
        map((params: Params) => params.token)
      )
      .subscribe((token: string) => {
        this.authenticationService.saveUserAccessToken(token);
        this.fetchCampaigns();
      });
  }

  private fetchCampaigns(): void {
    this.campaignService.getCampaigns()
      .pipe(
        catchError(() => {
          this.router.navigateByUrl('error');
          return of([]);
        })
      )
      .subscribe(() => { });
  }

  public dialogClosed(): void {
    if (this.reward !== null) {
      this.router.navigate([`/reward`], { queryParams: { id: this.reward.id } });
    } else if (this.game !== null) {
      this.router.navigate([`/game`], { queryParams: { id: this.game.id } });
    } else {
      console.error('Something fishy, we should not be here, without any reward or game');
    }
  }

  protected idExistsInStorage(id: number): boolean {
    const campaignIdsInLocalStorage = this.tokenStorage.getAppInfoProperty('campaignIdsPopup');
    const ids: number[] = campaignIdsInLocalStorage ? JSON.parse(campaignIdsInLocalStorage) : [];

    if (ids.includes(id)) {
      return true;
    }

    ids.push(id);
    this.tokenStorage.setAppInfoProperty(JSON.stringify(ids), 'campaignIdsPopup');
    return false;
  }
}
